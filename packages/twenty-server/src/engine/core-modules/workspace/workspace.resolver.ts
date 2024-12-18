import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { FileFolder } from 'src/engine/core-modules/file/interfaces/file-folder.interface';

import { LoginTokenService } from 'src/engine/core-modules/auth/token/services/login-token.service';
import { BillingSubscription } from 'src/engine/core-modules/billing/entities/billing-subscription.entity';
import { BillingSubscriptionService } from 'src/engine/core-modules/billing/services/billing-subscription.service';
import { DomainManagerService } from 'src/engine/core-modules/domain-manager/service/domain-manager.service';
import { EnvironmentService } from 'src/engine/core-modules/environment/environment.service';
import { FileUploadService } from 'src/engine/core-modules/file/file-upload/services/file-upload.service';
import { FileService } from 'src/engine/core-modules/file/services/file.service';
import { UserWorkspaceService } from 'src/engine/core-modules/user-workspace/user-workspace.service';
import { User } from 'src/engine/core-modules/user/user.entity';
import { ActivateWorkspaceInput } from 'src/engine/core-modules/workspace/dtos/activate-workspace-input';
import { ActivateWorkspaceOutput } from 'src/engine/core-modules/workspace/dtos/activate-workspace-output';
import {
  AuthProviders,
  PublicWorkspaceDataOutput,
} from 'src/engine/core-modules/workspace/dtos/public-workspace-data.output';
import { UpdateWorkspaceInput } from 'src/engine/core-modules/workspace/dtos/update-workspace-input';
import { getAuthProvidersByWorkspace } from 'src/engine/core-modules/workspace/utils/get-auth-providers-by-workspace.util';
import { workspaceGraphqlApiExceptionHandler } from 'src/engine/core-modules/workspace/utils/workspace-graphql-api-exception-handler.util';
import {
  WorkspaceException,
  WorkspaceExceptionCode,
} from 'src/engine/core-modules/workspace/workspace.exception';
import { workspaceValidator } from 'src/engine/core-modules/workspace/workspace.validate';
import { AuthUser } from 'src/engine/decorators/auth/auth-user.decorator';
import { AuthWorkspace } from 'src/engine/decorators/auth/auth-workspace.decorator';
import { OriginHeader } from 'src/engine/decorators/auth/origin-header.decorator';
import { DemoEnvGuard } from 'src/engine/guards/demo.env.guard';
import { UserAuthGuard } from 'src/engine/guards/user-auth.guard';
import { WorkspaceAuthGuard } from 'src/engine/guards/workspace-auth.guard';
import { assert } from 'src/utils/assert';
import { isDefined } from 'src/utils/is-defined';
import { streamToBuffer } from 'src/utils/stream-to-buffer';

import { Workspace } from './workspace.entity';

import { WorkspaceService } from './services/workspace.service';

