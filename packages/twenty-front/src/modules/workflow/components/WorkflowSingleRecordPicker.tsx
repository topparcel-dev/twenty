import {
  IconChevronDown,
  IconForbid,
  isDefined,
  LightIconButton,
} from 'twenty-ui';

import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';
import { StyledFormFieldInputContainer } from '@/object-record/record-field/form-types/components/StyledFormFieldInputContainer';
import { StyledFormFieldInputRowContainer } from '@/object-record/record-field/form-types/components/StyledFormFieldInputRowContainer';
import { SingleRecordSelect } from '@/object-record/relation-picker/components/SingleRecordSelect';
import { useRecordPicker } from '@/object-record/relation-picker/hooks/useRecordPicker';
import { RecordPickerComponentInstanceContext } from '@/object-record/relation-picker/states/contexts/RecordPickerComponentInstanceContext';
import { RecordForSelect } from '@/object-record/relation-picker/types/RecordForSelect';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { InputLabel } from '@/ui/input/components/InputLabel';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { DropdownScope } from '@/ui/layout/dropdown/scopes/DropdownScope';
import { WorkflowSingleRecordFieldChip } from '@/workflow/components/WorkflowSingleRecordFieldChip';
import SearchVariablesDropdown from '@/workflow/search-variables/components/SearchVariablesDropdown';
import { isStandaloneVariableString } from '@/workflow/utils/isStandaloneVariableString';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { isValidUuid } from '~/utils/isValidUuid';

const StyledFormSelectContainer = styled.div`
  background-color: ${({ theme }) => theme.background.transparent.lighter};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-top-left-radius: ${({ theme }) => theme.border.radius.sm};
  border-bottom-left-radius: ${({ theme }) => theme.border.radius.sm};
  border-right: none;
  border-bottom-right-radius: none;
  border-top-right-radius: none;
  box-sizing: border-box;
  display: flex;
  overflow: 'hidden';
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing(1)};
`;

const StyledSearchVariablesDropdownContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  ${({ theme }) => css`
    :hover {
      background-color: ${theme.background.transparent.light};
    }
  `}
  ${({ theme }) => css`
    background-color: ${theme.background.transparent.lighter};
    border-top-right-radius: ${theme.border.radius.sm};
    border-bottom-right-radius: ${theme.border.radius.sm};
    border: 1px solid ${theme.border.color.medium};
  `}
`;

export type RecordId = string;
export type Variable = string;

export type WorkflowSingleRecordPickerProps = {
  label?: string;
  defaultValue: RecordId | Variable;
  onChange: (value: RecordId | Variable) => void;
  objectNameSingular: string;
};

export const WorkflowSingleRecordPicker = ({
  label,
  defaultValue,
  objectNameSingular,
  onChange,
}: WorkflowSingleRecordPickerProps) => {
  const [draftValue, setDraftValue] = useState<
    | {
        type: 'static';
        value: RecordId;
      }
    | {
        type: 'variable';
        value: Variable;
      }
  >(
    isStandaloneVariableString(defaultValue)
      ? {
          type: 'variable',
          value: defaultValue,
        }
      : {
          type: 'static',
          value: defaultValue || '',
        },
  );

  const { record } = useFindOneRecord({
    objectRecordId:
      isDefined(defaultValue) && !isStandaloneVariableString(defaultValue)
        ? defaultValue
        : '',
    objectNameSingular,
    withSoftDeleted: true,
    skip: !isValidUuid(defaultValue),
  });

  const [selectedRecord, setSelectedRecord] = useState<
    ObjectRecord | undefined
  >(record);

  const dropdownId = `workflow-record-picker-${objectNameSingular}`;
  const variablesDropdownId = `workflow-record-picker-${objectNameSingular}-variables`;

  const { closeDropdown } = useDropdown(dropdownId);

  const { setRecordPickerSearchFilter } = useRecordPicker({
    recordPickerInstanceId: dropdownId,
  });

  const handleCloseRelationPickerDropdown = useCallback(() => {
    setRecordPickerSearchFilter('');
  }, [setRecordPickerSearchFilter]);

  const handleRecordSelected = (
    selectedEntity: RecordForSelect | null | undefined,
  ) => {
    setDraftValue({
      type: 'static',
      value: selectedEntity?.record?.id ?? '',
    });
    setSelectedRecord(selectedEntity?.record);
    closeDropdown();

    onChange?.(selectedEntity?.record?.id ?? '');
  };

  const handleVariableTagInsert = (variable: string) => {
    setDraftValue({
      type: 'variable',
      value: variable,
    });
    setSelectedRecord(undefined);
    closeDropdown();

    onChange?.(variable);
  };

  const handleUnlinkVariable = () => {
    setDraftValue({
      type: 'static',
      value: '',
    });
    closeDropdown();

    onChange('');
  };

  return (
    <StyledFormFieldInputContainer>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <StyledFormFieldInputRowContainer>
        <StyledFormSelectContainer>
          <WorkflowSingleRecordFieldChip
            draftValue={draftValue}
            selectedRecord={selectedRecord}
            objectNameSingular={objectNameSingular}
            onRemove={handleUnlinkVariable}
          />
          <DropdownScope dropdownScopeId={dropdownId}>
            <Dropdown
              dropdownId={dropdownId}
              dropdownPlacement="left-start"
              onClose={handleCloseRelationPickerDropdown}
              clickableComponent={
                <LightIconButton
                  className="displayOnHover"
                  Icon={IconChevronDown}
                  accent="tertiary"
                />
              }
              dropdownComponents={
                <RecordPickerComponentInstanceContext.Provider
                  value={{ instanceId: dropdownId }}
                >
                  <SingleRecordSelect
                    EmptyIcon={IconForbid}
                    emptyLabel={'No ' + objectNameSingular}
                    onCancel={() => closeDropdown()}
                    onRecordSelected={handleRecordSelected}
                    objectNameSingular={objectNameSingular}
                    recordPickerInstanceId={dropdownId}
                    selectedRecordIds={
                      draftValue?.value &&
                      !isStandaloneVariableString(draftValue.value)
                        ? [draftValue.value]
                        : []
                    }
                  />
                </RecordPickerComponentInstanceContext.Provider>
              }
              dropdownHotkeyScope={{
                scope: dropdownId,
              }}
            />
          </DropdownScope>
        </StyledFormSelectContainer>
        <StyledSearchVariablesDropdownContainer>
          <SearchVariablesDropdown
            inputId={variablesDropdownId}
            onVariableSelect={handleVariableTagInsert}
            disabled={false}
          />
        </StyledSearchVariablesDropdownContainer>
      </StyledFormFieldInputRowContainer>
    </StyledFormFieldInputContainer>
  );
};
