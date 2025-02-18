import { ObjectMetadataStandardIdToIdMap } from 'src/engine/metadata-modules/object-metadata/interfaces/object-metadata-standard-id-to-id-map';

import {
  BASE_OBJECT_STANDARD_FIELD_IDS,
  TASK_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

export const tasksAssignedToMeView = (
  objectMetadataStandardIdToIdMap: ObjectMetadataStandardIdToIdMap,
) => {
  return {
    name: 'Assigned to Me',
    objectMetadataId:
      objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].id,
    type: 'table',
    key: null,
    position: 2,
    icon: 'IconUserCircle',
    kanbanFieldMetadataId: '',
    filters: [
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.assignee
          ],
        displayValue: 'Me',
        operand: 'is',
        value: JSON.stringify({
          isCurrentWorkspaceMemberSelected: true,
          selectedRecordIds: [],
        }),
      },
    ],
    fields: [
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.title
          ],
        position: 0,
        isVisible: true,
        size: 210,
      },
      /*{
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.status
          ],
        position: 2,
        isVisible: true,
        size: 150,
      },*/
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.taskTargets
          ],
        position: 3,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.createdBy
          ],
        position: 4,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.dueAt
          ],
        position: 5,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.assignee
          ],
        position: 6,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.body
          ],
        position: 7,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            BASE_OBJECT_STANDARD_FIELD_IDS.createdAt
          ],
        position: 8,
        isVisible: true,
        size: 150,
      },
    ],
    groups: [
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.status
          ],
        isVisible: true,
        fieldValue: 'TODO',
        position: 0,
      },
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.status
          ],
        isVisible: true,
        fieldValue: 'IN_PROGRESS',
        position: 1,
      },
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.status
          ],
        isVisible: true,
        fieldValue: 'DONE',
        position: 2,
      },
      {
        fieldMetadataId:
          objectMetadataStandardIdToIdMap[STANDARD_OBJECT_IDS.task].fields[
            TASK_STANDARD_FIELD_IDS.status
          ],
        isVisible: true,
        fieldValue: '',
        position: 3,
      },
    ],
  };
};
