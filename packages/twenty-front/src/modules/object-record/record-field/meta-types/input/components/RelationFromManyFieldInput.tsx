import { useContext } from 'react';

import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import { useAddNewRecordAndOpenRightDrawer } from '@/object-record/record-field/meta-types/input/hooks/useAddNewRecordAndOpenRightDrawer';
import { useUpdateRelationFromManyFieldInput } from '@/object-record/record-field/meta-types/input/hooks/useUpdateRelationFromManyFieldInput';
import { FieldDefinition } from '@/object-record/record-field/types/FieldDefinition';
import { FieldInputEvent } from '@/object-record/record-field/types/FieldInputEvent';
import { FieldRelationMetadata } from '@/object-record/record-field/types/FieldMetadata';
import { MultipleRecordPicker } from '@/object-record/record-picker/multiple-record-picker/components/MultipleRecordPicker';

type RelationFromManyFieldInputProps = {
  onSubmit?: FieldInputEvent;
};

export const RelationFromManyFieldInput = ({
  onSubmit,
}: RelationFromManyFieldInputProps) => {
  const { fieldDefinition, recordId } = useContext(FieldContext);
  const recordPickerInstanceId = `relation-from-many-field-input-${recordId}`;

  const { updateRelation } = useUpdateRelationFromManyFieldInput({
    scopeId: recordPickerInstanceId,
  });

  const handleSubmit = () => {
    onSubmit?.(() => {});
  };

  const relationFieldDefinition =
    fieldDefinition as FieldDefinition<FieldRelationMetadata>;

  const { objectMetadataItem: relationObjectMetadataItem } =
    useObjectMetadataItem({
      objectNameSingular:
        relationFieldDefinition.metadata.relationObjectMetadataNameSingular,
    });

  const relationFieldMetadataItem = relationObjectMetadataItem.fields.find(
    ({ id }) => id === relationFieldDefinition.metadata.relationFieldMetadataId,
  );

  const { createNewRecordAndOpenRightDrawer } =
    useAddNewRecordAndOpenRightDrawer({
      relationObjectMetadataNameSingular:
        relationFieldDefinition.metadata.relationObjectMetadataNameSingular,
      relationObjectMetadataItem,
      relationFieldMetadataItem,
      recordId,
    });

  return (
    <MultipleRecordPicker
      componentInstanceId={recordPickerInstanceId}
      onSubmit={handleSubmit}
      onChange={updateRelation}
      onCreate={createNewRecordAndOpenRightDrawer}
      onClickOutside={handleSubmit}
    />
  );
};
