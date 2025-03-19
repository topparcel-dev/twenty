import { useContext } from 'react';

import { FieldInput } from '@/object-record/record-field/components/FieldInput';
import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import { useIsFieldValueReadOnly } from '@/object-record/record-field/hooks/useIsFieldValueReadOnly';
import { FieldInputEvent } from '@/object-record/record-field/types/FieldInputEvent';
import { useRecordTableBodyContextOrThrow } from '@/object-record/record-table/contexts/RecordTableBodyContext';
import { hasRecordTableCellDangerBorderScopedState } from '@/object-record/record-table/record-table-cell/states/hasRecordTableCellDangerBorderScopedState';
import { getRecordFieldInputId } from '@/object-record/utils/getRecordFieldInputId';
import { useSetRecoilState } from 'recoil';

export const RecordTableCellFieldInput = () => {
  const { recordId, fieldDefinition } = useContext(FieldContext);

  const { onMoveFocus, onCloseTableCell } = useRecordTableBodyContextOrThrow();

  const isFieldReadOnly = useIsFieldValueReadOnly();

  const setHasRecordTableCellDangerBorder = useSetRecoilState(
    hasRecordTableCellDangerBorderScopedState(
      `${recordId}-${fieldDefinition.fieldMetadataId}`,
    ),
  );

  const handleEnter: FieldInputEvent = (persistField) => {
    persistField();

    onCloseTableCell();
    onMoveFocus('down');
  };

  const handleSubmit: FieldInputEvent = (persistField) => {
    persistField();

    onCloseTableCell();
  };

  const handleCancel = () => {
    onCloseTableCell();
  };

  const handleClickOutside = (
    persistField: () => void,
    event: MouseEvent | TouchEvent,
  ) => {
    event.stopImmediatePropagation();

    persistField();

    onCloseTableCell();
  };

  const handleEscape: FieldInputEvent = (persistField) => {
    persistField();

    onCloseTableCell();
  };

  const handleTab: FieldInputEvent = (persistField) => {
    persistField();

    onCloseTableCell();
    onMoveFocus('right');
  };

  const handleShiftTab: FieldInputEvent = (persistField) => {
    persistField();

    onCloseTableCell();
    onMoveFocus('left');
  };

  const handleError = (hasError: boolean, hasItem: boolean) => {
    setHasRecordTableCellDangerBorder(hasError && !hasItem);
  };

  return (
    <FieldInput
      recordFieldInputdId={getRecordFieldInputId(
        recordId,
        fieldDefinition?.metadata?.fieldName,
      )}
      onCancel={handleCancel}
      onClickOutside={handleClickOutside}
      onEnter={handleEnter}
      onEscape={handleEscape}
      onShiftTab={handleShiftTab}
      onSubmit={handleSubmit}
      onTab={handleTab}
      isReadOnly={isFieldReadOnly}
      onError={handleError}
    />
  );
};
