import { actionMenuEntriesComponentSelector } from '@/action-menu/states/actionMenuEntriesComponentSelector';
import { ActionMenuComponentInstanceContext } from '@/action-menu/states/contexts/ActionMenuComponentInstanceContext';
import { ActionMenuEntryScope } from '@/action-menu/types/ActionMenuEntry';
import { CommandMenuActionMenuDropdownHotkeyScope } from '@/action-menu/types/CommandMenuActionMenuDropdownHotkeyScope';
import { getRightDrawerActionMenuDropdownIdFromActionMenuId } from '@/action-menu/utils/getRightDrawerActionMenuDropdownIdFromActionMenuId';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdownV2 } from '@/ui/layout/dropdown/hooks/useDropdownV2';
import { useScopedHotkeys } from '@/ui/utilities/hotkey/hooks/useScopedHotkeys';
import { AppHotkeyScope } from '@/ui/utilities/hotkey/types/AppHotkeyScope';
import { useAvailableComponentInstanceIdOrThrow } from '@/ui/utilities/state/component-state/hooks/useAvailableComponentInstanceIdOrThrow';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { useTheme } from '@emotion/react';
import { i18n } from '@lingui/core';
import { Button } from 'twenty-ui/input';
import { getOsControlSymbol } from 'twenty-ui/utilities';
import { MenuItem } from 'twenty-ui/navigation';

export const CommandMenuActionMenuDropdown = () => {
  const actionMenuEntries = useRecoilComponentValueV2(
    actionMenuEntriesComponentSelector,
  );

  const actionMenuId = useAvailableComponentInstanceIdOrThrow(
    ActionMenuComponentInstanceContext,
  );

  const { toggleDropdown } = useDropdownV2();

  const theme = useTheme();

  useScopedHotkeys(
    ['ctrl+o,meta+o'],
    () => {
      toggleDropdown(
        getRightDrawerActionMenuDropdownIdFromActionMenuId(actionMenuId),
        {
          scope:
            CommandMenuActionMenuDropdownHotkeyScope.CommandMenuActionMenuDropdown,
        },
      );
    },
    AppHotkeyScope.CommandMenuOpen,
    [toggleDropdown],
  );

  return (
    <Dropdown
      dropdownId={getRightDrawerActionMenuDropdownIdFromActionMenuId(
        actionMenuId,
      )}
      dropdownHotkeyScope={{
        scope:
          CommandMenuActionMenuDropdownHotkeyScope.CommandMenuActionMenuDropdown,
      }}
      data-select-disable
      clickableComponent={
        <Button title="Options" hotkeys={[getOsControlSymbol(), 'O']} />
      }
      dropdownPlacement="top-end"
      dropdownOffset={{ y: parseInt(theme.spacing(2), 10) }}
      dropdownComponents={
        <DropdownMenuItemsContainer>
          {actionMenuEntries
            .filter(
              (actionMenuEntry) =>
                actionMenuEntry.scope === ActionMenuEntryScope.RecordSelection,
            )
            .map((actionMenuEntry, index) => (
              <MenuItem
                key={index}
                LeftIcon={actionMenuEntry.Icon}
                onClick={() => {
                  toggleDropdown(
                    getRightDrawerActionMenuDropdownIdFromActionMenuId(
                      actionMenuId,
                    ),
                  );
                  actionMenuEntry.onClick?.();
                }}
                text={i18n._(actionMenuEntry.label)}
              />
            ))}
        </DropdownMenuItemsContainer>
      }
    />
  );
};
