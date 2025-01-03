import { ActionHookWithObjectMetadataItem } from '@/action-menu/actions/types/ActionHook';
import { useCommandMenu } from '@/command-menu/hooks/useCommandMenu';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { v4 } from 'uuid';

export const useCreateNewRecordNoSelectionRecordAction: ActionHookWithObjectMetadataItem =
  ({ objectMetadataItem }) => {
    const { createOneRecord } = useCreateOneRecord({
      objectNameSingular: objectMetadataItem.nameSingular,
    });

    const { openRecordInCommandMenu } = useCommandMenu();

    const onClick = async () => {
      const newRecordId = v4();
      await createOneRecord({ id: newRecordId });

      openRecordInCommandMenu({
        recordId: newRecordId,
        objectNameSingular: objectMetadataItem.nameSingular,
      });
    };

    return {
      shouldBeRegistered: true,
      onClick,
    };
  };
