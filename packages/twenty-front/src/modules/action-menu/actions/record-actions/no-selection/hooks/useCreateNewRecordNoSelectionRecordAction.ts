import { ActionHookWithObjectMetadataItem } from '@/action-menu/actions/types/ActionHook';
import { useOpenRecordInCommandMenu } from '@/command-menu/hooks/useOpenRecordInCommandMenu';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { v4 } from 'uuid';

export const useCreateNewRecordNoSelectionRecordAction: ActionHookWithObjectMetadataItem =
  ({ objectMetadataItem }) => {
    const { createOneRecord } = useCreateOneRecord({
      objectNameSingular: objectMetadataItem.nameSingular,
    });

    const { openRecordInCommandMenu } = useOpenRecordInCommandMenu();

    const onClick = async () => {
      const newRecordId = v4();
      await createOneRecord({ id: newRecordId });

      openRecordInCommandMenu(newRecordId, objectMetadataItem.nameSingular);
    };

    return {
      shouldBeRegistered: true,
      onClick,
    };
  };
