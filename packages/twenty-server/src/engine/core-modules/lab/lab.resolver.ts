import { UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthGraphqlApiExceptionFilter } from 'src/engine/core-modules/auth/filters/auth-graphql-api-exception.filter';
import { UpdateLabPublicFeatureFlagInput } from 'src/engine/core-modules/lab/dtos/update-lab-public-feature-flag.input';
import { LabService } from 'src/engine/core-modules/lab/services/lab.service';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { AuthWorkspace } from 'src/engine/decorators/auth/auth-workspace.decorator';
import { WorkspaceAuthGuard } from 'src/engine/guards/workspace-auth.guard';

@Resolver()
@UseFilters(AuthGraphqlApiExceptionFilter)
export class LabResolver {
  constructor(private labService: LabService) {}

  @UseGuards(WorkspaceAuthGuard)
  @Mutation(() => Boolean)
  async updateLabPublicFeatureFlag(
    @Args('input') input: UpdateLabPublicFeatureFlagInput,
    @AuthWorkspace() workspace: Workspace,
  ): Promise<boolean> {
    await this.labService.updateLabPublicFeatureFlag(workspace.id, input);

    return true;
  }
}
