import { useContext } from 'react';
import { IconForbid } from 'twenty-ui';

import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import { FieldDefinition } from '@/object-record/record-field/types/FieldDefinition';
import { FieldRelationMetadata } from '@/object-record/record-field/types/FieldMetadata';
import { SingleRecordPicker } from '@/object-record/record-picker/components/SingleRecordPicker';
import { useAddNewRecordAndOpenRightDrawer } from '@/object-record/record-picker/hooks/useAddNewRecordAndOpenRightDrawer';
import { SearchPickerInitialValueEffect } from '@/object-record/record-picker/legacy/components/SearchPickerInitialValueEffect';
import { RelationPickerHotkeyScope } from '@/object-record/record-picker/legacy/types/RelationPickerHotkeyScope';
import { SingleRecordPickerRecord } from '@/object-record/record-picker/types/SingleRecordPickerRecord';

export type RelationPickerProps = {
  selectedRecordId?: string;
  onSubmit: (selectedRecord: SingleRecordPickerRecord | null) => void;
  onCancel?: () => void;
  width?: number;
  excludedRecordIds?: string[];
  initialSearchFilter?: string | null;
  fieldDefinition: FieldDefinition<FieldRelationMetadata>;
};

export const RelationPicker = ({
  selectedRecordId,
  onSubmit,
  onCancel,
  excludedRecordIds,
  width,
  initialSearchFilter,
  fieldDefinition,
}: RelationPickerProps) => {
  const recordPickerInstanceId = RelationPickerHotkeyScope.RelationPicker;

  const handleRecordSelected = (
    selectedRecord: SingleRecordPickerRecord | null | undefined,
  ) => onSubmit(selectedRecord ?? null);

  const { objectMetadataItem: relationObjectMetadataItem } =
    useObjectMetadataItem({
      objectNameSingular:
        fieldDefinition.metadata.relationObjectMetadataNameSingular,
    });

  const relationFieldMetadataItem = relationObjectMetadataItem.fields.find(
    ({ id }) => id === fieldDefinition.metadata.relationFieldMetadataId,
  );

  const { recordId } = useContext(FieldContext);

  const { createNewRecordAndOpenRightDrawer } =
    useAddNewRecordAndOpenRightDrawer({
      relationObjectMetadataNameSingular:
        fieldDefinition.metadata.relationObjectMetadataNameSingular,
      relationObjectMetadataItem,
      relationFieldMetadataItem,
      recordId,
    });

  return (
    <>
      <SearchPickerInitialValueEffect
        initialValueForSearchFilter={initialSearchFilter}
        recordPickerInstanceId={recordPickerInstanceId}
      />
      <SingleRecordPicker
        EmptyIcon={IconForbid}
        emptyLabel={'No ' + fieldDefinition.label}
        onCancel={onCancel}
        onCreate={createNewRecordAndOpenRightDrawer}
        onRecordSelected={handleRecordSelected}
        width={width}
        objectNameSingular={
          fieldDefinition.metadata.relationObjectMetadataNameSingular
        }
        recordPickerInstanceId={recordPickerInstanceId}
        selectedRecordIds={selectedRecordId ? [selectedRecordId] : []}
        excludedRecordIds={excludedRecordIds}
      />
    </>
  );
};
