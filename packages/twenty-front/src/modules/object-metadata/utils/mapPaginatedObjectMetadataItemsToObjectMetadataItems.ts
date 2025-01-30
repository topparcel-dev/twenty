import { objectMetadataItemSchema } from '@/object-metadata/validation-schemas/objectMetadataItemSchema';
import { ObjectMetadataItemsQuery } from '~/generated-metadata/graphql';
import { ObjectMetadataItem } from '../types/ObjectMetadataItem';

export const mapPaginatedObjectMetadataItemsToObjectMetadataItems = ({
  pagedObjectMetadataItems,
}: {
  pagedObjectMetadataItems: ObjectMetadataItemsQuery | undefined;
}) => {
  const formattedObjects: ObjectMetadataItem[] =
    pagedObjectMetadataItems?.objects.edges.map((object) => {
      const labelIdentifierFieldMetadataId =
        objectMetadataItemSchema.shape.labelIdentifierFieldMetadataId.parse(
          object.node.labelIdentifierFieldMetadataId,
        );

      return {
        ...object.node,
        fields: object.node.fields.edges.map((field) => field.node),
        labelIdentifierFieldMetadataId,
        indexMetadatas: object.node.indexMetadatas?.edges.map((index) => ({
          ...index.node,
          indexFieldMetadatas: index.node.indexFieldMetadatas?.edges.map(
            (indexField) => indexField.node,
          ),
        })),
      };
    }) ?? [];

  return formattedObjects;
};
