import { useSelectedRecordIdOrThrow } from '@/action-menu/actions/record-actions/single-record/hooks/useSelectedRecordIdOrThrow';
import { ActionHookWithoutObjectMetadataItem } from '@/action-menu/actions/types/ActionHook';
import { useRunWorkflowVersion } from '@/workflow/hooks/useRunWorkflowVersion';
import { useWorkflowWithCurrentVersion } from '@/workflow/hooks/useWorkflowWithCurrentVersion';
import { isDefined } from 'twenty-shared/utils';

export const useTestWorkflowSingleRecordAction: ActionHookWithoutObjectMetadataItem =
  () => {
    const recordId = useSelectedRecordIdOrThrow();

    const workflowWithCurrentVersion = useWorkflowWithCurrentVersion(recordId);

    const { runWorkflowVersion } = useRunWorkflowVersion();

    const onClick = () => {
      if (!isDefined(workflowWithCurrentVersion)) {
        return;
      }

      runWorkflowVersion({
        workflowVersionId: workflowWithCurrentVersion.currentVersion.id,
      });
    };

    return {
      onClick,
    };
  };
