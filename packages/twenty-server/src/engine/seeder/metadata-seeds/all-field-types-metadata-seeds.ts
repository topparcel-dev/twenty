import { ObjectMetadataSeed } from 'src/engine/seeder/interfaces/object-metadata-seed';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';

export const ALL_FIELD_TYPES_METADATA_SEEDS: ObjectMetadataSeed = {
  labelPlural: 'AllFieldTypeObjects',
  labelSingular: 'AllFieldTypeObject',
  namePlural: 'all-field-type-objects',
  nameSingular: 'all-field-type-object',
  icon: 'IconSquareAsterisk',
  fields: [
    {
      type: FieldMetadataType.SELECT,
      label: 'Species (Select)',
      name: 'species',
      options: [
        { label: 'Dog', value: 'dog', position: 0, color: 'blue' },
        { label: 'Cat', value: 'cat', position: 1, color: 'red' },
        { label: 'Bird', value: 'bird', position: 2, color: 'green' },
        { label: 'Fish', value: 'fish', position: 3, color: 'yellow' },
        { label: 'Rabbit', value: 'rabbit', position: 4, color: 'purple' },
        { label: 'Hamster', value: 'hamster', position: 5, color: 'orange' },
      ],
    },
    {
      type: FieldMetadataType.TEXT,
      label: 'Comments (Text)',
      name: 'comments',
    },
    {
      type: FieldMetadataType.PHONES,
      label: 'Phone Numbers',
      name: 'phoneNumbers',
    },
    {
      type: FieldMetadataType.EMAILS,
      label: 'Email Addresses',
      name: 'emailAddresses',
    },
    {
      type: FieldMetadataType.DATE_TIME,
      label: 'Date and Time',
      name: 'dateTime',
    },
    {
      type: FieldMetadataType.DATE,
      label: 'Date',
      name: 'date',
    },
    {
      type: FieldMetadataType.BOOLEAN,
      label: 'Boolean',
      name: 'booleanField',
    },
    {
      type: FieldMetadataType.NUMBER,
      label: 'Number',
      name: 'numberField',
    },
    {
      type: FieldMetadataType.NUMERIC,
      label: 'Numeric',
      name: 'numericField',
    },
    {
      type: FieldMetadataType.LINKS,
      label: 'Links',
      name: 'links',
    },
    {
      type: FieldMetadataType.CURRENCY,
      label: 'Currency',
      name: 'currency',
    },
    {
      type: FieldMetadataType.FULL_NAME,
      label: 'Full Name',
      name: 'fullName',
    },
    {
      type: FieldMetadataType.RATING,
      label: 'Rating',
      name: 'rating',
    },
    {
      type: FieldMetadataType.MULTI_SELECT,
      label: 'Multi Select',
      name: 'multiSelect',
      options: [
        { label: 'Option 1', value: 'option1', position: 0, color: 'blue' },
        { label: 'Option 2', value: 'option2', position: 1, color: 'red' },
      ],
    },
    {
      type: FieldMetadataType.RELATION,
      label: 'Relation',
      name: 'relation',
    },
    {
      type: FieldMetadataType.ADDRESS,
      label: 'Address',
      name: 'address',
    },
    {
      type: FieldMetadataType.RAW_JSON,
      label: 'Raw JSON',
      name: 'rawJson',
    },
    {
      type: FieldMetadataType.RICH_TEXT,
      label: 'Rich Text',
      name: 'richText',
    },
    {
      type: FieldMetadataType.ACTOR,
      label: 'Actor',
      name: 'actor',
    },
    {
      type: FieldMetadataType.ARRAY,
      label: 'Array',
      name: 'arrayField',
    },
  ],
};
