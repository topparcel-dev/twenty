import { useRecoilValue } from 'recoil';

import { ActivityTargetWithTargetRecord } from '@/activities/types/ActivityTargetObject';
import { Note } from '@/activities/types/Note';
import { NoteTarget } from '@/activities/types/NoteTarget';
import { Task } from '@/activities/types/Task';
import { TaskTarget } from '@/activities/types/TaskTarget';
import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useCombinedFindManyRecords } from '@/object-record/multiple-objects/hooks/useCombinedFindManyRecords';
import { isDefined } from '~/utils/isDefined';

export const useActivityTargetObjectRecords = (
  activity?: Task | Note,
  activityTargets?: NoteTarget[] | TaskTarget[],
) => {
  const objectMetadataItems = useRecoilValue(objectMetadataItemsState);

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

  console.log({
    targets,
  });

  const activityTargetObjectRecords = targets
    .map((activityTarget) => {
      if (!isDefined(activityTarget)) {
        throw new Error(`Cannot find activity target`);
      }

      console.log({
        activityTarget,
        nameSingular: activityTarget.nameSingular,
      });

      const correspondingObjectMetadataItem = objectMetadataItems.find(
        (objectMetadataItem) =>
          isDefined(activityTarget[`${objectMetadataItem.nameSingular}Id`]) &&
          ![CoreObjectNameSingular.Note, CoreObjectNameSingular.Task].includes(
            objectMetadataItem.nameSingular as CoreObjectNameSingular,
          ),
      );

      console.log({
        objectMetadataItems,
        correspondingObjectMetadataItem,
      });

      if (!correspondingObjectMetadataItem) {
        return undefined;
      }

      const targetObjectRecordId =
        activityTarget[`${correspondingObjectMetadataItem.nameSingular}Id`];

      console.log({
        targetObjectRecordId,
      });

      if (!targetObjectRecordId) {
        throw new Error(
          `Cannot find target object record of type ${correspondingObjectMetadataItem.nameSingular}, make sure the request for activities eagerly loads for the target objects on activity target relation.`,
        );
      }

      return {
        activityTarget,
        targetObjectRecordId: targetObjectRecordId ?? undefined,
        targetObjectMetadataItem: correspondingObjectMetadataItem,
      };
    })
    .filter(isDefined);

  const objectMetadataItemNames = Array.from(
    new Set(
      activityTargetObjectRecords.map(
        (activityTargetObjectRecord) =>
          activityTargetObjectRecord.targetObjectMetadataItem.nameSingular,
      ),
    ),
  );

  const operationSignatures = objectMetadataItemNames.map(
    (objectMetadataItemNameSingular) => ({
      objectNameSingular: objectMetadataItemNameSingular,
      variables: {
        filter: {
          id: {
            in: activityTargetObjectRecords
              .filter(
                (activityTargetObjectRecord) =>
                  activityTargetObjectRecord.targetObjectMetadataItem
                    .nameSingular === objectMetadataItemNameSingular,
              )
              .map(
                (activityTargetObjectRecord) =>
                  activityTargetObjectRecord.targetObjectRecordId,
              ),
          },
        },
      },
    }),
  );

  console.log({
    operationSignatures,
  });

  const { result: targetObjectRecords } = useCombinedFindManyRecords({
    operationSignatures,
  });

  console.log({
    activityTargetObjectRecords,
    targetObjectRecords,
  });

  const resultToReturn: ActivityTargetWithTargetRecord[] =
    activityTargetObjectRecords.map((activityTargetObjectRecord) => ({
      activityTarget: activityTargetObjectRecord.activityTarget,
      targetObject: targetObjectRecords[
        activityTargetObjectRecord.targetObjectMetadataItem.nameSingular
      ]?.find(
        (targetObjectRecord) =>
          targetObjectRecord.id ===
          activityTargetObjectRecord.targetObjectRecordId,
      ) ?? { id: 'sad' },
      targetObjectMetadataItem:
        activityTargetObjectRecord.targetObjectMetadataItem,
    }));

  return {
    activityTargetObjectRecords: resultToReturn,
  };
};
