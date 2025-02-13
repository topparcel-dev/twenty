import { FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { isFieldValueEmpty } from '@/object-record/record-field/utils/isFieldValueEmpty';
import { generateDefaultFieldValue } from '@/object-record/utils/generateDefaultFieldValue';
import { getSettingsFieldTypeConfig } from '@/settings/data-model/utils/getSettingsFieldTypeConfig';
import { isFieldTypeSupportedInSettings } from '@/settings/data-model/utils/isFieldTypeSupportedInSettings';
import { isDefined } from 'twenty-shared';

type getFieldPreviewValueArgs = {
  fieldMetadataItem: Pick<FieldMetadataItem, 'type' | 'defaultValue'>;
};
export const getFieldPreviewValue = ({
  fieldMetadataItem,
}: getFieldPreviewValueArgs) => {
  if (!isFieldTypeSupportedInSettings(fieldMetadataItem.type)) return null;

  if (
    !isFieldValueEmpty({
      fieldDefinition: { type: fieldMetadataItem.type },
      fieldValue: fieldMetadataItem.defaultValue,
    })
  ) {
    return generateDefaultFieldValue({
      fieldMetadataItem,
    });
  }

  const fieldTypeConfig = getSettingsFieldTypeConfig(fieldMetadataItem.type);

  if (
    isDefined(fieldTypeConfig) &&
    'exampleValue' in fieldTypeConfig &&
    isDefined(fieldTypeConfig.exampleValue)
  ) {
    return fieldTypeConfig.exampleValue;
  }

  return null;
};
