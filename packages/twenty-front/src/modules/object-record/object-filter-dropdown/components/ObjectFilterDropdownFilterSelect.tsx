import styled from '@emotion/styled';

import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';

import { useAdvancedFilterDropdown } from '@/object-record/advanced-filter/hooks/useAdvancedFilterDropdown';
import { AdvancedFilterButton } from '@/object-record/object-filter-dropdown/components/AdvancedFilterButton';
import { ObjectFilterDropdownFilterSelectMenuItem } from '@/object-record/object-filter-dropdown/components/ObjectFilterDropdownFilterSelectMenuItem';
import { OBJECT_FILTER_DROPDOWN_ID } from '@/object-record/object-filter-dropdown/constants/ObjectFilterDropdownId';
import { useFilterDropdown } from '@/object-record/object-filter-dropdown/hooks/useFilterDropdown';
import { useSelectFilter } from '@/object-record/object-filter-dropdown/hooks/useSelectFilter';
import { FiltersHotkeyScope } from '@/object-record/object-filter-dropdown/types/FiltersHotkeyScope';
import { RecordIndexRootPropsContext } from '@/object-record/record-index/contexts/RecordIndexRootPropsContext';
import { hiddenTableColumnsComponentSelector } from '@/object-record/record-table/states/selectors/hiddenTableColumnsComponentSelector';
import { visibleTableColumnsComponentSelector } from '@/object-record/record-table/states/selectors/visibleTableColumnsComponentSelector';
import { DropdownMenuSeparator } from '@/ui/layout/dropdown/components/DropdownMenuSeparator';
import { SelectableItem } from '@/ui/layout/selectable-list/components/SelectableItem';
import { SelectableList } from '@/ui/layout/selectable-list/components/SelectableList';
import { useSelectableList } from '@/ui/layout/selectable-list/hooks/useSelectableList';
import { ScrollWrapper } from '@/ui/utilities/scroll/components/ScrollWrapper';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { useGetCurrentView } from '@/views/hooks/useGetCurrentView';
import { availableFilterDefinitionsComponentState } from '@/views/states/availableFilterDefinitionsComponentState';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';
import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { isDefined } from 'twenty-ui';

export const StyledInput = styled.input`
  background: transparent;
  border: none;
  border-top: none;
  border-bottom: 1px solid ${({ theme }) => theme.border.color.light};
  border-radius: 0;
  border-top-left-radius: ${({ theme }) => theme.border.radius.md};
  border-top-right-radius: ${({ theme }) => theme.border.radius.md};
  color: ${({ theme }) => theme.font.color.primary};
  margin: 0;
  outline: none;
  padding: ${({ theme }) => theme.spacing(2)};
  min-height: 19px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.font.size.sm};

  font-weight: inherit;
  max-width: 100%;
  overflow: hidden;
  text-decoration: none;

  &::placeholder {
    color: ${({ theme }) => theme.font.color.light};
  }
`;

type ObjectFilterDropdownFilterSelectProps = {
  isAdvancedFilterButtonVisible?: boolean;
};

