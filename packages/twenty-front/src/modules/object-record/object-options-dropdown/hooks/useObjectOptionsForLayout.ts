import { MAIN_CONTEXT_STORE_INSTANCE_ID } from '@/context-store/constants/MainContextStoreInstanceId';
import { contextStoreCurrentViewIdComponentState } from '@/context-store/states/contextStoreCurrentViewIdComponentState';

import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { useLoadRecordIndexStates } from '@/object-record/record-index/hooks/useLoadRecordIndexStates';
import { recordIndexViewTypeState } from '@/object-record/record-index/states/recordIndexViewTypeState';
import { prefetchViewFromViewIdFamilySelector } from '@/prefetch/states/selector/prefetchViewFromViewIdFamilySelector';
import { useSetRecoilComponentStateV2 } from '@/ui/utilities/state/component-state/hooks/useSetRecoilComponentStateV2';
import { usePersistViewGroupRecords } from '@/views/hooks/internal/usePersistViewGroupRecords';
import { useUpdateCurrentView } from '@/views/hooks/useUpdateCurrentView';
import { GraphQLView } from '@/views/types/GraphQLView';
import { ViewGroup } from '@/views/types/ViewGroup';
import { ViewType } from '@/views/types/ViewType';
import { useGetAvailableFieldsForKanban } from '@/views/view-picker/hooks/useGetAvailableFieldsForKanban';
import { viewPickerKanbanFieldMetadataIdComponentState } from '@/views/view-picker/states/viewPickerKanbanFieldMetadataIdComponentState';
import { useCallback } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { assertUnreachable, isDefined } from 'twenty-shared/utils';
import { v4 } from 'uuid';

export const useSetViewTypeFromLayoutOptionsMenu = () => {
  const { updateCurrentView } = useUpdateCurrentView();
  const setRecordIndexViewType = useSetRecoilState(recordIndexViewTypeState);
  const { availableFieldsForKanban } = useGetAvailableFieldsForKanban();
  const { objectMetadataItem } = useRecordIndexContextOrThrow();

  const setViewPickerKanbanFieldMetadataId = useSetRecoilComponentStateV2(
    viewPickerKanbanFieldMetadataIdComponentState,
  );

  const { loadRecordIndexStates } = useLoadRecordIndexStates();

  const { createViewGroupRecords } = usePersistViewGroupRecords();

  const createViewGroupAssociatedWithKanbanField = useCallback(
    async (randomFieldForKanban: string, currentViewId: string) => {
      const viewGroupsToCreate =
        objectMetadataItem.fields
          ?.find((field) => field.id === randomFieldForKanban)
          ?.options?.map(
            (option, index) =>
              ({
                id: v4(),
                __typename: 'ViewGroup',
                fieldMetadataId: randomFieldForKanban,
                fieldValue: option.value,
                isVisible: true,
                position: index,
              }) satisfies ViewGroup,
          ) ?? [];

      viewGroupsToCreate.push({
        __typename: 'ViewGroup',
        id: v4(),
        fieldValue: '',
        position: viewGroupsToCreate.length,
        isVisible: true,
        fieldMetadataId: randomFieldForKanban,
      } satisfies ViewGroup);

      await createViewGroupRecords({
        viewGroupsToCreate,
        viewId: currentViewId,
      });

      return viewGroupsToCreate;
    },
    [objectMetadataItem, createViewGroupRecords],
  );

  const setAndPersistViewType = useRecoilCallback(
    ({ snapshot }) =>
      async (viewType: ViewType) => {
        const currentViewId = snapshot
          .getLoadable(
            contextStoreCurrentViewIdComponentState.atomFamily({
              instanceId: MAIN_CONTEXT_STORE_INSTANCE_ID,
            }),
          )
          .getValue();

        if (!isDefined(currentViewId)) {
          throw new Error('No view id found');
        }
        const currentView = snapshot
          .getLoadable(
            prefetchViewFromViewIdFamilySelector({ viewId: currentViewId }),
          )
          .getValue();
        if (!isDefined(currentView)) {
          throw new Error('No current view found');
        }

        const updateCurrentViewParams: Partial<GraphQLView> = {};
        updateCurrentViewParams.type = viewType;

        switch (viewType) {
          case ViewType.Kanban: {
            if (availableFieldsForKanban.length === 0) {
              throw new Error('No fields for kanban - should not happen');
            }
            const previouslySelectedKanbanField = availableFieldsForKanban.find(
              (fieldsForKanban) =>
                fieldsForKanban.id === currentView.kanbanFieldMetadataId,
            );

            const kanbanField = isDefined(previouslySelectedKanbanField)
              ? previouslySelectedKanbanField
              : availableFieldsForKanban[0];

            if (!isDefined(previouslySelectedKanbanField)) {
              updateCurrentViewParams.kanbanFieldMetadataId = kanbanField.id;
            }

            const hasViewGroups = currentView.viewGroups.some(
              (viewGroup: ViewGroup) =>
                viewGroup.fieldMetadataId === kanbanField.id,
            );

            if (!hasViewGroups) {
              const viewGroups = await createViewGroupAssociatedWithKanbanField(
                kanbanField.id,
                currentView.id,
              );
              loadRecordIndexStates(
                { ...currentView, viewGroups },
                objectMetadataItem,
              );
              setViewPickerKanbanFieldMetadataId(kanbanField.id);
            }
            setRecordIndexViewType(viewType);
            await updateCurrentView(updateCurrentViewParams);
            break;
          }
          case ViewType.Table:
            setRecordIndexViewType(viewType);
            await updateCurrentView(updateCurrentViewParams);
            break;
          default: {
            return assertUnreachable(viewType);
          }
        }
      },
    [
      availableFieldsForKanban,
      objectMetadataItem,
      updateCurrentView,
      setRecordIndexViewType,
      createViewGroupAssociatedWithKanbanField,
      setViewPickerKanbanFieldMetadataId,
      loadRecordIndexStates,
    ],
  );

  return {
    setAndPersistViewType,
  };
};
