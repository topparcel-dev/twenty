import { Favorite } from '@/favorites/types/Favorite';
import { FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { ObjectRecordIdentifier } from '@/object-record/types/ObjectRecordIdentifier';
import { View } from '@/views/types/View';
import { isDefined } from 'twenty-ui';
import { getObjectMetadataLabelPluralFromViewId } from './getObjectMetadataLabelPluralFromViewId';

export type ProcessedFavorite = Favorite & {
  Icon?: string;
  objectNameSingular?: string;
};

export const sortFavorites = (
  favorites: Favorite[],
  favoriteRelationFieldMetadataItems: FieldMetadataItem[],
  getObjectRecordIdentifierByNameSingular: (
    record: ObjectRecord,
    objectNameSingular: string,
  ) => ObjectRecordIdentifier,
  hasLinkToShowPage: boolean,
  views: View[],
  objectMetadataItems: ObjectMetadataItem[],
) => {
  return favorites
    .map((favorite) => {
      if (isDefined(favorite.viewId) && isDefined(favorite.workspaceMemberId)) {
        const { labelPlural, view } = getObjectMetadataLabelPluralFromViewId(
          views,
          objectMetadataItems,
          favorite.viewId,
        );

        return {
          __typename: 'Favorite',
          id: favorite.id,
          recordId: view?.id,
          position: favorite.position,
          avatarType: 'icon',
          avatarUrl: '',
          labelIdentifier: view?.name,
          link: `/objects/${labelPlural.toLocaleLowerCase()}${favorite.viewId ? `?view=${favorite.viewId}` : ''}`,
          workspaceMemberId: favorite.workspaceMemberId,
          favoriteFolderId: favorite.favoriteFolderId,
          objectNameSingular: 'view',
          Icon: view?.icon,
        } as ProcessedFavorite;
      }

      for (const relationField of favoriteRelationFieldMetadataItems) {
        if (isDefined(favorite[relationField.name])) {
          const relationObject = favorite[relationField.name];

          const relationObjectNameSingular =
            relationField.relationDefinition?.targetObjectMetadata
              .nameSingular ?? '';

          const objectRecordIdentifier =
            getObjectRecordIdentifierByNameSingular(
              relationObject,
              relationObjectNameSingular,
            );

          return {
            __typename: 'Favorite',
            id: favorite.id,
            recordId: objectRecordIdentifier.id,
            position: favorite.position,
            avatarType: objectRecordIdentifier.avatarType,
            avatarUrl: objectRecordIdentifier.avatarUrl,
            labelIdentifier: objectRecordIdentifier.name,
            link: hasLinkToShowPage
              ? objectRecordIdentifier.linkToShowPage
              : '',
            workspaceMemberId: favorite.workspaceMemberId,
            favoriteFolderId: favorite.favoriteFolderId,
            objectNameSingular: relationObjectNameSingular,
          } as ProcessedFavorite;
        }
      }
      return {
        ...favorite,
      } as ProcessedFavorite;
    })
    .sort((a, b) => a.position - b.position);
};
