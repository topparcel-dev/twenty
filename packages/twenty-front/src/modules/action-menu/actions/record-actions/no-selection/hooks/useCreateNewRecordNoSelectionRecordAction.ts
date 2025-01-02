import { ActionHookWithObjectMetadataItem } from '@/action-menu/actions/types/ActionHook';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { viewableRecordIdState } from '@/object-record/record-right-drawer/states/viewableRecordIdState';
import { viewableRecordNameSingularState } from '@/object-record/record-right-drawer/states/viewableRecordNameSingularState';
import { useRightDrawer } from '@/ui/layout/right-drawer/hooks/useRightDrawer';
import { RightDrawerPages } from '@/ui/layout/right-drawer/types/RightDrawerPages';
import { useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';

export const useCreateNewRecordNoSelectionRecordAction: ActionHookWithObjectMetadataItem =
  ({ objectMetadataItem }) => {
    const { createOneRecord } = useCreateOneRecord({
      objectNameSingular: objectMetadataItem.nameSingular,
    });

    const setViewableRecordId = useSetRecoilState(viewableRecordIdState);
    const setViewableRecordNameSingular = useSetRecoilState(
      viewableRecordNameSingularState,
    );

    const { openRightDrawer } = useRightDrawer();

    const onClick = async () => {
      const newRecordId = v4();
      await createOneRecord({ id: newRecordId });

      setViewableRecordId(newRecordId);
      setViewableRecordNameSingular(objectMetadataItem.nameSingular);
      openRightDrawer(RightDrawerPages.ViewRecord);
    };

    return {
      shouldBeRegistered: true,
      onClick,
    };
  };
