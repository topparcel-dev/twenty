import { Entity } from '@microsoft/microsoft-graph-types';
import { getLogoUrlFromDomainName } from 'twenty-shared';
import { Brackets } from 'typeorm';

import { ObjectRecord } from 'src/engine/api/graphql/workspace-query-builder/interfaces/object-record.interface';

import { RESULTS_LIMIT_BY_OBJECT_WITHOUT_SEARCH_TERMS } from 'src/engine/core-modules/global-search/constants/results-limit-by-object-without-search-terms';
import { STANDARD_OBJECTS_BY_PRIORITY_RANK } from 'src/engine/core-modules/global-search/constants/standard-objects-by-priority-rank';
import { GlobalSearchRecordDTO } from 'src/engine/core-modules/global-search/dtos/global-search-record-dto';
import {
  GlobalSearchException,
  GlobalSearchExceptionCode,
} from 'src/engine/core-modules/global-search/exceptions/global-search.exception';
import { RecordsWithObjectMetadataItem } from 'src/engine/core-modules/global-search/types/records-with-object-metadata-item';
import { SEARCH_VECTOR_FIELD } from 'src/engine/metadata-modules/constants/search-vector-field.constants';
import { ObjectMetadataItemWithFieldMaps } from 'src/engine/metadata-modules/types/object-metadata-item-with-field-maps';
import { WorkspaceRepository } from 'src/engine/twenty-orm/repository/workspace.repository';

export class GlobalSearchService {
  filterObjectMetadataItems(
    objectMetadataItemWithFieldMaps: ObjectMetadataItemWithFieldMaps[],
    excludedObjectNameSingulars: string[] | undefined,
  ) {
    return objectMetadataItemWithFieldMaps.filter(
      ({ nameSingular, isSearchable }) => {
        return (
          !excludedObjectNameSingulars?.includes(nameSingular) && isSearchable
        );
      },
    );
  }

  async buildSearchQueryAndGetRecords(
    entityManager: WorkspaceRepository<Entity>,
    objectMetadataItem: ObjectMetadataItemWithFieldMaps,
    searchTerms: string,
    searchTermsOr: string,
    limit: number,
  ) {
    const queryBuilder = entityManager.createQueryBuilder();
    const imageIdentifierField =
      this.getImageIdentifierColumn(objectMetadataItem);

    const fieldsToSelect = [
      'id',
      ...this.getLabelIdentifierColumns(objectMetadataItem),
      ...(imageIdentifierField ? [imageIdentifierField] : []),
    ].map((field) => `"${field}"`);

    const searchQuery = searchTerms
      ? queryBuilder
          .select(fieldsToSelect)
          .addSelect(
            `ts_rank_cd("${SEARCH_VECTOR_FIELD.name}", to_tsquery(:searchTerms))`,
            'tsRankCD',
          )
          .addSelect(
            `ts_rank("${SEARCH_VECTOR_FIELD.name}", to_tsquery(:searchTerms))`,
            'tsRank',
          )
          .andWhere(
            new Brackets((qb) => {
              qb.where(
                `"${SEARCH_VECTOR_FIELD.name}" @@ to_tsquery('simple', :searchTerms)`,
                { searchTerms },
              ).orWhere(
                `"${SEARCH_VECTOR_FIELD.name}" @@ to_tsquery('simple', :searchTermsOr)`,
                { searchTermsOr },
              );
            }),
          )
          .orderBy(
            `ts_rank_cd("${SEARCH_VECTOR_FIELD.name}", to_tsquery(:searchTerms))`,
            'DESC',
          )
          .addOrderBy(
            `ts_rank("${SEARCH_VECTOR_FIELD.name}", to_tsquery(:searchTermsOr))`,
            'DESC',
          )
          .setParameter('searchTerms', searchTerms)
          .setParameter('searchTermsOr', searchTermsOr)
          .take(limit)
      : queryBuilder
          .select(fieldsToSelect)
          .addSelect('0', 'tsRankCD')
          .addSelect('0', 'tsRank')
          .andWhere(
            new Brackets((qb) => {
              qb.where(`"${SEARCH_VECTOR_FIELD.name}" IS NOT NULL`);
            }),
          )
          .take(RESULTS_LIMIT_BY_OBJECT_WITHOUT_SEARCH_TERMS);

    return await searchQuery.getRawMany();
  }

