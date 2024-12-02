import {
  SingleRecordSelectMenuItems,
  SingleRecordSelectMenuItemsProps,
} from '@/object-record/relation-picker/components/SingleRecordSelectMenuItems';
import { useRecordPickerRecordsOptions } from '@/object-record/relation-picker/hooks/useRecordPickerRecordsOptions';
import { useRecordSelectSearch } from '@/object-record/relation-picker/hooks/useRecordSelectSearch';
import { CreateNewButton } from '@/ui/input/relation-picker/components/CreateNewButton';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { DropdownMenuSearchInput } from '@/ui/layout/dropdown/components/DropdownMenuSearchInput';
import { DropdownMenuSeparator } from '@/ui/layout/dropdown/components/DropdownMenuSeparator';
import { Placement } from '@floating-ui/react';
import { IconPlus } from 'twenty-ui';
import { isDefined } from '~/utils/isDefined';
import { isUndefinedOrNull } from '~/utils/isUndefinedOrNull';

export type SingleRecordSelectMenuItemsWithSearchProps = {
  excludedRecordIds?: string[];
  onCreate?: ((searchInput?: string) => void) | (() => void);
  objectNameSingular: string;
  recordPickerInstanceId?: string;
  selectedRecordIds: string[];
  dropdownPlacement?: Placement | null;
} & Pick<
  SingleRecordSelectMenuItemsProps,
  | 'EmptyIcon'
  | 'emptyLabel'
  | 'onCancel'
  | 'onRecordSelected'
  | 'selectedRecord'
>;

export const SingleRecordSelectMenuItemsWithSearch = ({
  EmptyIcon,
  emptyLabel,
  excludedRecordIds,
  onCancel,
  onCreate,
  onRecordSelected,
  objectNameSingular,
  recordPickerInstanceId = 'record-picker',
  selectedRecordIds,
  dropdownPlacement,
}: SingleRecordSelectMenuItemsWithSearchProps) => {
  const { handleSearchFilterChange } = useRecordSelectSearch({
    recordPickerInstanceId,
  });

  const { records, recordPickerSearchFilter } = useRecordPickerRecordsOptions({
    objectNameSingular,
    selectedRecordIds,
    excludedRecordIds,
  });

  const createNewButton = isDefined(onCreate) && (
    <CreateNewButton
      onClick={() => onCreate?.(recordPickerSearchFilter)}
      LeftIcon={IconPlus}
      text="Add New"
    />
  );

  const results = (
    <SingleRecordSelectMenuItems
      recordsToSelect={records.recordsToSelect}
      loading={records.loading}
      selectedRecord={
        records.recordsToSelect.length === 1
          ? records.recordsToSelect[0]
          : undefined
      }
      shouldSelectEmptyOption={selectedRecordIds?.length === 0}
      hotkeyScope={recordPickerInstanceId}
      isFiltered={!!recordPickerSearchFilter}
      {...{
        EmptyIcon,
        emptyLabel,
        onCancel,
        onRecordSelected,
      }}
    />
  );

  return (
    <>
      {dropdownPlacement?.includes('end') && (
        <>
          <DropdownMenuItemsContainer>
            {createNewButton}
          </DropdownMenuItemsContainer>
          {records.recordsToSelect.length > 0 && <DropdownMenuSeparator />}
          {records.recordsToSelect.length > 0 && results}
          <DropdownMenuSeparator />
        </>
      )}
      <DropdownMenuSearchInput onChange={handleSearchFilterChange} autoFocus />
      {(dropdownPlacement?.includes('start') ||
        isUndefinedOrNull(dropdownPlacement)) && (
        <>
          <DropdownMenuSeparator />
          {records.recordsToSelect.length > 0 && results}
          {records.recordsToSelect.length > 0 && isDefined(onCreate) && (
            <DropdownMenuSeparator />
          )}
          {isDefined(onCreate) && (
            <DropdownMenuItemsContainer>
              {createNewButton}
            </DropdownMenuItemsContainer>
          )}
        </>
      )}
    </>
  );
};
