import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { FormFieldInput } from '@/object-record/record-field/components/FormFieldInput';
import { Select, SelectOption } from '@/ui/input/components/Select';
import { WorkflowEditGenericFormBase } from '@/workflow/components/WorkflowEditGenericFormBase';
import { WorkflowVariablePicker } from '@/workflow/components/WorkflowVariablePicker';
import { WorkflowRecordCreateAction } from '@/workflow/types/Workflow';
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
import { FieldMetadataType } from '~/generated/graphql';

type WorkflowEditActionFormRecordCreateProps = {
  action: WorkflowRecordCreateAction;
  actionOptions:
    | {
        readonly: true;
      }
    | {
        readonly?: false;
        onActionUpdate: (action: WorkflowRecordCreateAction) => void;
      };
};

type CreateRecordFormData = {
  objectName: string;
  [field: string]: unknown;
};

export const WorkflowEditActionFormRecordCreate = ({
  action,
  actionOptions,
}: WorkflowEditActionFormRecordCreateProps) => {
  const theme = useTheme();
  const { getIcon } = useIcons();

  const { activeObjectMetadataItems } = useFilteredObjectMetadataItems();

  const availableMetadata: Array<SelectOption<string>> =
    activeObjectMetadataItems.map((item) => ({
      Icon: getIcon(item.icon),
      label: item.labelPlural,
      value: item.nameSingular,
    }));

  const [formData, setFormData] = useState<CreateRecordFormData>({
    objectName: action.settings.input.objectName,
    ...action.settings.input.objectRecord,
  });
  const isFormDisabled = actionOptions.readonly;

  const handleFieldChange = (
    fieldName: keyof CreateRecordFormData,
    updatedValue: JsonValue,
  ) => {
    const newFormData: CreateRecordFormData = {
      ...formData,
      [fieldName]: updatedValue,
    };

    setFormData(newFormData);

    saveAction(newFormData);
  };

  useEffect(() => {
    setFormData({
      objectName: action.settings.input.objectName,
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

  const editableFields = selectedObjectMetadataItem.fields.filter(
    (field) =>
      field.type !== FieldMetadataType.Relation &&
      !field.isSystem &&
      field.isActive,
  );

  const saveAction = useDebouncedCallback(
    async (formData: CreateRecordFormData) => {
      if (actionOptions.readonly === true) {
        return;
      }

      const { objectName: updatedObjectName, ...updatedOtherFields } = formData;

      actionOptions.onActionUpdate({
        ...action,
        settings: {
          ...action.settings,
          input: {
            type: 'CREATE',
            objectName: updatedObjectName,
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

  const headerTitle = isDefined(action.name) ? action.name : `Create Record`;

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
        dropdownId="workflow-edit-action-record-create-object-name"
        label="Object"
        fullWidth
        disabled={isFormDisabled}
        value={formData.objectName}
        emptyOption={{ label: 'Select an option', value: '' }}
        options={availableMetadata}
        onChange={(updatedObjectName) => {
          const newFormData: CreateRecordFormData = {
            objectName: updatedObjectName,
          };

          setFormData(newFormData);

          saveAction(newFormData);
        }}
      />

      <HorizontalSeparator noMargin />

      {editableFields.map((field) => {
        const currentValue = formData[field.name] as JsonValue;

        return (
          <FormFieldInput
            key={field.id}
            defaultValue={currentValue}
            field={field}
            onPersist={(value) => {
              handleFieldChange(field.name, value);
            }}
            VariablePicker={WorkflowVariablePicker}
          />
        );
      })}
    </WorkflowEditGenericFormBase>
  );
};
