import { SettingsAdminTabContent } from '@/settings/admin-panel/components/SettingsAdminTabContent';
import { SETTINGS_ADMIN_TABS } from '@/settings/admin-panel/constants/SettingsAdminTabs';
import { SETTINGS_ADMIN_TABS_ID } from '@/settings/admin-panel/constants/SettingsAdminTabsId';
import { TabList } from '@/ui/layout/tab/components/TabList';
import styled from '@emotion/styled';
import { IconHeart, IconSettings2, IconVariable } from 'twenty-ui';
import { t } from '@lingui/core/macro';

const StyledTabListContainer = styled.div`
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.border.color.light}`};
  box-sizing: border-box;
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const SettingsAdminContent = () => {
  const tabs = [
    {
      id: SETTINGS_ADMIN_TABS.GENERAL,
      title: t`General`,
      Icon: IconSettings2,
    },
    {
      id: SETTINGS_ADMIN_TABS.ENV_VARIABLES,
      title: t`Env Variables`,
      Icon: IconVariable,
    },
    {
      id: SETTINGS_ADMIN_TABS.HEALTH_STATUS,
      title: t`Health Status`,
      Icon: IconHeart,
    },
  ];

  return (
    <>
      <StyledTabListContainer>
        <TabList
          tabs={tabs}
          tabListInstanceId={SETTINGS_ADMIN_TABS_ID}
          behaveAsLinks={true}
        />
      </StyledTabListContainer>
      <SettingsAdminTabContent />
    </>
  );
};
