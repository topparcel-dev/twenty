import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import {
  BASE_OBJECT_STANDARD_FIELD_IDS,
  WORKFLOW_VERSION_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

export const workflowVersionsAllView = (
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  return {
    name: 'All Workflow Versions',
    objectMetadataId: objectMetadataMap[STANDARD_OBJECT_IDS.workflowVersion].id,
    type: 'table',
    key: 'INDEX',
    position: 0,
    icon: 'IconVersions',
    kanbanFieldMetadataId: '',
    filters: [],
    fields: [
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.workflowVersion].fields[
            WORKFLOW_VERSION_STANDARD_FIELD_IDS.name
          ],
        position: 0,
        isVisible: true,
        size: 210,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.workflowVersion].fields[
            WORKFLOW_VERSION_STANDARD_FIELD_IDS.workflow
          ],
        position: 1,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.workflowVersion].fields[
            WORKFLOW_VERSION_STANDARD_FIELD_IDS.status
          ],
        position: 2,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.workflowVersion].fields[
            BASE_OBJECT_STANDARD_FIELD_IDS.updatedAt
          ],
        position: 3,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataMap[STANDARD_OBJECT_IDS.workflowVersion].fields[
            WORKFLOW_VERSION_STANDARD_FIELD_IDS.runs
          ],
        position: 4,
        isVisible: true,
        size: 150,
      },
    ],
  };
};
