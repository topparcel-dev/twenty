import { useDropdown } from '@/dropdown/hooks/useDropdown';
import { RecordBoardColumnHeaderAggregateDropdownContext } from '@/object-record/record-board/record-board-column/components/RecordBoardColumnHeaderAggregateDropdownContext';
import { aggregateOperationComponentState } from '@/object-record/record-board/record-board-column/states/aggregateOperationComponentState';
import { availableFieldIdsForAggregateOperationComponentState } from '@/object-record/record-board/record-board-column/states/availableFieldIdsForAggregateOperationComponentState';
import { getAggregateOperationLabel } from '@/object-record/record-board/record-board-column/utils/getAggregateOperationLabel';
import { DropdownMenuHeader } from '@/ui/layout/dropdown/components/DropdownMenuHeader';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { useUpdateViewAggregate } from '@/views/hooks/useUpdateViewAggregate';
import { Icon123, IconChevronLeft, MenuItem, useIcons } from 'twenty-ui';
import { isDefined } from '~/utils/isDefined';

export const RecordBoardColumnHeaderAggregateDropdownFieldsContent = () => {
  const { closeDropdown, resetContent, objectMetadataItem } = useDropdown({
    context: RecordBoardColumnHeaderAggregateDropdownContext,
  });

  const { updateViewAggregate } = useUpdateViewAggregate();

  const { getIcon } = useIcons();

  const aggregateOperation = useRecoilComponentValueV2(
    aggregateOperationComponentState,
  );

  const availableFieldsIdsForAggregateOperation = useRecoilComponentValueV2(
    availableFieldIdsForAggregateOperationComponentState,
  );

  if (!isDefined(aggregateOperation)) return <></>;

  return (
    <>
      <DropdownMenuHeader StartIcon={IconChevronLeft} onClick={resetContent}>
        {getAggregateOperationLabel(aggregateOperation)}
      </DropdownMenuHeader>
      <DropdownMenuItemsContainer>
        {availableFieldsIdsForAggregateOperation.map((fieldId) => {
          const fieldMetadata = objectMetadataItem.fields.find(
            (field) => field.id === fieldId,
          );

          if (!fieldMetadata) return null;
          return (
            <MenuItem
              key={fieldId}
              onClick={() => {
                updateViewAggregate({
                  kanbanAggregateOperationFieldMetadataId: fieldId,
                  kanbanAggregateOperation: aggregateOperation,
                });
                closeDropdown();
              }}
              LeftIcon={getIcon(fieldMetadata.icon) ?? Icon123}
              text={fieldMetadata.label}
            />
          );
        })}
      </DropdownMenuItemsContainer>
    </>
  );
};
