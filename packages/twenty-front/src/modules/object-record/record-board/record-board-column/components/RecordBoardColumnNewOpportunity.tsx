import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { useAddNewCard } from '@/object-record/record-board/record-board-column/hooks/useAddNewCard';
import { recordBoardNewRecordByColumnIdSelector } from '@/object-record/record-board/states/selectors/recordBoardNewRecordByColumnIdSelector';
import { SingleRecordPicker } from '@/object-record/record-picker/single-record-picker/components/SingleRecordPicker';
import { viewableRecordIdState } from '@/object-record/record-right-drawer/states/viewableRecordIdState';
import { viewableRecordNameSingularState } from '@/object-record/record-right-drawer/states/viewableRecordNameSingularState';
import { OverlayContainer } from '@/ui/layout/overlay/components/OverlayContainer';
import { useRightDrawer } from '@/ui/layout/right-drawer/hooks/useRightDrawer';
import { RightDrawerPages } from '@/ui/layout/right-drawer/types/RightDrawerPages';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDefined } from 'twenty-shared';
import { IconList } from 'twenty-ui';
import { v4 } from 'uuid';

export const RecordBoardColumnNewOpportunity = ({
  columnId,
  position,
}: {
  columnId: string;
  position: 'last' | 'first';
}) => {
  const newRecord = useRecoilValue(
    recordBoardNewRecordByColumnIdSelector({
      familyKey: columnId,
      scopeId: columnId,
    }),
  );

  const { handleCreateSuccess, handleEntitySelect } = useAddNewCard({
    recordPickerComponentInstanceId: `add-new-card-record-picker-column-${columnId}`,
  });

  const { createOneRecord: createCompany } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.Company,
  });
  const { openRightDrawer } = useRightDrawer();

  const setViewableRecordId = useSetRecoilState(viewableRecordIdState);
  const setViewableRecordNameSingular = useSetRecoilState(
    viewableRecordNameSingularState,
  );

  const createCompanyOpportunityAndOpenRightDrawer = async (
    searchInput?: string,
  ) => {
    const newRecordId = v4();

    const createdCompany = await createCompany({
      id: newRecordId,
      name: searchInput,
    });

    setViewableRecordId(newRecordId);
    setViewableRecordNameSingular(CoreObjectNameSingular.Company);
    openRightDrawer(RightDrawerPages.ViewRecord, {
      title: 'Company',
      Icon: IconList,
    });

    if (isDefined(createdCompany)) {
      handleEntitySelect(position, createdCompany);
    }
  };

  return (
    <>
      {newRecord.isCreating && newRecord.position === position && (
        <OverlayContainer>
          <SingleRecordPicker
            componentInstanceId={`add-new-card-record-picker-column-${columnId}`}
            onCancel={() => handleCreateSuccess(position, columnId, false)}
            onRecordSelected={(company) =>
              company ? handleEntitySelect(position, company) : null
            }
            objectNameSingular={CoreObjectNameSingular.Company}
            onCreate={createCompanyOpportunityAndOpenRightDrawer}
          />
        </OverlayContainer>
      )}
    </>
  );
};
