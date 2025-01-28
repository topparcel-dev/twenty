import { useContext } from 'react';
import { Key } from 'ts-key-enum';
import { IconArrowUpRight, IconPencil } from 'twenty-ui';

import { ActivityTargetChips } from '@/activities/components/ActivityTargetChips';
import { ActivityTargetInlineCellEditMode } from '@/activities/inline-cell/components/ActivityTargetInlineCellEditMode';
import { ActivityEditorHotkeyScope } from '@/activities/types/ActivityEditorHotkeyScope';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useFieldContext } from '@/object-record/hooks/useFieldContext';
import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import { FieldFocusContextProvider } from '@/object-record/record-field/contexts/FieldFocusContextProvider';
import { RecordFieldInputScope } from '@/object-record/record-field/scopes/RecordFieldInputScope';
import { RecordInlineCellContainer } from '@/object-record/record-inline-cell/components/RecordInlineCellContainer';
import { RecordInlineCellContext } from '@/object-record/record-inline-cell/components/RecordInlineCellContext';
import { useInlineCell } from '@/object-record/record-inline-cell/hooks/useInlineCell';
import { useScopedHotkeys } from '@/ui/utilities/hotkey/hooks/useScopedHotkeys';

type ActivityTargetsInlineCellProps = {
  activityId: string;
  showLabel?: boolean;
  maxWidth?: number;
  readonly?: boolean;
  activityObjectNameSingular:
    | CoreObjectNameSingular.Note
    | CoreObjectNameSingular.Task;
};

export const ActivityTargetsInlineCell = ({
  activityId,
  showLabel = true,
  maxWidth,
  readonly,
  activityObjectNameSingular,
}: ActivityTargetsInlineCellProps) => {
  const { closeInlineCell } = useInlineCell();

  const { fieldDefinition } = useContext(FieldContext);

  useScopedHotkeys(
    Key.Escape,
    () => {
      closeInlineCell();
    },
    ActivityEditorHotkeyScope.ActivityTargets,
  );

  const { FieldContextProvider: ActivityTargetsContextProvider } =
    useFieldContext({
      objectNameSingular: activityObjectNameSingular,
      objectRecordId: activityId,
      fieldMetadataName: fieldDefinition.metadata.fieldName,
      fieldPosition: 3,
      // overridenIsFieldEmpty: activityTargetObjectRecords.length === 0,
    });

  return (
    <RecordFieldInputScope recordFieldInputScopeId={activityId}>
      <FieldFocusContextProvider>
        {ActivityTargetsContextProvider && (
          <ActivityTargetsContextProvider>
            <RecordInlineCellContext.Provider
              value={{
                buttonIcon: IconPencil,
                customEditHotkeyScope: {
                  scope: ActivityEditorHotkeyScope.ActivityTargets,
                },
                IconLabel: showLabel ? IconArrowUpRight : undefined,
                showLabel: showLabel,
                readonly: readonly,
                labelWidth: fieldDefinition?.labelWidth,
                editModeContent: (
                  <ActivityTargetInlineCellEditMode
                    activityId={activityId}
                    activityObjectNameSingular={activityObjectNameSingular}
                  />
                ),
                label: 'Relations',
                displayModeContent: (
                  <ActivityTargetChips
                    activityId={activityId}
                    activityObjectNameSingular={activityObjectNameSingular}
                    maxWidth={maxWidth}
                  />
                ),
              }}
            >
              <RecordInlineCellContainer />
            </RecordInlineCellContext.Provider>
          </ActivityTargetsContextProvider>
        )}
      </FieldFocusContextProvider>
    </RecordFieldInputScope>
  );
};