  getLabelIdentifierColumns(
    objectMetadataItem: ObjectMetadataItemWithFieldMaps,
  ) {
    if (!objectMetadataItem.labelIdentifierFieldMetadataId) {
      throw new GlobalSearchException(
        'Label identifier field not found',
        GlobalSearchExceptionCode.LABEL_IDENTIFIER_FIELD_NOT_FOUND,
      );
    }

    const labelIdentifierField =
      objectMetadataItem.fieldsById[
        objectMetadataItem.labelIdentifierFieldMetadataId
      ];

    if (objectMetadataItem.nameSingular === 'person') {
      return [
        `${labelIdentifierField.name}FirstName`,
        `${labelIdentifierField.name}LastName`,
      ];
    }

    return [
      objectMetadataItem.fieldsById[
        objectMetadataItem.labelIdentifierFieldMetadataId
      ].name,
    ];
  }

  getLabelIdentifierValue(
    record: ObjectRecord,
    objectMetadataItem: ObjectMetadataItemWithFieldMaps,
  ): string {
    const labelIdentifierFields =
      this.getLabelIdentifierColumns(objectMetadataItem);

    return labelIdentifierFields.map((field) => record[field]).join(' ');
  }

  getImageIdentifierColumn(
    objectMetadataItem: ObjectMetadataItemWithFieldMaps,
  ) {
    if (objectMetadataItem.nameSingular === 'company') {
      return 'domainNamePrimaryLinkUrl';
    }

    if (!objectMetadataItem.imageIdentifierFieldMetadataId) {
      return null;
    }

    return objectMetadataItem.fieldsById[
      objectMetadataItem.imageIdentifierFieldMetadataId
    ].name;
  }

  getImageIdentifierValue(
    record: ObjectRecord,
    objectMetadataItem: ObjectMetadataItemWithFieldMaps,
  ): string {
    const imageIdentifierField =
      this.getImageIdentifierColumn(objectMetadataItem);

    if (objectMetadataItem.nameSingular === 'company') {
      return getLogoUrlFromDomainName(record.domainNamePrimaryLinkUrl) || '';
    }

    return imageIdentifierField ? record[imageIdentifierField] : '';
  }

  computeSearchObjectResults(
    recordsWithObjectMetadataItems: RecordsWithObjectMetadataItem[],
    limit: number,
  ) {
    const searchRecords = recordsWithObjectMetadataItems.flatMap(
      ({ objectMetadataItem, records }) => {
        return records.map((record) => {
          return {
            recordId: record.id,
            objectSingularName: objectMetadataItem.nameSingular,
            label: this.getLabelIdentifierValue(record, objectMetadataItem),
            imageUrl: this.getImageIdentifierValue(record, objectMetadataItem),
            tsRankCD: record.tsRankCD,
            tsRank: record.tsRank,
          };
        });
      },
    );

    return this.sortSearchObjectResults(searchRecords).slice(0, limit);
  }

  sortSearchObjectResults(
    searchObjectResultsWithRank: GlobalSearchRecordDTO[],
  ) {
    return searchObjectResultsWithRank.sort((a, b) => {
      if (a.tsRankCD !== b.tsRankCD) {
        return b.tsRankCD - a.tsRankCD;
      }

      if (a.tsRank !== b.tsRank) {
        return b.tsRank - a.tsRank;
      }

      return (
        (STANDARD_OBJECTS_BY_PRIORITY_RANK[b.objectSingularName] || 0) -
        (STANDARD_OBJECTS_BY_PRIORITY_RANK[a.objectSingularName] || 0)
      );
    });
  }
}
