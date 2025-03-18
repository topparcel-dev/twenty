import { useOpenRecordInCommandMenu } from '@/command-menu/hooks/useOpenRecordInCommandMenu';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { recordIndexOpenRecordInState } from '@/object-record/record-index/states/recordIndexOpenRecordInState';
import { DEFAULT_CELL_SCOPE } from '@/object-record/record-table/record-table-cell/hooks/useOpenRecordTableCellV2';
import { useSelectedTableCellEditMode } from '@/object-record/record-table/record-table-cell/hooks/useSelectedTableCellEditMode';
import { recordTablePendingRecordIdByGroupComponentFamilyState } from '@/object-record/record-table/states/recordTablePendingRecordIdByGroupComponentFamilyState';
import { useRecordTitleCell } from '@/object-record/record-title-cell/hooks/useRecordTitleCell';
import { getDropdownFocusIdForRecordField } from '@/object-record/utils/getDropdownFocusIdForRecordField';
import { AppPath } from '@/types/AppPath';
import { useSetActiveDropdownFocusIdAndMemorizePrevious } from '@/ui/layout/dropdown/hooks/useSetFocusedDropdownIdAndMemorizePrevious';
import { useSetHotkeyScope } from '@/ui/utilities/hotkey/hooks/useSetHotkeyScope';
import { useRecoilComponentCallbackStateV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackStateV2';
import { ViewOpenRecordInType } from '@/views/types/ViewOpenRecordInType';
import { useRecoilCallback } from 'recoil';
import { isDefined } from 'twenty-shared';
import { v4 } from 'uuid';
import { useNavigateApp } from '~/hooks/useNavigateApp';

export const useCreateNewTableRecord = ({
  objectMetadataItem,
  recordTableId,
}: {
  objectMetadataItem: ObjectMetadataItem;
  recordTableId: string;
}) => {
  const { setSelectedTableCellEditMode } = useSelectedTableCellEditMode({
    scopeId: recordTableId,
  });

  const setHotkeyScope = useSetHotkeyScope();

  const recordTablePendingRecordIdByGroupFamilyState =
    useRecoilComponentCallbackStateV2(
      recordTablePendingRecordIdByGroupComponentFamilyState,
      recordTableId,
    );

  const { setActiveDropdownFocusIdAndMemorizePrevious } =
    useSetActiveDropdownFocusIdAndMemorizePrevious();

  const { openRecordInCommandMenu } = useOpenRecordInCommandMenu();

  const { createOneRecord } = useCreateOneRecord({
    objectNameSingular: objectMetadataItem.nameSingular,
    shouldMatchRootQueryFilter: true,
  });

  const navigate = useNavigateApp();

  const { openRecordTitleCell } = useRecordTitleCell();

  const createNewTableRecord = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const recordId = v4();

        const recordIndexOpenRecordIn = snapshot
          .getLoadable(recordIndexOpenRecordInState)
          .getValue();

        await createOneRecord({ id: recordId });

        if (recordIndexOpenRecordIn === ViewOpenRecordInType.SIDE_PANEL) {
          openRecordInCommandMenu({
            recordId,
            objectNameSingular: objectMetadataItem.nameSingular,
            isNewRecord: true,
          });

          openRecordTitleCell({
            recordId,
            fieldMetadataId: objectMetadataItem.labelIdentifierFieldMetadataId,
          });
        } else {
          navigate(AppPath.RecordShowPage, {
            objectNameSingular: objectMetadataItem.nameSingular,
            objectRecordId: recordId,
          });
        }
      },
    [
      createOneRecord,
      navigate,
      objectMetadataItem.labelIdentifierFieldMetadataId,
      objectMetadataItem.nameSingular,
      openRecordInCommandMenu,
      openRecordTitleCell,
    ],
  );
  const createNewTableRecordInGroup = useRecoilCallback(
    ({ set }) =>
      (recordGroupId: string) => {
        const recordId = v4();

        set(
          recordTablePendingRecordIdByGroupFamilyState(recordGroupId),
          recordId,
        );
        setSelectedTableCellEditMode(-1, 0);
        setHotkeyScope(
          DEFAULT_CELL_SCOPE.scope,
          DEFAULT_CELL_SCOPE.customScopes,
        );

        if (isDefined(objectMetadataItem.labelIdentifierFieldMetadataId)) {
          setActiveDropdownFocusIdAndMemorizePrevious(
            getDropdownFocusIdForRecordField(
              recordId,
              objectMetadataItem.labelIdentifierFieldMetadataId,
              'table-cell',
            ),
          );
        }
      },
    [
      objectMetadataItem,
      recordTablePendingRecordIdByGroupFamilyState,
      setActiveDropdownFocusIdAndMemorizePrevious,
      setHotkeyScope,
      setSelectedTableCellEditMode,
    ],
  );

  return {
    createNewTableRecord,
    createNewTableRecordInGroup,
  };
};
