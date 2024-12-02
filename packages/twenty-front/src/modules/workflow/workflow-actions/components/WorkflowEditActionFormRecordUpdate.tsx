import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { Select, SelectOption } from '@/ui/input/components/Select';
import { WorkflowEditGenericFormBase } from '@/workflow/components/WorkflowEditGenericFormBase';
import { WorkflowSingleRecordPicker } from '@/workflow/components/WorkflowSingleRecordPicker';
import { WorkflowRecordUpdateAction } from '@/workflow/types/Workflow';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import {
  HorizontalSeparator,
  IconAddressBook,
  isDefined,
  useIcons,
} from 'twenty-ui';

import { JsonValue } from 'type-fest';
import { useDebouncedCallback } from 'use-debounce';

type WorkflowEditActionFormRecordUpdateProps = {
  action: WorkflowRecordUpdateAction;
  actionOptions:
    | {
        readonly: true;
      }
    | {
        readonly?: false;
        onActionUpdate: (action: WorkflowRecordUpdateAction) => void;
      };
};

type UpdateRecordFormData = {
  objectName: string;
  objectRecordId: string;
  [field: string]: unknown;
};

export const WorkflowEditActionFormRecordUpdate = ({
  action,
  actionOptions,
}: WorkflowEditActionFormRecordUpdateProps) => {
  const theme = useTheme();
  const { getIcon } = useIcons();

  const { activeObjectMetadataItems } = useFilteredObjectMetadataItems();

  const availableMetadata: Array<SelectOption<string>> =
    activeObjectMetadataItems.map((item) => ({
      Icon: getIcon(item.icon),
      label: item.labelPlural,
      value: item.nameSingular,
    }));

  const [formData, setFormData] = useState<UpdateRecordFormData>({
    objectName: action.settings.input.objectName,
    objectRecordId: action.settings.input.objectRecordId,
    ...action.settings.input.objectRecord,
  });
  const isFormDisabled = actionOptions.readonly;

  const handleFieldChange = (
    fieldName: keyof UpdateRecordFormData,
    updatedValue: JsonValue,
  ) => {
    const newFormData: UpdateRecordFormData = {
      ...formData,
      [fieldName]: updatedValue,
    };

    setFormData(newFormData);

    saveAction(newFormData);
  };

  useEffect(() => {
    setFormData({
      objectName: action.settings.input.objectName,
      objectRecordId: action.settings.input.objectRecordId,
      ...action.settings.input.objectRecord,
    });
  }, [action.settings.input]);

  const selectedObjectMetadataItemNameSingular = formData.objectName;

  const selectedObjectMetadataItem = activeObjectMetadataItems.find(
    (item) => item.nameSingular === selectedObjectMetadataItemNameSingular,
  );
  if (!isDefined(selectedObjectMetadataItem)) {
    throw new Error('Should have found the metadata item');
  }

  const saveAction = useDebouncedCallback(
    async (formData: UpdateRecordFormData) => {
      if (actionOptions.readonly === true) {
        return;
      }

      const {
        objectName: updatedObjectName,
        objectRecordId: updatedObjectRecordId,
        ...updatedOtherFields
      } = formData;

      actionOptions.onActionUpdate({
        ...action,
        settings: {
          ...action.settings,
          input: {
            type: 'UPDATE',
            objectName: updatedObjectName,
            objectRecordId: updatedObjectRecordId ?? '',
            objectRecord: updatedOtherFields,
          },
        },
      });
    },
    1_000,
  );

  useEffect(() => {
    return () => {
      saveAction.flush();
    };
  }, [saveAction]);

  const headerTitle = isDefined(action.name) ? action.name : `Update Record`;

  return (
    <WorkflowEditGenericFormBase
      onTitleChange={(newName: string) => {
        if (actionOptions.readonly === true) {
          return;
        }

        actionOptions.onActionUpdate({
          ...action,
          name: newName,
        });
      }}
      HeaderIcon={
        <IconAddressBook
          color={theme.font.color.tertiary}
          stroke={theme.icon.stroke.sm}
        />
      }
      headerTitle={headerTitle}
      headerType="Action"
    >
      <Select
        dropdownId="workflow-edit-action-record-update-object-name"
        label="Object"
        fullWidth
        disabled={isFormDisabled}
        value={formData.objectName}
        emptyOption={{ label: 'Select an option', value: '' }}
        options={availableMetadata}
        onChange={(updatedObjectName) => {
          const newFormData: UpdateRecordFormData = {
            objectName: updatedObjectName,
            objectRecordId: '',
          };

          setFormData(newFormData);

          saveAction(newFormData);
        }}
      />

      <HorizontalSeparator noMargin />

      <WorkflowSingleRecordPicker
        label="Record"
        onChange={(objectRecordId) =>
          handleFieldChange('objectRecordId', objectRecordId)
        }
        objectNameSingular={formData.objectName}
        defaultValue={formData.objectRecordId}
      />
    </WorkflowEditGenericFormBase>
  );
};
