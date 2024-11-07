import styled from '@emotion/styled';

import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useAddNewCard } from '@/object-record/record-board/record-board-column/hooks/useAddNewCard';
import { recordBoardNewRecordByColumnIdSelector } from '@/object-record/record-board/states/selectors/recordBoardNewRecordByColumnIdSelector';
import { SingleEntitySelect } from '@/object-record/relation-picker/components/SingleEntitySelect';
import { useRecoilValue } from 'recoil';

const StyledCompanyPickerContainer = styled.div`
  align-items: center;
  align-self: baseline;
  background-color: ${({ theme }) => theme.background.primary};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.tertiary};
  cursor: pointer;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

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
  const { handleCreateSuccess, handleEntitySelect } = useAddNewCard();

  return (
    <>
      {newRecord.isCreating && newRecord.position === position && (
        <StyledCompanyPickerContainer>
          <SingleEntitySelect
            disableBackgroundBlur
            onCancel={() => handleCreateSuccess(position, columnId, false)}
            onEntitySelected={(company) =>
              company ? handleEntitySelect(position, company) : null
            }
            relationObjectNameSingular={CoreObjectNameSingular.Company}
            relationPickerScopeId="relation-picker"
            selectedRelationRecordIds={[]}
          />
        </StyledCompanyPickerContainer>
      )}
    </>
  );
};
