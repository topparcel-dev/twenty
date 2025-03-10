import { useMapToObjectRecordIdentifier } from '@/object-metadata/hooks/useMapToObjectRecordIdentifier';
import { DEFAULT_SEARCH_REQUEST_LIMIT } from '@/object-record/constants/DefaultSearchRequestLimit';
import { useSearchRecords } from '@/object-record/hooks/useSearchRecords';
import { MultipleRecordPickerRecords } from '@/object-record/record-picker/multiple-record-picker/types/MultipleRecordPickerRecords';
import { SingleRecordPickerRecord } from '@/object-record/record-picker/single-record-picker/types/SingleRecordPickerRecord';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { isDefined } from 'twenty-shared';

export const useFilteredSearchRecordQuery = ({
  selectedIds,
  limit,
  excludedRecordIds = [],
  objectNameSingular,
  searchFilter,
}: {
  selectedIds: string[];
  limit?: number;
  excludedRecordIds?: string[];
  objectNameSingular: string;
  searchFilter?: string;
}): MultipleRecordPickerRecords<SingleRecordPickerRecord> => {
  const { mapToObjectRecordIdentifier } = useMapToObjectRecordIdentifier({
    objectNameSingular,
  });

  const mappingFunction = (record: ObjectRecord) => ({
    ...mapToObjectRecordIdentifier(record),
    record,
  });
  const selectedIdsFilter = { id: { in: selectedIds } };

  const { loading: selectedRecordsLoading, records: selectedRecords } =
    useSearchRecords({
      objectNameSingular,
      filter: selectedIdsFilter,
      skip: !selectedIds.length,
      searchInput: '',
    });

  const {
    loading: filteredSelectedRecordsLoading,
    records: filteredSelectedRecords,
  } = useSearchRecords({
    objectNameSingular,
    filter: selectedIdsFilter,
    skip: !selectedIds.length,
    searchInput: searchFilter,
  });

  const notFilterIds = [...selectedIds, ...excludedRecordIds];
  const notFilter = notFilterIds.length
    ? { not: { id: { in: notFilterIds } } }
    : undefined;
  const { loading: recordsToSelectLoading, records: recordsToSelect } =
    useSearchRecords({
      objectNameSingular,
      filter: notFilter,
      limit: limit ?? DEFAULT_SEARCH_REQUEST_LIMIT,
      searchInput: searchFilter,
      fetchPolicy: 'cache-and-network',
    });

  return {
    selectedRecords: selectedRecords.map(mappingFunction).filter(isDefined),
    filteredSelectedRecords: filteredSelectedRecords
      .map(mappingFunction)
      .filter(isDefined),
    recordsToSelect: recordsToSelect.map(mappingFunction).filter(isDefined),
    loading:
      recordsToSelectLoading ||
      filteredSelectedRecordsLoading ||
      selectedRecordsLoading,
  };
};
