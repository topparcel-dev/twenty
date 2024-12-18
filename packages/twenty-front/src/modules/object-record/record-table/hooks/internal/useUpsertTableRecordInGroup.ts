import { useRecoilCallback } from 'recoil';

import { getLabelIdentifierFieldMetadataItem } from '@/object-metadata/utils/getLabelIdentifierFieldMetadataItem';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { recordFieldInputDraftValueComponentSelector } from '@/object-record/record-field/states/selectors/recordFieldInputDraftValueComponentSelector';
import { recordGroupDefinitionFamilyState } from '@/object-record/record-group/states/recordGroupDefinitionFamilyState';
import { useRecordTableContextOrThrow } from '@/object-record/record-table/contexts/RecordTableContext';
import { recordTablePendingRecordIdByGroupComponentFamilyState } from '@/object-record/record-table/states/recordTablePendingRecordIdByGroupComponentFamilyState';
import { getScopeIdFromComponentId } from '@/ui/utilities/recoil-scope/utils/getScopeIdFromComponentId';
import { getSnapshotValue } from '@/ui/utilities/recoil-scope/utils/getSnapshotValue';
import { useRecoilComponentCallbackStateV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackStateV2';
import { extractComponentSelector } from '@/ui/utilities/state/component-state/utils/extractComponentSelector';
import { isDefined } from '~/utils/isDefined';

export const useUpsertTableRecordInGroup = (recordGroupId: string) => {
  const { objectMetadataItem, objectNameSingular } =
    useRecordTableContextOrThrow();

  const { createOneRecord } = useCreateOneRecord({
    objectNameSingular,
    shouldMatchRootQueryFilter: true,
  });

  const recordTablePendingRecordIdByGroupFamilyState =
    useRecoilComponentCallbackStateV2(
      recordTablePendingRecordIdByGroupComponentFamilyState,
    );

  const upsertTableRecordInGroup = useRecoilCallback(
    ({ snapshot }) =>
      (persistField: () => void, recordId: string, fieldName: string) => {
        const labelIdentifierFieldMetadataItem =
          getLabelIdentifierFieldMetadataItem(objectMetadataItem);

        const fieldScopeId = getScopeIdFromComponentId(
          `${recordId}-${fieldName}`,
        );

        const draftValueSelector = extractComponentSelector(
          recordFieldInputDraftValueComponentSelector,
          fieldScopeId,
        );

        const draftValue = getSnapshotValue(snapshot, draftValueSelector());

        // We're in a record group
        const recordTablePendingRecordId = getSnapshotValue(
          snapshot,
          recordTablePendingRecordIdByGroupFamilyState(recordGroupId),
        );

        const recordGroupDefinition = getSnapshotValue(
          snapshot,
          recordGroupDefinitionFamilyState(recordGroupId),
        );

        const recordGroupFieldMetadataItem = objectMetadataItem.fields.find(
          (fieldMetadata) =>
            fieldMetadata.id === recordGroupDefinition?.fieldMetadataId,
        );

        if (
          isDefined(recordTablePendingRecordId) &&
          isDefined(recordGroupDefinition) &&
          isDefined(recordGroupFieldMetadataItem) &&
          isDefined(draftValue)
        ) {
          createOneRecord({
            id: recordTablePendingRecordId,
            [labelIdentifierFieldMetadataItem?.name ?? 'name']: draftValue,
            [recordGroupFieldMetadataItem.name]: recordGroupDefinition.value,
            position: 'first',
          });
        } else if (!recordTablePendingRecordId) {
          persistField();
        }
      },
    [
      createOneRecord,
      objectMetadataItem,
      recordGroupId,
      recordTablePendingRecordIdByGroupFamilyState,
    ],
  );

  return { upsertTableRecordInGroup };
};
