import { AdvancedFilterRuleOptionsDropdownButton } from '@/object-record/advanced-filter/components/AdvancedFilterRuleOptionsDropdownButton';

import { useCurrentViewViewFilterGroup } from '@/object-record/advanced-filter/hooks/useCurrentViewViewFilterGroup';
import { useDeleteCombinedViewFilterGroup } from '@/object-record/advanced-filter/hooks/useDeleteCombinedViewFilterGroup';
import { useRemoveRecordFilter } from '@/object-record/record-filter/hooks/useRemoveRecordFilter';
import { currentRecordFiltersComponentState } from '@/object-record/record-filter/states/currentRecordFiltersComponentState';

import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { ADVANCED_FILTER_DROPDOWN_ID } from '@/views/constants/AdvancedFilterDropdownId';
import { isDefined } from 'twenty-shared';
import { MenuItem } from 'twenty-ui';

type AdvancedFilterRuleOptionsDropdownProps =
  | {
      viewFilterId: string;
      viewFilterGroupId?: never;
    }
  | {
      viewFilterId?: never;
      viewFilterGroupId: string;
    };

export const AdvancedFilterRuleOptionsDropdown = ({
  viewFilterId,
  viewFilterGroupId,
}: AdvancedFilterRuleOptionsDropdownProps) => {
  const dropdownId = `advanced-filter-rule-options-${viewFilterId ?? viewFilterGroupId}`;

  const { removeRecordFilter } = useRemoveRecordFilter();
  const { deleteCombinedViewFilterGroup } = useDeleteCombinedViewFilterGroup();

  const { currentViewFilterGroup, childViewFiltersAndViewFilterGroups } =
    useCurrentViewViewFilterGroup({
      viewFilterGroupId,
    });

  const currentRecordFilters = useRecoilComponentValueV2(
    currentRecordFiltersComponentState,
  );

  const currentRecordFilter = currentRecordFilters.find(
    (recordFilter) => recordFilter.id === viewFilterId,
  );

  const handleRemove = async () => {
    if (isDefined(viewFilterId)) {
      removeRecordFilter(viewFilterId);

      const isOnlyViewFilterInGroup =
        childViewFiltersAndViewFilterGroups.length === 1;

      if (
        isOnlyViewFilterInGroup &&
        isDefined(currentRecordFilter?.viewFilterGroupId)
      ) {
        deleteCombinedViewFilterGroup(currentRecordFilter.viewFilterGroupId);
      }
    } else if (isDefined(currentViewFilterGroup)) {
      deleteCombinedViewFilterGroup(currentViewFilterGroup.id);

      // TODO: This is a temporary fix view filter group will be removed soon.
      const childViewFilters = childViewFiltersAndViewFilterGroups.filter(
        (child) => (child as any).__typename === 'ViewFilter',
      );

      for (const childViewFilter of childViewFilters) {
        removeRecordFilter(childViewFilter.id);
      }
    } else {
      throw new Error('No view filter or view filter group to remove');
    }
  };

  const removeButtonLabel = viewFilterId ? 'Remove rule' : 'Remove rule group';

  return (
    <Dropdown
      dropdownId={dropdownId}
      clickableComponent={
        <AdvancedFilterRuleOptionsDropdownButton dropdownId={dropdownId} />
      }
      dropdownComponents={
        <DropdownMenuItemsContainer>
          <MenuItem text={removeButtonLabel} onClick={handleRemove} />
        </DropdownMenuItemsContainer>
      }
      dropdownHotkeyScope={{ scope: ADVANCED_FILTER_DROPDOWN_ID }}
      dropdownOffset={{ y: 8, x: 0 }}
      dropdownPlacement="bottom-start"
    />
  );
};
