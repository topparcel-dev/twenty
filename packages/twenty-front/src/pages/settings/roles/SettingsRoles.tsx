import { Trans, useLingui } from '@lingui/react/macro';

import { SettingsPageContainer } from '@/settings/components/SettingsPageContainer';
import { SettingsPath } from '@/types/SettingsPath';
import { SubMenuTopBarContainer } from '@/ui/layout/page/components/SubMenuTopBarContainer';
import { useGetRolesQuery } from '~/generated/graphql';
import { Roles } from '~/pages/settings/roles/components/Roles';
import { RolesDefaultRole } from '~/pages/settings/roles/components/RolesDefaultRole';
import { getSettingsPath } from '~/utils/navigation/getSettingsPath';

export const SettingsRoles = () => {
  const { t } = useLingui();
  const { data: rolesData, loading: rolesLoading } = useGetRolesQuery({
    fetchPolicy: 'network-only',
  });

  return (
    <SubMenuTopBarContainer
      title={t`Roles`}
      links={[
        {
          children: <Trans>Workspace</Trans>,
          href: getSettingsPath(SettingsPath.Workspace),
        },
        { children: <Trans>Roles</Trans> },
      ]}
    >
      <SettingsPageContainer>
        {!rolesLoading && (
          <>
            <Roles roles={rolesData?.getRoles ?? []} />
            <RolesDefaultRole roles={rolesData?.getRoles ?? []} />
          </>
        )}
      </SettingsPageContainer>
    </SubMenuTopBarContainer>
  );
};
