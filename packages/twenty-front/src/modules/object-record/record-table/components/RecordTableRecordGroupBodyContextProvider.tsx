import { RecordTableBodyContextProvider } from '@/object-record/record-table/contexts/RecordTableBodyContext';
import { useRecordTableContextOrThrow } from '@/object-record/record-table/contexts/RecordTableContext';
import { useHandleContainerMouseEnter } from '@/object-record/record-table/hooks/internal/useHandleContainerMouseEnter';
import { useUpsertTableRecordInGroup } from '@/object-record/record-table/hooks/internal/useUpsertTableRecordInGroup';
import { useRecordTableMoveFocus } from '@/object-record/record-table/hooks/useRecordTableMoveFocus';
import { useCloseRecordTableCellInGroup } from '@/object-record/record-table/record-table-cell/hooks/internal/useCloseRecordTableCellInGroup';
import { useMoveSoftFocusToCurrentCellOnHover } from '@/object-record/record-table/record-table-cell/hooks/useMoveSoftFocusToCurrentCellOnHover';
import {
  OpenTableCellArgs,
  useOpenRecordTableCellV2,
} from '@/object-record/record-table/record-table-cell/hooks/useOpenRecordTableCellV2';
import { useTriggerActionMenuDropdown } from '@/object-record/record-table/record-table-cell/hooks/useTriggerActionMenuDropdown';
import { MoveFocusDirection } from '@/object-record/record-table/types/MoveFocusDirection';
import { TableCellPosition } from '@/object-record/record-table/types/TableCellPosition';
import { ReactNode } from 'react';

type RecordTableRecordGroupBodyContextProviderProps = {
  recordGroupId: string;
  children?: ReactNode;
};

export const RecordTableRecordGroupBodyContextProvider = ({
  recordGroupId,
  children,
}: RecordTableRecordGroupBodyContextProviderProps) => {
  const { recordTableId } = useRecordTableContextOrThrow();

  const { upsertTableRecordInGroup } =
    useUpsertTableRecordInGroup(recordGroupId);

  const handleupsertTableRecordInGroup = ({
    persistField,
    recordId,
    fieldName,
  }: {
    persistField: () => void;
    recordId: string;
    fieldName: string;
  }) => {
    upsertTableRecordInGroup(persistField, recordId, fieldName);
  };

  const { openTableCell } = useOpenRecordTableCellV2(recordTableId);

  const handleOpenTableCell = (args: OpenTableCellArgs) => {
    openTableCell(args);
  };

  const { moveFocus } = useRecordTableMoveFocus(recordTableId);

  const handleMoveFocus = (direction: MoveFocusDirection) => {
    moveFocus(direction);
  };

  const { closeTableCellInGroup } =
    useCloseRecordTableCellInGroup(recordGroupId);

  const handlecloseTableCellInGroup = () => {
    closeTableCellInGroup();
  };

  const { moveSoftFocusToCurrentCell } =
    useMoveSoftFocusToCurrentCellOnHover(recordTableId);

  const handleMoveSoftFocusToCurrentCell = (
    cellPosition: TableCellPosition,
  ) => {
    moveSoftFocusToCurrentCell(cellPosition);
  };

  const { triggerActionMenuDropdown } = useTriggerActionMenuDropdown({
    recordTableId,
  });

  const handleActionMenuDropdown = (
    event: React.MouseEvent,
    recordId: string,
  ) => {
    triggerActionMenuDropdown(event, recordId);
  };

  const { handleContainerMouseEnter } = useHandleContainerMouseEnter({
    recordTableId,
  });

  return (
    <RecordTableBodyContextProvider
      value={{
        onUpsertRecord: handleupsertTableRecordInGroup,
        onOpenTableCell: handleOpenTableCell,
        onMoveFocus: handleMoveFocus,
        onCloseTableCell: handlecloseTableCellInGroup,
        onMoveSoftFocusToCurrentCell: handleMoveSoftFocusToCurrentCell,
        onActionMenuDropdownOpened: handleActionMenuDropdown,
        onCellMouseEnter: handleContainerMouseEnter,
      }}
    >
      {children}
    </RecordTableBodyContextProvider>
  );
};
