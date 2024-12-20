import { ObjectMetadataSeed } from 'src/engine/seeder/interfaces/object-metadata-seed';

import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';

export const DEMO_OBJECTS_METADATA_SEEDS: ObjectMetadataSeed = {
  labelPlural: 'DemoObjects',
  labelSingular: 'DemoObject',
  namePlural: 'demo-objects',
  nameSingular: 'demo-object',
  icon: 'IconSquareAsterisk',
  fields: [
    {
      type: FieldMetadataType.TEXT,
      label: 'Name (Text)',
      name: 'exampleText',
    },
    {
      type: FieldMetadataType.SELECT,
      label: 'Species (Select)',
      name: 'exampleSelect',
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
      type: FieldMetadataType.PHONES,
      label: 'Phone Numbers',
      name: 'examplePhoneNumbers',
    },
    {
      type: FieldMetadataType.EMAILS,
      label: 'Email Addresses',
      name: 'exampleEmailAddresses',
    },
    {
      type: FieldMetadataType.DATE_TIME,
      label: 'Date and Time',
      name: 'exampleDateTime',
    },
    {
      type: FieldMetadataType.DATE,
      label: 'Date',
      name: 'exampleDate',
    },
    {
      type: FieldMetadataType.BOOLEAN,
      label: 'Boolean',
      name: 'exampleBoolean',
    },
    {
      type: FieldMetadataType.NUMBER,
      label: 'Number',
      name: 'exampleNumber',
    },
    {
      type: FieldMetadataType.NUMERIC,
      label: 'Numeric',
      name: 'exampleNumeric',
    },
    {
      type: FieldMetadataType.LINKS,
      label: 'Links',
      name: 'exampleLinks',
    },
    {
      type: FieldMetadataType.CURRENCY,
      label: 'Currency',
      name: 'exampleCurrency',
    },
    {
      type: FieldMetadataType.FULL_NAME,
      label: 'Full Name',
      name: 'exampleFullName',
    },
    {
      type: FieldMetadataType.RATING,
      label: 'Rating',
      name: 'exampleRating',
    },
    {
      type: FieldMetadataType.MULTI_SELECT,
      label: 'Multi Select',
      name: 'exampleMultiSelect',
      options: [
        { label: 'Option 1', value: 'option1', position: 0, color: 'blue' },
        { label: 'Option 2', value: 'option2', position: 1, color: 'red' },
        { label: 'Option 3', value: 'option3', position: 2, color: 'green' },
      ],
    },
    // TODO: add example relation with pets
    {
      type: FieldMetadataType.ADDRESS,
      label: 'Address',
      name: 'exampleAddress',
    },
    {
      type: FieldMetadataType.RAW_JSON,
      label: 'Raw JSON',
      name: 'exampleRawJson',
    },
    {
      type: FieldMetadataType.RICH_TEXT,
      label: 'Rich Text',
      name: 'exampleRichText',
    },
    {
      type: FieldMetadataType.ACTOR,
      label: 'Actor',
      name: 'exampleActor',
    },
    {
      type: FieldMetadataType.ARRAY,
      label: 'Array',
      name: 'exampleArray',
    },
  ],
};
