import { useRecoilValue } from 'recoil';

import { ActivityTargetWithTargetRecord } from '@/activities/types/ActivityTargetObject';
import { Note } from '@/activities/types/Note';
import { NoteTarget } from '@/activities/types/NoteTarget';
import { Task } from '@/activities/types/Task';
import { TaskTarget } from '@/activities/types/TaskTarget';
import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { isDefined } from 'twenty-shared/utils';

export const useActivityTargetObjectRecords = (
  activityRecordId?: string,
  activityTargets?: NoteTarget[] | TaskTarget[],
) => {
  const objectMetadataItems = useRecoilValue(objectMetadataItemsState);

  const activity = useRecoilValue(
    recordStoreFamilyState(activityRecordId ?? ''),
  ) as Note | Task | null;

  if (!isDefined(activity) && !isDefined(activityTargets)) {
    return { activityTargetObjectRecords: [] };
  }

  const targets = activityTargets
    ? activityTargets
    : activity && 'noteTargets' in activity && activity.noteTargets
      ? activity.noteTargets
      : activity && 'taskTargets' in activity && activity.taskTargets
        ? activity.taskTargets
        : [];

  const activityTargetObjectRecords = targets
    .map<ActivityTargetWithTargetRecord | undefined>((activityTarget) => {
      if (!isDefined(activityTarget)) {
        throw new Error(`Cannot find activity target`);
      }

      const correspondingObjectMetadataItem = objectMetadataItems.find(
        (objectMetadataItem) =>
          isDefined(activityTarget[objectMetadataItem.nameSingular]) &&
          ![CoreObjectNameSingular.Note, CoreObjectNameSingular.Task].includes(
            objectMetadataItem.nameSingular as CoreObjectNameSingular,
          ),
      );

      if (!correspondingObjectMetadataItem) {
        return undefined;
      }

      const targetObjectRecord = activityTarget[
        correspondingObjectMetadataItem.nameSingular
      ] as ObjectRecord | undefined;

      if (!isDefined(targetObjectRecord)) {
        throw new Error(
          `Cannot find target object record of type ${correspondingObjectMetadataItem.nameSingular}, make sure the request for activities eagerly loads for the target objects on activity target relation.`,
        );
      }

      return {
        activityTarget,
        targetObject: targetObjectRecord,
        targetObjectMetadataItem: correspondingObjectMetadataItem,
      };
    })
    .filter(isDefined);

  return {
    activityTargetObjectRecords,
  };
};
