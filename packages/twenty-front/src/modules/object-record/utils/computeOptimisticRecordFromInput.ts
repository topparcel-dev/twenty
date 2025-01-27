import { isString } from '@sniptt/guards';

import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { RelationDefinitionType } from '~/generated-metadata/graphql';
import { FieldMetadataType } from '~/generated/graphql';
import { isDefined } from '~/utils/isDefined';
import { getUrlHostName } from '~/utils/url/getUrlHostName';

export const computeOptimisticRecordFromInput = ({
  objectMetadataItem,
  recordInput,
}: {
  objectMetadataItem: ObjectMetadataItem;
  recordInput: Partial<ObjectRecord>;
}) => {
  const filteredResultRecord = Object.fromEntries(
    Object.entries(recordInput).flatMap<[string, unknown] | []>(
      ([fieldName, fieldValue]) => {
        const fieldMetadataItem = objectMetadataItem.fields.find(
          (field) => field.name === fieldName,
        );

        if (!fieldMetadataItem) return [];

        if (!fieldMetadataItem.isNullable && fieldValue == null) {
          return [];
        }

        if (
          fieldMetadataItem.type === FieldMetadataType.RELATION &&
          fieldMetadataItem.relationDefinition?.direction ===
            RelationDefinitionType.MANY_TO_ONE
        ) {
          const relationIdFieldName = `${fieldMetadataItem.name}Id`;
          const relationIdFieldMetadataItem = objectMetadataItem.fields.find(
            (field) => field.name === relationIdFieldName,
          );

          return relationIdFieldMetadataItem
            ? [
                [relationIdFieldName, fieldValue?.id ?? null],
                [fieldName, fieldValue],
              ]
            : [];
        }

        if (
          fieldMetadataItem.type === FieldMetadataType.RELATION &&
          fieldMetadataItem.relationDefinition?.direction ===
            RelationDefinitionType.ONE_TO_MANY
        ) {
          return [];
        }

        // Todo: we should check that the fieldValue is a valid value
        // (e.g. a string for a string field, following the right composite structure for composite fields)
        return [[fieldName, fieldValue]];
      },
    ),
  );
  if (
    !(
      isDefined(filteredResultRecord.domainName) &&
      isString(filteredResultRecord.domainName)
    )
  )
    return filteredResultRecord;
  return {
    ...filteredResultRecord,
    domainName: getUrlHostName(filteredResultRecord.domainName as string),
  };
};
