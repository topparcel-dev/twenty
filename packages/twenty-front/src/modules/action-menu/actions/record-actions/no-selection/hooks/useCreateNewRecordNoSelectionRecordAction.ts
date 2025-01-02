import { ActionHookWithObjectMetadataItem } from '@/action-menu/actions/types/ActionHook';
import { commandMenuViewableRecordIdState } from '@/command-menu/states/commandMenuViewableRecordIdState';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';

export const useCreateNewRecordNoSelectionRecordAction: ActionHookWithObjectMetadataItem =
  ({ objectMetadataItem }) => {
    const { createOneRecord } = useCreateOneRecord({
      objectNameSingular: objectMetadataItem.nameSingular,
    });

    const setCommandMenuViewableRecordId = useSetRecoilState(
      commandMenuViewableRecordIdState,
    );

    const onClick = async () => {
      const newRecordId = v4();
      await createOneRecord({ id: newRecordId });

      setCommandMenuViewableRecordId(newRecordId);
    };

    return {
      shouldBeRegistered: true,
      onClick,
    };
  };
