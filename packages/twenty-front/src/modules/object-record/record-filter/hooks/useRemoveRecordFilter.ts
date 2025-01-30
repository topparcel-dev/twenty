import { currentRecordFiltersComponentState } from '@/object-record/record-filter/states/currentRecordFiltersComponentState';
import { useRecoilComponentCallbackStateV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackStateV2';
import { getSnapshotValue } from '@/ui/utilities/state/utils/getSnapshotValue';
import { useRecoilCallback } from 'recoil';

export const useRemoveRecordFilter = () => {
  const currentRecordFiltersCallbackState = useRecoilComponentCallbackStateV2(
    currentRecordFiltersComponentState,
  );

  const removeRecordFilter = useRecoilCallback(
    ({ set, snapshot }) =>
      (fieldMetadataId: string) => {
        const currentRecordFilters = getSnapshotValue(
          snapshot,
          currentRecordFiltersCallbackState,
        );

        const foundRecordFilterInCurrentRecordFilters =
          currentRecordFilters.some(
            (existingFilter) =>
              existingFilter.fieldMetadataId === fieldMetadataId,
          );

        if (foundRecordFilterInCurrentRecordFilters) {
          set(currentRecordFiltersCallbackState, (currentRecordFilters) => {
            const newCurrentRecordFilters = [...currentRecordFilters];

            const indexOfFilterToRemove = newCurrentRecordFilters.findIndex(
              (existingFilter) =>
                existingFilter.fieldMetadataId === fieldMetadataId,
            );

            newCurrentRecordFilters.splice(indexOfFilterToRemove, 1);

            return newCurrentRecordFilters;
          });
        }
      },
    [currentRecordFiltersCallbackState],
  );

  return {
    removeRecordFilter,
  };
};