export const ObjectFilterDropdownFilterSelect = ({
  isAdvancedFilterButtonVisible,
}: ObjectFilterDropdownFilterSelectProps) => {
  const { recordIndexId } = useContext(RecordIndexRootPropsContext);

  const {
    setObjectFilterDropdownSearchInput,
    objectFilterDropdownSearchInputState,
    advancedFilterViewFilterIdState,
  } = useFilterDropdown();

  const advancedFilterViewFilterId = useRecoilValue(
    advancedFilterViewFilterIdState,
  );

  const { closeAdvancedFilterDropdown } = useAdvancedFilterDropdown(
    advancedFilterViewFilterId,
  );

  const objectFilterDropdownSearchInput = useRecoilValue(
    objectFilterDropdownSearchInputState,
  );

  const availableFilterDefinitions = useRecoilComponentValueV2(
    availableFilterDefinitionsComponentState,
  );

  const visibleTableColumns = useRecoilComponentValueV2(
    visibleTableColumnsComponentSelector,
    recordIndexId,
  );
  const visibleColumnsIds = visibleTableColumns.map(
    (column) => column.fieldMetadataId,
  );
  const hiddenTableColumns = useRecoilComponentValueV2(
    hiddenTableColumnsComponentSelector,
    recordIndexId,
  );
  const hiddenColumnIds = hiddenTableColumns.map(
    (column) => column.fieldMetadataId,
  );

  const filteredSearchInputFilterDefinitions =
    availableFilterDefinitions.filter((item) =>
      item.label
        .toLocaleLowerCase()
        .includes(objectFilterDropdownSearchInput.toLocaleLowerCase()),
    );

  const visibleColumnsFilterDefinitions = filteredSearchInputFilterDefinitions

    .sort((a, b) => {
      return (
        visibleColumnsIds.indexOf(a.fieldMetadataId) -
        visibleColumnsIds.indexOf(b.fieldMetadataId)
      );
    })
    .filter((item) => visibleColumnsIds.includes(item.fieldMetadataId));

  const hiddenColumnsFilterDefinitions = filteredSearchInputFilterDefinitions
    .sort((a, b) => a.label.localeCompare(b.label))
    .filter((item) => hiddenColumnIds.includes(item.fieldMetadataId));

  const selectableListItemIds = availableFilterDefinitions.map(
    (item) => item.fieldMetadataId,
  );

  const { selectFilter } = useSelectFilter();

  const { resetSelectedItem } = useSelectableList(OBJECT_FILTER_DROPDOWN_ID);

  const handleEnter = (itemId: string) => {
    const selectedFilterDefinition = availableFilterDefinitions.find(
      (item) => item.fieldMetadataId === itemId,
    );

    if (!isDefined(selectedFilterDefinition)) {
      return;
    }

    resetSelectedItem();
    selectFilter({ filterDefinition: selectedFilterDefinition });
    closeAdvancedFilterDropdown();
  };

  const shoudShowSeparator =
    visibleColumnsFilterDefinitions.length > 0 &&
    hiddenColumnsFilterDefinitions.length > 0;

  const { currentViewId, currentViewWithCombinedFiltersAndSorts } =
    useGetCurrentView();

  const isAdvancedFiltersEnabled = useIsFeatureEnabled(
    'IS_ADVANCED_FILTERS_ENABLED',
  );

  const shouldShowAdvancedFilterButton =
    isDefined(currentViewId) &&
    isDefined(currentViewWithCombinedFiltersAndSorts?.objectMetadataId) &&
    isAdvancedFilterButtonVisible &&
    isAdvancedFiltersEnabled;

  return (
    <>
      <StyledInput
        value={objectFilterDropdownSearchInput}
        autoFocus
        placeholder="Search fields"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setObjectFilterDropdownSearchInput(event.target.value)
        }
      />
      <ScrollWrapper contextProviderName="dropdownMenuItemsContainer">
        <SelectableList
          hotkeyScope={FiltersHotkeyScope.ObjectFilterDropdownButton}
          selectableItemIdArray={selectableListItemIds}
          selectableListId={OBJECT_FILTER_DROPDOWN_ID}
          onEnter={handleEnter}
        >
          <DropdownMenuItemsContainer>
            {visibleColumnsFilterDefinitions.map(
              (visibleFilterDefinition, index) => (
                <SelectableItem
                  itemId={visibleFilterDefinition.fieldMetadataId}
                  key={`visible-select-filter-${index}`}
                >
                  <ObjectFilterDropdownFilterSelectMenuItem
                    filterDefinition={visibleFilterDefinition}
                  />
                </SelectableItem>
              ),
            )}
          </DropdownMenuItemsContainer>
          {shoudShowSeparator && <DropdownMenuSeparator />}
          <DropdownMenuItemsContainer>
            {hiddenColumnsFilterDefinitions.map(
              (hiddenFilterDefinition, index) => (
                <SelectableItem
                  itemId={hiddenFilterDefinition.fieldMetadataId}
                  key={`hidden-select-filter-${index}`}
                >
                  <ObjectFilterDropdownFilterSelectMenuItem
                    filterDefinition={hiddenFilterDefinition}
                  />
                </SelectableItem>
              ),
            )}
          </DropdownMenuItemsContainer>
        </SelectableList>
        {shouldShowAdvancedFilterButton && <AdvancedFilterButton />}
      </ScrollWrapper>
    </>
  );
};
