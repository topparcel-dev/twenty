import { ActionHookWithObjectMetadataItem } from '@/action-menu/actions/types/ActionHook';
import { getRecordIndexIdFromObjectNamePlural } from '@/object-record/record-board/utils/getRecordIndexIdFromObjectNamePlural';
import { useCreateNewTableRecord } from '@/object-record/record-table/hooks/useCreateNewTableRecords';

export const useCreateNewTableRecordNoSelectionRecordAction: ActionHookWithObjectMetadataItem =
  ({ objectMetadataItem }) => {
    const recordTableId = getRecordIndexIdFromObjectNamePlural(
      objectMetadataItem.namePlural,
    );

    const { createNewTableRecord } = useCreateNewTableRecord({
      objectMetadataItem,
      recordTableId,
    });

    const onClick = () => {
      createNewTableRecord();
    };

    return {
      shouldBeRegistered: true,
      onClick,
    };
  };
