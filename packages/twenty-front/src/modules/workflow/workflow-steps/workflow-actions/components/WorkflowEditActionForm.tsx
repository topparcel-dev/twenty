import { FormFieldInputContainer } from '@/object-record/record-field/form-types/components/FormFieldInputContainer';
import { FormFieldInputInputContainer } from '@/object-record/record-field/form-types/components/FormFieldInputInputContainer';
import { FormFieldInputRowContainer } from '@/object-record/record-field/form-types/components/FormFieldInputRowContainer';
import { InputLabel } from '@/ui/input/components/InputLabel';
import { WorkflowFormAction } from '@/workflow/types/Workflow';
import { WorkflowStepBody } from '@/workflow/workflow-steps/components/WorkflowStepBody';
import { WorkflowStepHeader } from '@/workflow/workflow-steps/components/WorkflowStepHeader';
import { getActionIcon } from '@/workflow/workflow-steps/workflow-actions/utils/getActionIcon';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import { FieldMetadataType, isDefined } from 'twenty-shared';
import {
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconTrash,
  useIcons,
} from 'twenty-ui';
import { v4 } from 'uuid';

type WorkflowEditActionFormProps = {
  action: WorkflowFormAction;
  actionOptions:
    | {
        readonly: true;
      }
    | {
        readonly?: false;
        onActionUpdate: (action: WorkflowFormAction) => void;
      };
};

const StyledRowContainer = styled.div`
  column-gap: ${({ theme }) => theme.spacing(1)};
  display: grid;
  grid-template-columns: 1fr 16px;
`;

const StyledFieldContainer = styled.div`
  align-items: center;
  background: transparent;
  border: none;
  display: flex;
  font-family: inherit;
  padding-inline: ${({ theme }) => theme.spacing(2)};
  width: 100%;

  cursor: pointer;

  &:hover,
  &[data-open='true'] {
    background-color: ${({ theme }) => theme.background.transparent.lighter};
  }
`;

const StyledPlaceholder = styled.div`
  color: ${({ theme }) => theme.font.color.light};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  width: 100%;
`;

const StyledIconButtonContainer = styled.div`
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius.md};
  display: flex;
  justify-content: center;
  width: 24px;

  cursor: pointer;

  &:hover,
  &[data-open='true'] {
    background-color: ${({ theme }) => theme.background.transparent.lighter};
  }
`;

const StyledAddFieldContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.font.color.secondary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  justify-content: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

export const WorkflowEditActionForm = ({
  action,
  actionOptions,
}: WorkflowEditActionFormProps) => {
  const theme = useTheme();
  const { getIcon } = useIcons();
  const { t } = useLingui();
  const headerTitle = isDefined(action.name) ? action.name : `Form`;
  const headerIcon = getActionIcon(action.type);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const isFieldSelected = (fieldName: string) => selectedField === fieldName;
  const handleFieldClick = (fieldName: string) => {
    if (actionOptions.readonly === true) {
      return;
    }

    if (isFieldSelected(fieldName)) {
      setSelectedField(null);
    } else {
      setSelectedField(fieldName);
    }
  };

  return (
    <>
      <WorkflowStepHeader
        onTitleChange={(newName: string) => {
          if (actionOptions.readonly === true) {
            return;
          }

          actionOptions.onActionUpdate({
            ...action,
            name: newName,
          });
        }}
        Icon={getIcon(headerIcon)}
        iconColor={theme.font.color.tertiary}
        initialTitle={headerTitle}
        headerType="Action"
        disabled={actionOptions.readonly}
      />
      <WorkflowStepBody>
        {action.settings.input.map((field) => (
          <FormFieldInputContainer key={field.id}>
            {field.label ? <InputLabel>{field.label}</InputLabel> : null}

            <StyledRowContainer>
              <FormFieldInputRowContainer>
                <FormFieldInputInputContainer
                  hasRightElement={false}
                  onClick={() => {
                    handleFieldClick(field.id);
                  }}
                >
                  <StyledFieldContainer>
                    <StyledPlaceholder>{field.placeholder}</StyledPlaceholder>
                    {isFieldSelected(field.id) ? (
                      <IconChevronUp
                        size={theme.icon.size.md}
                        color={theme.font.color.tertiary}
                      />
                    ) : (
                      <IconChevronDown
                        size={theme.icon.size.md}
                        color={theme.font.color.tertiary}
                      />
                    )}
                  </StyledFieldContainer>
                </FormFieldInputInputContainer>
              </FormFieldInputRowContainer>
              {isFieldSelected(field.id) && (
                <StyledIconButtonContainer>
                  <IconTrash
                    size={theme.icon.size.md}
                    color={theme.font.color.secondary}
                    onClick={() => {
                      if (actionOptions.readonly === true) {
                        return;
                      }

                      actionOptions.onActionUpdate({
                        ...action,
                        settings: {
                          ...action.settings,
                          input: action.settings.input.filter(
                            (f) => f.id !== field.id,
                          ),
                        },
                      });
                    }}
                  />
                </StyledIconButtonContainer>
              )}
            </StyledRowContainer>
          </FormFieldInputContainer>
        ))}
        {!actionOptions.readonly && (
          <StyledRowContainer>
            <FormFieldInputContainer>
              <FormFieldInputRowContainer>
                <FormFieldInputInputContainer
                  hasRightElement={false}
                  onClick={() => {
                    actionOptions.onActionUpdate({
                      ...action,
                      settings: {
                        ...action.settings,
                        input: [
                          ...action.settings.input,
                          {
                            id: v4(),
                            type: FieldMetadataType.TEXT,
                            label: 'New Field',
                            placeholder: 'New Field',
                            settings: {},
                          },
                        ],
                      },
                    });
                  }}
                >
                  <StyledFieldContainer>
                    <StyledAddFieldContainer>
                      <IconPlus size={theme.icon.size.sm} />
                      {t`Add Field`}
                    </StyledAddFieldContainer>
                  </StyledFieldContainer>
                </FormFieldInputInputContainer>
              </FormFieldInputRowContainer>
            </FormFieldInputContainer>
          </StyledRowContainer>
        )}
      </WorkflowStepBody>
    </>
  );
};
