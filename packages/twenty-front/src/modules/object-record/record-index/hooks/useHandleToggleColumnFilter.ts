import { useCallback } from 'react';
import { v4 } from 'uuid';

import { useColumnDefinitionsFromFieldMetadata } from '@/object-metadata/hooks/useColumnDefinitionsFromFieldMetadata';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useSetFilterDefinitionUsedInDropdownInScope } from '@/object-record/object-filter-dropdown/hooks/useSetFilterDefinitionUsedInDropdownInScope';
import { Filter } from '@/object-record/object-filter-dropdown/types/Filter';
import { getOperandsForFilterDefinition } from '@/object-record/object-filter-dropdown/utils/getOperandsForFilterType';
import { isDropdownOpenComponentState } from '@/ui/layout/dropdown/states/isDropdownOpenComponentState';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { extractComponentState } from '@/ui/utilities/state/component-state/utils/extractComponentState';
import { useGetCurrentView } from '@/views/hooks/useGetCurrentView';
import { useUpsertCombinedViewFilters } from '@/views/hooks/useUpsertCombinedViewFilters';
import { availableFilterDefinitionsComponentState } from '@/views/states/availableFilterDefinitionsComponentState';
import { useRecoilCallback } from 'recoil';
import { isDefined } from '~/utils/isDefined';

type UseHandleToggleColumnFilterProps = {
  objectNameSingular: string;
  viewBarId: string;
};

export const useHandleToggleColumnFilter = ({
  objectNameSingular,
  viewBarId,
}: UseHandleToggleColumnFilterProps) => {
  const { objectMetadataItem } = useObjectMetadataItem({
    objectNameSingular,
  });

  const { columnDefinitions } =
    useColumnDefinitionsFromFieldMetadata(objectMetadataItem);

  const { upsertCombinedViewFilter } = useUpsertCombinedViewFilters(viewBarId);

  const openDropdown = useRecoilCallback(({ set }) => {
    return (dropdownId: string) => {
      const dropdownOpenState = extractComponentState(
        isDropdownOpenComponentState,
        dropdownId,
      );

      set(dropdownOpenState, true);
    };
  }, []);

  const availableFilterDefinitions = useRecoilComponentValueV2(
    availableFilterDefinitionsComponentState,
  );

  const { currentViewWithCombinedFiltersAndSorts } = useGetCurrentView();

  const { setFilterDefinitionUsedInDropdownInScope } =
    useSetFilterDefinitionUsedInDropdownInScope();

  const handleToggleColumnFilter = useCallback(
    async (fieldMetadataId: string) => {
      const correspondingColumnDefinition = columnDefinitions.find(
        (columnDefinition) =>
          columnDefinition.fieldMetadataId === fieldMetadataId,
      );

      if (!isDefined(correspondingColumnDefinition)) return;

      const newFilterId = v4();

      const existingViewFilter =
        currentViewWithCombinedFiltersAndSorts?.viewFilters.find(
          (viewFilter) => viewFilter.fieldMetadataId === fieldMetadataId,
        );

      if (!existingViewFilter) {
        const filterDefinition = availableFilterDefinitions.find(
          (fd) => fd.fieldMetadataId === fieldMetadataId,
        );

        if (!isDefined(filterDefinition)) {
          throw new Error('Filter definition not found');
        }

        const availableOperandsForFilter =
          getOperandsForFilterDefinition(filterDefinition);

        const defaultOperand = availableOperandsForFilter[0];

        const newFilter: Filter = {
          id: newFilterId,
          fieldMetadataId,
          operand: defaultOperand,
          displayValue: '',
          definition: filterDefinition,
          value: '',
        };

        await upsertCombinedViewFilter(newFilter);

        setFilterDefinitionUsedInDropdownInScope(
          newFilter.id,
          filterDefinition,
        );
      }

      openDropdown(existingViewFilter?.id ?? newFilterId);
    },
    [
      openDropdown,
      columnDefinitions,
      upsertCombinedViewFilter,
      setFilterDefinitionUsedInDropdownInScope,
      currentViewWithCombinedFiltersAndSorts,
      availableFilterDefinitions,
    ],
  );

  return handleToggleColumnFilter;
};
