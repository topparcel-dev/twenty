import { Injectable } from '@nestjs/common';

import { ObjectRecordCreateEvent } from 'src/engine/core-modules/event-emitter/types/object-record-create.event';
import { ObjectRecordDeleteEvent } from 'src/engine/core-modules/event-emitter/types/object-record-delete.event';
import { InjectMessageQueue } from 'src/engine/core-modules/message-queue/decorators/message-queue.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/core-modules/message-queue/services/message-queue.service';
import { WorkspaceEventBatch } from 'src/engine/workspace-event-emitter/workspace-event.type';
import {
  WorkflowVersionStatus,
  WorkflowVersionWorkspaceEntity,
} from 'src/modules/workflow/common/standard-objects/workflow-version.workspace-entity';
import {
  WorkflowStatusesUpdateJob,
  WorkflowVersionBatchEvent,
  WorkflowVersionEventType,
  WorkflowVersionStatusUpdate,
} from 'src/modules/workflow/workflow-status/jobs/workflow-statuses-update.job';
import { OnDatabaseEvent } from 'src/engine/api/graphql/graphql-query-runner/decorators/on-database-event.decorator';
import { DatabaseEventAction } from 'src/engine/api/graphql/graphql-query-runner/enums/database-event-action';

@Injectable()
export class WorkflowVersionStatusListener {
  constructor(
    @InjectMessageQueue(MessageQueue.workflowQueue)
    private readonly messageQueueService: MessageQueueService,
  ) {}

  @OnDatabaseEvent('workflowVersion', DatabaseEventAction.CREATED)
  async handleWorkflowVersionCreated(
    payload: WorkspaceEventBatch<
      ObjectRecordCreateEvent<WorkflowVersionWorkspaceEntity>
    >,
  ): Promise<void> {
    const workflowIds = payload.events
      .filter(
        (event) =>
          !event.properties.after.status ||
          event.properties.after.status === WorkflowVersionStatus.DRAFT,
      )
      .map((event) => event.properties.after.workflowId);

    if (workflowIds.length === 0) {
      return;
    }

    await this.messageQueueService.add<WorkflowVersionBatchEvent>(
      WorkflowStatusesUpdateJob.name,
      {
        type: WorkflowVersionEventType.CREATE,
        workspaceId: payload.workspaceId,
        workflowIds,
      },
    );
  }

  @OnDatabaseEvent('workflowVersion', DatabaseEventAction.UPDATED)
  async handleWorkflowVersionUpdated(
    payload: WorkspaceEventBatch<WorkflowVersionStatusUpdate>,
  ): Promise<void> {
    await this.messageQueueService.add<WorkflowVersionBatchEvent>(
      WorkflowStatusesUpdateJob.name,
      {
        type: WorkflowVersionEventType.STATUS_UPDATE,
        workspaceId: payload.workspaceId,
        statusUpdates: payload.events,
      },
    );
  }

  @OnDatabaseEvent('workflowVersion', DatabaseEventAction.DELETED)
  async handleWorkflowVersionDeleted(
    payload: WorkspaceEventBatch<
      ObjectRecordDeleteEvent<WorkflowVersionWorkspaceEntity>
    >,
  ): Promise<void> {
    const workflowIds = payload.events
      .filter(
        (event) =>
          event.properties.before.status === WorkflowVersionStatus.DRAFT,
      )
      .map((event) => event.properties.before.workflowId);

    if (workflowIds.length === 0) {
      return;
    }

    await this.messageQueueService.add<WorkflowVersionBatchEvent>(
      WorkflowStatusesUpdateJob.name,
      {
        type: WorkflowVersionEventType.DELETE,
        workspaceId: payload.workspaceId,
        workflowIds,
      },
    );
  }
}
