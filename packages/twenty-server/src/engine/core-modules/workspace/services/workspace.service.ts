import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import assert from 'assert';

import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { WorkspaceActivationStatus } from 'twenty-shared';
import { Repository } from 'typeorm';

import { BillingSubscriptionService } from 'src/engine/core-modules/billing/services/billing-subscription.service';
import { BillingService } from 'src/engine/core-modules/billing/services/billing.service';
import { EnvironmentService } from 'src/engine/core-modules/environment/environment.service';
import { FeatureFlagService } from 'src/engine/core-modules/feature-flag/services/feature-flag.service';
import { UserWorkspace } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { UserWorkspaceService } from 'src/engine/core-modules/user-workspace/user-workspace.service';
import { User } from 'src/engine/core-modules/user/user.entity';
import { ActivateWorkspaceInput } from 'src/engine/core-modules/workspace/dtos/activate-workspace-input';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import {
  WorkspaceException,
  WorkspaceExceptionCode,
} from 'src/engine/core-modules/workspace/workspace.exception';
import { workspaceValidator } from 'src/engine/core-modules/workspace/workspace.validate';
import { WorkspaceManagerService } from 'src/engine/workspace-manager/workspace-manager.service';
import { DEFAULT_FEATURE_FLAGS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/default-feature-flags';
import { isDefined } from 'src/utils/is-defined';
import { DomainManagerService } from 'src/engine/core-modules/domain-manager/services/domain-manager.service';

@Injectable()
// eslint-disable-next-line @nx/workspace-inject-workspace-repository
export class WorkspaceService extends TypeOrmQueryService<Workspace> {
  constructor(
    @InjectRepository(Workspace, 'core')
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(User, 'core')
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserWorkspace, 'core')
    private readonly userWorkspaceRepository: Repository<UserWorkspace>,
    private readonly workspaceManagerService: WorkspaceManagerService,
    private readonly featureFlagService: FeatureFlagService,
    private readonly billingSubscriptionService: BillingSubscriptionService,
    private readonly billingService: BillingService,
    private readonly userWorkspaceService: UserWorkspaceService,
    private readonly environmentService: EnvironmentService,
    private readonly domainManagerService: DomainManagerService,
  ) {
    super(workspaceRepository);
  }

  private async validateSubdomainUpdate(newSubdomain: string) {
    const subdomainAvailable = await this.isSubdomainAvailable(newSubdomain);

    if (
      !subdomainAvailable ||
      this.environmentService.get('DEFAULT_SUBDOMAIN') === newSubdomain
    ) {
      throw new WorkspaceException(
        'Subdomain already taken',
        WorkspaceExceptionCode.SUBDOMAIN_ALREADY_TAKEN,
      );
    }
  }

  private async setCustomDomain(workspace: Workspace, hostname: string) {
    const existingWorkspace = await this.workspaceRepository.findOne({
      where: { hostname },
    });

    if (existingWorkspace && existingWorkspace.id !== workspace.id) {
      throw new WorkspaceException(
        'Domain already taken',
        WorkspaceExceptionCode.DOMAIN_ALREADY_TAKEN,
      );
    }

    if (
      hostname &&
      workspace.hostname !== hostname &&
      isDefined(workspace.hostname)
    ) {
      await this.domainManagerService.updateCustomHostname(
        workspace.hostname,
        hostname,
      );
    }

    if (
      hostname &&
      workspace.hostname !== hostname &&
      !isDefined(workspace.hostname)
    ) {
      await this.domainManagerService.registerCustomHostname(hostname);
    }
  }

  async updateWorkspaceById(payload: Partial<Workspace> & { id: string }) {
    const workspace = await this.workspaceRepository.findOneBy({
      id: payload.id,
    });

    workspaceValidator.assertIsDefinedOrThrow(workspace);

    if (payload.subdomain && workspace.subdomain !== payload.subdomain) {
      await this.validateSubdomainUpdate(payload.subdomain);
    }

    let customDomainRegistered = false;

    if (payload.hostname === null && isDefined(workspace.hostname)) {
      await this.domainManagerService.deleteCustomHostnameByHostnameSilently(
        workspace.hostname,
      );
    }

    if (payload.hostname && workspace.hostname !== payload.hostname) {
      await this.setCustomDomain(workspace, payload.hostname);
      customDomainRegistered = true;
    }

    try {
      return await this.workspaceRepository.save({
        ...workspace,
        ...payload,
      });
    } catch (error) {
      // revert custom domain registration on error
      if (payload.hostname && customDomainRegistered) {
        this.domainManagerService
          .deleteCustomHostnameByHostnameSilently(payload.hostname)
          .catch(() => {
            // send to sentry
          });
      }
    }
  }

  async activateWorkspace(
    user: User,
    workspace: Workspace,
    data: ActivateWorkspaceInput,
  ) {
    if (!data.displayName || !data.displayName.length) {
      throw new BadRequestException("'displayName' not provided");
    }

    if (
      workspace.activationStatus === WorkspaceActivationStatus.ONGOING_CREATION
    ) {
      throw new Error('Workspace is already being created');
    }

    if (
      workspace.activationStatus !== WorkspaceActivationStatus.PENDING_CREATION
    ) {
      throw new Error('Workspace is not pending creation');
    }

    await this.workspaceRepository.update(workspace.id, {
      activationStatus: WorkspaceActivationStatus.ONGOING_CREATION,
    });

    await this.featureFlagService.enableFeatureFlags(
      DEFAULT_FEATURE_FLAGS,
      workspace.id,
    );

    await this.workspaceManagerService.init(workspace.id);
    await this.userWorkspaceService.createWorkspaceMember(workspace.id, user);

    await this.workspaceRepository.update(workspace.id, {
      displayName: data.displayName,
      activationStatus: WorkspaceActivationStatus.ACTIVE,
    });

    return await this.workspaceRepository.findOneBy({
      id: workspace.id,
    });
  }

  async softDeleteWorkspace(id: string) {
    const workspace = await this.workspaceRepository.findOneBy({ id });

    assert(workspace, 'Workspace not found');

    await this.userWorkspaceRepository.delete({ workspaceId: id });

    if (this.billingService.isBillingEnabled()) {
      await this.billingSubscriptionService.deleteSubscription(workspace.id);
    }

    await this.workspaceManagerService.delete(id);

    return workspace;
  }

  async deleteWorkspace(id: string) {
    const userWorkspaces = await this.userWorkspaceRepository.findBy({
      workspaceId: id,
    });

    const workspace = await this.softDeleteWorkspace(id);

    for (const userWorkspace of userWorkspaces) {
      await this.handleRemoveWorkspaceMember(id, userWorkspace.userId);
    }

    await this.workspaceRepository.delete(id);

    return workspace;
  }

  async handleRemoveWorkspaceMember(workspaceId: string, userId: string) {
    await this.userWorkspaceRepository.delete({
      userId,
      workspaceId,
    });

    const userWorkspaces = await this.userWorkspaceRepository.find({
      where: {
        userId,
      },
    });

    if (userWorkspaces.length === 0) {
      await this.userRepository.softDelete(userId);
    }
  }

  async isSubdomainAvailable(subdomain: string) {
    const existingWorkspace = await this.workspaceRepository.findOne({
      where: { subdomain: subdomain },
    });

    return !existingWorkspace;
  }
}
