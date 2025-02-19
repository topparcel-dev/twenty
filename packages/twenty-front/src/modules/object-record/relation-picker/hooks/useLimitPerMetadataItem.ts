import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { DEFAULT_SEARCH_REQUEST_LIMIT } from '@/object-record/constants/DefaultSearchRequestLimit';
import { capitalize, isDefined } from 'twenty-shared';

export const useLimitPerMetadataItem = ({
  objectMetadataItems,
  limit = DEFAULT_SEARCH_REQUEST_LIMIT,
}: {
  objectMetadataItems: ObjectMetadataItem[];
  limit?: number;
}) => {
  const limitPerMetadataItem = Object.fromEntries(
    objectMetadataItems
      .map(({ nameSingular }) => {
        return [`limit${capitalize(nameSingular)}`, limit];
      })
      .filter(isDefined),
  );

  return {
    limitPerMetadataItem,
  };
};
