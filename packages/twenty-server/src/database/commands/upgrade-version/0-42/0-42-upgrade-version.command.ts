import { InjectRepository } from '@nestjs/typeorm';

import { Command } from 'nest-commander';
import { Repository } from 'typeorm';

import { ActiveWorkspacesCommandRunner } from 'src/database/commands/active-workspaces.command';
import { BaseCommandOptions } from 'src/database/commands/base.command';
import { FixBodyV2ViewFieldPositionCommand } from 'src/database/commands/upgrade-version/0-42/0-42-fix-body-v2-view-field-position.command';
import { LimitAmountOfViewFieldCommand } from 'src/database/commands/upgrade-version/0-42/0-42-limit-amount-of-view-field';
import { MigrateRichTextFieldCommand } from 'src/database/commands/upgrade-version/0-42/0-42-migrate-rich-text-field.command';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { SyncWorkspaceMetadataCommand } from 'src/engine/workspace-manager/workspace-sync-metadata/commands/sync-workspace-metadata.command';

@Command({
  name: 'upgrade-0.42',
  description: 'Upgrade to 0.42',
})
export class UpgradeTo0_42Command extends ActiveWorkspacesCommandRunner {
  constructor(
    @InjectRepository(Workspace, 'core')
    protected readonly workspaceRepository: Repository<Workspace>,
    private readonly migrateRichTextFieldCommand: MigrateRichTextFieldCommand,
    private readonly fixBodyV2ViewFieldPositionCommand: FixBodyV2ViewFieldPositionCommand,
    private readonly limitAmountOfViewFieldCommand: LimitAmountOfViewFieldCommand,
    private readonly syncWorkspaceMetadataCommand: SyncWorkspaceMetadataCommand,
  ) {
    super(workspaceRepository);
  }

  async executeActiveWorkspacesCommand(
    passedParam: string[],
    options: BaseCommandOptions,
    workspaceIds: string[],
  ): Promise<void> {
    this.logger.log('Running command to upgrade to 0.42');

    await this.migrateRichTextFieldCommand.executeActiveWorkspacesCommand(
      passedParam,
      options,
      workspaceIds,
    );

    await this.fixBodyV2ViewFieldPositionCommand.executeActiveWorkspacesCommand(
      passedParam,
      options,
      workspaceIds,
    );

    await this.limitAmountOfViewFieldCommand.executeActiveWorkspacesCommand(
      passedParam,
      options,
      workspaceIds,
    );

    await this.syncWorkspaceMetadataCommand.executeActiveWorkspacesCommand(
      passedParam,
      {
        ...options,
        force: true,
      },
      workspaceIds,
    );
  }
}
