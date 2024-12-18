import { InjectRepository } from '@nestjs/typeorm';

import { Command } from 'nest-commander';
import { Repository } from 'typeorm';

import { ActiveWorkspacesCommandRunner } from 'src/database/commands/active-workspaces.command';
import { BaseCommandOptions } from 'src/database/commands/base.command';
import { RecordPositionBackfillService } from 'src/engine/api/graphql/workspace-query-runner/services/record-position-backfill-service';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';

@Command({
  name: 'migrate-0.40:backfill-record-position',
  description: 'Backfill record position',
})
export class RecordPositionBackfillCommand extends ActiveWorkspacesCommandRunner {
  constructor(
    @InjectRepository(Workspace, 'core')
    protected readonly workspaceRepository: Repository<Workspace>,
    private readonly recordPositionBackfillService: RecordPositionBackfillService,
  ) {
    super(workspaceRepository);
  }

  async executeActiveWorkspacesCommand(
    _passedParam: string[],
    options: BaseCommandOptions,
    workspaceIds: string[],
  ): Promise<void> {
    for (const workspaceId of workspaceIds) {
      await this.recordPositionBackfillService.backfill(
        workspaceId,
        options.dryRun ?? false,
      );
    }
  }
}
