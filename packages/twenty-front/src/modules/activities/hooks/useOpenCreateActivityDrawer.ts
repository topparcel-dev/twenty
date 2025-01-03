import { useSetRecoilState } from 'recoil';

import { activityTargetableEntityArrayState } from '@/activities/states/activityTargetableEntityArrayState';
import { isUpsertingActivityInDBState } from '@/activities/states/isCreatingActivityInDBState';
import { viewableRecordIdState } from '@/command-menu/states/viewableRecordIdState';
import { useRightDrawer } from '@/ui/layout/right-drawer/hooks/useRightDrawer';
import { RightDrawerHotkeyScope } from '@/ui/layout/right-drawer/types/RightDrawerHotkeyScope';
import { RightDrawerPages } from '@/ui/layout/right-drawer/types/RightDrawerPages';
import { useSetHotkeyScope } from '@/ui/utilities/hotkey/hooks/useSetHotkeyScope';
import { WorkspaceMember } from '@/workspace-member/types/WorkspaceMember';

import { Note } from '@/activities/types/Note';
import { NoteTarget } from '@/activities/types/NoteTarget';
import { Task } from '@/activities/types/Task';
import { TaskTarget } from '@/activities/types/TaskTarget';
import { isNewViewableRecordLoadingState } from '@/command-menu/states/isNewViewableRecordLoading';
import { viewableRecordNameSingularState } from '@/command-menu/states/viewableRecordNameSingularState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { ActivityTargetableObject } from '../types/ActivityTargetableEntity';

export const useOpenCreateActivityDrawer = ({
  activityObjectNameSingular,
}: {
  activityObjectNameSingular:
    | CoreObjectNameSingular.Note
    | CoreObjectNameSingular.Task;
}) => {
  const { openRightDrawer } = useRightDrawer();

  const setHotkeyScope = useSetHotkeyScope();

  const { createOneRecord: createOneActivity } = useCreateOneRecord<
    (Task | Note) & { position: 'first' | 'last' }
  >({
    objectNameSingular: activityObjectNameSingular,
  });

  const { createOneRecord: createOneActivityTarget } = useCreateOneRecord<
    TaskTarget | NoteTarget
  >({
    objectNameSingular:
      activityObjectNameSingular === CoreObjectNameSingular.Task
        ? CoreObjectNameSingular.TaskTarget
        : CoreObjectNameSingular.NoteTarget,
    shouldMatchRootQueryFilter: true,
  });

  const setActivityTargetableEntityArray = useSetRecoilState(
    activityTargetableEntityArrayState,
  );
  const setViewableRecordId = useSetRecoilState(viewableRecordIdState);
  const setViewableRecordNameSingular = useSetRecoilState(
    viewableRecordNameSingularState,
  );
  const setIsNewViewableRecordLoading = useSetRecoilState(
    isNewViewableRecordLoadingState,
  );
  const setIsUpsertingActivityInDB = useSetRecoilState(
    isUpsertingActivityInDBState,
  );

  const openCreateActivityDrawer = async ({
    targetableObjects,
    customAssignee,
  }: {
    targetableObjects: ActivityTargetableObject[];
    customAssignee?: WorkspaceMember;
  }) => {
    setIsNewViewableRecordLoading(true);
    openRightDrawer(RightDrawerPages.ViewRecord);
    setViewableRecordId(null);
    setViewableRecordNameSingular(activityObjectNameSingular);

    const activity = await createOneActivity({
      assigneeId: customAssignee?.id,
      position: 'last',
    });

    if (targetableObjects.length > 0) {
      const targetableObjectRelationIdName = `${targetableObjects[0].targetObjectNameSingular}Id`;

      await createOneActivityTarget({
        taskId:
          activityObjectNameSingular === CoreObjectNameSingular.Task
            ? activity.id
            : undefined,
        noteId:
          activityObjectNameSingular === CoreObjectNameSingular.Note
            ? activity.id
            : undefined,
        [targetableObjectRelationIdName]: targetableObjects[0].id,
      });

      setActivityTargetableEntityArray(targetableObjects);
    } else {
      await createOneActivityTarget({
        taskId:
          activityObjectNameSingular === CoreObjectNameSingular.Task
            ? activity.id
            : undefined,
        noteId:
          activityObjectNameSingular === CoreObjectNameSingular.Note
            ? activity.id
            : undefined,
      });

      setActivityTargetableEntityArray([]);
    }

    setHotkeyScope(RightDrawerHotkeyScope.RightDrawer, { goto: false });
    setViewableRecordId(activity.id);

    setIsUpsertingActivityInDB(false);
    setIsNewViewableRecordLoading(false);
  };

  return openCreateActivityDrawer;
};
