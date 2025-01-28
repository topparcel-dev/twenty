import { useRecoilValue } from 'recoil';
import { Nullable } from 'twenty-ui';

import { ActivityTargetWithTargetRecord } from '@/activities/types/ActivityTargetObject';
import { Task } from '@/activities/types/Task';
import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';

import { Note } from '@/activities/types/Note';
import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from '~/utils/isDefined';

export const useTargetObjectRecordsForActivity = (
  activityId: string,
  activityObjectNameSingular: CoreObjectNameSingular,
) => {
  const objectMetadataItems = useRecoilValue(objectMetadataItemsState);

  const { record: activity } = useFindOneRecord<Note | Task>({
    objectNameSingular: activityObjectNameSingular,
    objectRecordId: activityId,
    skip: !isNonEmptyString(activityId),
  });

  if (!isDefined(activity) && !isDefined(activityTargets)) {
    return { activityTargetObjectRecords: [] };
  }

  console.log({
    activity,
    activityTargets,
  });

  const targets = activityTargets
    ? activityTargets
    : activity && 'noteTargets' in activity && activity.noteTargets
      ? activity.noteTargets
      : activity && 'taskTargets' in activity && activity.taskTargets
        ? activity.taskTargets
        : [];

  const activityTargetObjectRecords = targets
    .map<Nullable<ActivityTargetWithTargetRecord>>((activityTarget) => {
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

      const targetObjectRecord =
        activityTarget[correspondingObjectMetadataItem.nameSingular];

      if (!targetObjectRecord) {
        throw new Error(
          `Cannot find target object record of type ${correspondingObjectMetadataItem.nameSingular}, make sure the request for activities eagerly loads for the target objects on activity target relation.`,
        );
      }

      return {
        activityTarget,
        targetObject: targetObjectRecord ?? undefined,
        targetObjectMetadataItem: correspondingObjectMetadataItem,
      };
    })
    .filter(isDefined);

  return {
    activityTargetObjectRecords,
  };
};
