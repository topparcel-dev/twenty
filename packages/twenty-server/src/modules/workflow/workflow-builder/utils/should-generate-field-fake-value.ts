import {
  FieldMetadataEntity,
  FieldMetadataType,
} from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';

export const shouldGenerateFieldFakeValue = (field: FieldMetadataEntity) => {
  return (
    !field.isSystem &&
    field.isActive &&
    field.type !== FieldMetadataType.RELATION
  );
};
