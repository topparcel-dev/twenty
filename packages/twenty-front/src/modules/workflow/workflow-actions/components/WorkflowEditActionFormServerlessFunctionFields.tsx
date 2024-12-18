import { FunctionInput } from '@/workflow/types/FunctionInput';
import { VariablePickerComponent } from '@/object-record/record-field/form-types/types/VariablePickerComponent';
import { isObject } from '@sniptt/guards';
import { InputLabel } from '@/ui/input/components/InputLabel';
import { FormTextFieldInput } from '@/object-record/record-field/form-types/components/FormTextFieldInput';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { FormNestedFieldInputContainer } from '@/object-record/record-field/form-types/components/FormNestedFieldInputContainer';

const StyledContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

export const WorkflowEditActionFormServerlessFunctionFields = ({
  functionInput,
  path = [],
  VariablePicker,
  onInputChange,
  readonly = false,
}: {
  functionInput: FunctionInput;
  path?: string[];
  VariablePicker?: VariablePickerComponent;
  onInputChange: (value: any, path: string[]) => void;
  readonly?: boolean;
}) => {
  const renderFields = ({
    functionInput,
    path = [],
    VariablePicker,
    onInputChange,
    readonly = false,
  }: {
    functionInput: FunctionInput;
    path?: string[];
    VariablePicker?: VariablePickerComponent;
    onInputChange: (value: any, path: string[]) => void;
    readonly?: boolean;
  }): ReactNode[] => {
    return Object.entries(functionInput).map(([inputKey, inputValue]) => {
      const currentPath = [...path, inputKey];
      const pathKey = currentPath.join('.');
      if (inputValue !== null && isObject(inputValue)) {
        return (
          <StyledContainer key={pathKey}>
            <InputLabel>{inputKey}</InputLabel>
            <FormNestedFieldInputContainer>
              {renderFields({
                functionInput: inputValue,
                path: currentPath,
                VariablePicker,
                onInputChange,
              })}
            </FormNestedFieldInputContainer>
          </StyledContainer>
        );
      } else {
        return (
          <FormTextFieldInput
            key={pathKey}
            label={inputKey}
            placeholder="Enter value"
            defaultValue={inputValue ? `${inputValue}` : ''}
            readonly={readonly}
            onPersist={(value) => onInputChange(value, currentPath)}
            VariablePicker={VariablePicker}
          />
        );
      }
    });
  };

  return (
    <>
      {renderFields({
        functionInput,
        path,
        VariablePicker,
        onInputChange,
        readonly,
      })}
    </>
  );
};