@Resolver(() => Workspace)
export class WorkspaceResolver {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly loginTokenService: LoginTokenService,
    private readonly domainManagerService: DomainManagerService,
    private readonly userWorkspaceService: UserWorkspaceService,
    private readonly environmentService: EnvironmentService,
    private readonly fileUploadService: FileUploadService,
    private readonly fileService: FileService,
    private readonly billingSubscriptionService: BillingSubscriptionService,
  ) {}

  @Query(() => Workspace)
  @UseGuards(WorkspaceAuthGuard)
  async currentWorkspace(@AuthWorkspace() { id }: Workspace) {
    const workspace = await this.workspaceService.findById(id);

    assert(workspace, 'User not found');

    return workspace;
  }

  @Mutation(() => ActivateWorkspaceOutput)
  @UseGuards(UserAuthGuard)
  async activateWorkspace(
    @Args('data') data: ActivateWorkspaceInput,
    @AuthUser() user: User,
  ) {
    const workspace = await this.workspaceService.activateWorkspace(user, data);
    const loginToken = await this.loginTokenService.generateLoginToken(
      user.email,
    );

    return {
      workspace,
      loginToken,
    };
  }

  @Mutation(() => Workspace)
  @UseGuards(WorkspaceAuthGuard)
  async updateWorkspace(
    @Args('data') data: UpdateWorkspaceInput,
    @AuthWorkspace() workspace: Workspace,
  ) {
    try {
      return this.workspaceService.updateWorkspaceById({
        ...data,
        id: workspace.id,
      });
    } catch (error) {
      workspaceGraphqlApiExceptionHandler(error);
    }
  }

  @Mutation(() => String)
  @UseGuards(WorkspaceAuthGuard)
  async uploadWorkspaceLogo(
    @AuthWorkspace() { id }: Workspace,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename, mimetype }: FileUpload,
  ): Promise<string> {
    const stream = createReadStream();
    const buffer = await streamToBuffer(stream);
    const fileFolder = FileFolder.WorkspaceLogo;

    const { paths } = await this.fileUploadService.uploadImage({
      file: buffer,
      filename,
      mimeType: mimetype,
      fileFolder,
      workspaceId: id,
    });

    await this.workspaceService.updateOne(id, {
      logo: paths[0],
    });

    const workspaceLogoToken = await this.fileService.encodeFileToken({
      workspaceId: id,
    });

    return `${paths[0]}?token=${workspaceLogoToken}`;
  }

  @Mutation(() => Workspace)
  @UseGuards(DemoEnvGuard, WorkspaceAuthGuard)
  async deleteCurrentWorkspace(@AuthWorkspace() { id }: Workspace) {
    return this.workspaceService.deleteWorkspace(id);
  }

  @ResolveField(() => BillingSubscription, { nullable: true })
  async currentBillingSubscription(
    @Parent() workspace: Workspace,
  ): Promise<BillingSubscription | undefined> {
    if (!this.environmentService.get('IS_BILLING_ENABLED')) {
      return;
    }

    return this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow(
      { workspaceId: workspace.id },
    );
  }

  @ResolveField(() => Number)
  async workspaceMembersCount(
    @Parent() workspace: Workspace,
  ): Promise<number | undefined> {
    return await this.userWorkspaceService.getUserCount(workspace.id);
  }

  @ResolveField(() => String)
  async logo(@Parent() workspace: Workspace): Promise<string> {
    if (workspace.logo) {
      try {
        const workspaceLogoToken = await this.fileService.encodeFileToken({
          workspaceId: workspace.id,
        });

        return `${workspace.logo}?token=${workspaceLogoToken}`;
      } catch (e) {
        return workspace.logo;
      }
    }

    return workspace.logo ?? '';
  }

  @ResolveField(() => Boolean)
  hasValidEntrepriseKey(): boolean {
    return isDefined(this.environmentService.get('ENTERPRISE_KEY'));
  }

  @Query(() => PublicWorkspaceDataOutput)
  async getPublicWorkspaceDataBySubdomain(@OriginHeader() origin: string) {
    const workspace =
      await this.domainManagerService.getWorkspaceByOrigin(origin);

    workspaceValidator.assertIsExist(
      workspace,
      new WorkspaceException(
        'Workspace not found',
        WorkspaceExceptionCode.WORKSPACE_NOT_FOUND,
      ),
    );

    let workspaceLogoWithToken = '';

    if (workspace.logo) {
      try {
        const workspaceLogoToken = await this.fileService.encodeFileToken({
          workspaceId: workspace.id,
        });

        workspaceLogoWithToken = `${workspace.logo}?token=${workspaceLogoToken}`;
      } catch (e) {
        workspaceLogoWithToken = workspace.logo;
      }
    }

    const systemEnabledProviders: AuthProviders = {
      google: this.environmentService.get('AUTH_GOOGLE_ENABLED'),
      magicLink: false,
      password: this.environmentService.get('AUTH_PASSWORD_ENABLED'),
      microsoft: this.environmentService.get('AUTH_MICROSOFT_ENABLED'),
      sso: [],
    };

    return {
      id: workspace.id,
      logo: workspaceLogoWithToken,
      displayName: workspace.displayName,
      subdomain: workspace.subdomain,
      authProviders: getAuthProvidersByWorkspace({
        workspace,
        systemEnabledProviders,
      }),
    };
  }
}
