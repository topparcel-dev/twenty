import { useCallback, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { IconSettings, UndecoratedLink, useIcons } from 'twenty-ui';

import { getObjectSlug } from '@/object-metadata/utils/getObjectSlug';
import { FieldMetadata } from '@/object-record/record-field/types/FieldMetadata';
import { RecordTableContext } from '@/object-record/record-table/contexts/RecordTableContext';
import { useTableColumns } from '@/object-record/record-table/hooks/useTableColumns';
import { hiddenTableColumnsComponentSelector } from '@/object-record/record-table/states/selectors/hiddenTableColumnsComponentSelector';
import { ColumnDefinition } from '@/object-record/record-table/types/ColumnDefinition';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { DropdownMenuSeparator } from '@/ui/layout/dropdown/components/DropdownMenuSeparator';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { MenuItem } from '@/ui/navigation/menu-item/components/MenuItem';
import { navigationMemorizedUrlState } from '@/ui/navigation/states/navigationMemorizedUrlState';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';

export const RecordTableHeaderPlusButtonContent = () => {
  const { objectMetadataItem } = useContext(RecordTableContext);
  const { closeDropdown } = useDropdown();

  const hiddenTableColumns = useRecoilComponentValueV2(
    hiddenTableColumnsComponentSelector,
  );

  const { getIcon } = useIcons();
  const { handleColumnVisibilityChange } = useTableColumns();

  const handleAddColumn = useCallback(
    (column: ColumnDefinition<FieldMetadata>) => {
      closeDropdown();
      handleColumnVisibilityChange(column);
    },
    [handleColumnVisibilityChange, closeDropdown],
  );

  const location = useLocation();
  const setNavigationMemorizedUrl = useSetRecoilState(
    navigationMemorizedUrlState,
  );

  return (
    <>
      {hiddenTableColumns.length > 0 && (
        <>
          <DropdownMenuItemsContainer>
            {hiddenTableColumns.map((column) => (
              <MenuItem
                key={column.fieldMetadataId}
                onClick={() => handleAddColumn(column)}
                LeftIcon={getIcon(column.iconName)}
                text={column.label}
              />
            ))}
          </DropdownMenuItemsContainer>
          <DropdownMenuSeparator />
        </>
      )}
      <DropdownMenuItemsContainer>
        <UndecoratedLink
          fullWidth
          to={`/settings/objects/${getObjectSlug(objectMetadataItem)}`}
          onClick={() => {
            setNavigationMemorizedUrl(location.pathname + location.search);
          }}
        >
          <MenuItem LeftIcon={IconSettings} text="Customize fields" />
        </UndecoratedLink>
      </DropdownMenuItemsContainer>
    </>
  );
};
