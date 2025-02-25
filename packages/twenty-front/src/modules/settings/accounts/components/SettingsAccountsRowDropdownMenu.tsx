import { useState } from 'react';
import {
  IconCalendarEvent,
  IconDotsVertical,
  IconMail,
  IconRefresh,
  IconTrash,
  LightIconButton,
  MenuItem,
} from 'twenty-ui';

import { ConnectedAccount } from '@/accounts/types/ConnectedAccount';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useDestroyOneRecord } from '@/object-record/hooks/useDestroyOneRecord';
import { useTriggerApisOAuth } from '@/settings/accounts/hooks/useTriggerApiOAuth';
import { SettingsPath } from '@/types/SettingsPath';
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { ConfirmationModal } from '@/ui/layout/modal/components/ConfirmationModal';
import { useNavigateSettings } from '~/hooks/useNavigateSettings';
import { Trans, useLingui } from '@lingui/react/macro';

type SettingsAccountsRowDropdownMenuProps = {
  account: ConnectedAccount;
};

export const SettingsAccountsRowDropdownMenu = ({
  account,
}: SettingsAccountsRowDropdownMenuProps) => {
  const dropdownId = `settings-account-row-${account.id}`;
  const { t } = useLingui();
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const navigate = useNavigateSettings();
  const { closeDropdown } = useDropdown(dropdownId);

  const { destroyOneRecord } = useDestroyOneRecord({
    objectNameSingular: CoreObjectNameSingular.ConnectedAccount,
  });
  const { triggerApisOAuth } = useTriggerApisOAuth();

  const deleteAccount = async () => {
    await destroyOneRecord(account.id);
    setIsDeleteAccountModalOpen(false);
  };

  return (
    <>
      <Dropdown
        dropdownId={dropdownId}
        dropdownPlacement="right-start"
        dropdownHotkeyScope={{ scope: dropdownId }}
        clickableComponent={
          <LightIconButton Icon={IconDotsVertical} accent="tertiary" />
        }
        dropdownMenuWidth={160}
        dropdownComponents={
          <DropdownMenuItemsContainer>
            <MenuItem
              LeftIcon={IconMail}
              text={t`Emails settings`}
              onClick={() => {
                navigate(SettingsPath.AccountsEmails);
                closeDropdown();
              }}
            />
            <MenuItem
              LeftIcon={IconCalendarEvent}
              text={t`Calendar settings`}
              onClick={() => {
                navigate(SettingsPath.AccountsCalendars);
                closeDropdown();
              }}
            />
            {account.authFailedAt && (
              <MenuItem
                LeftIcon={IconRefresh}
                text={t`Reconnect`}
                onClick={() => {
                  triggerApisOAuth(account.provider);
                  closeDropdown();
                }}
              />
            )}
            <MenuItem
              accent="danger"
              LeftIcon={IconTrash}
              text={t`Remove account`}
              onClick={() => {
                setIsDeleteAccountModalOpen(true);
                closeDropdown();
              }}
            />
          </DropdownMenuItemsContainer>
        }
      />
      <ConfirmationModal
        isOpen={isDeleteAccountModalOpen}
        setIsOpen={setIsDeleteAccountModalOpen}
        title={t`Data deletion`}
        subtitle={
          <Trans>
            All emails and events linked to this account will be deleted
          </Trans>
        }
        onConfirmClick={deleteAccount}
        deleteButtonText={t`Delete account`}
      />
    </>
  );
};
