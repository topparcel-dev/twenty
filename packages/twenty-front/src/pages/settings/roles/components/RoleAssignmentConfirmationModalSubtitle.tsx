import { SettingsCard } from '@/settings/components/SettingsCard';
import styled from '@emotion/styled';
import { t } from '@lingui/core/macro';
import { IconUser } from 'twenty-ui';
import { RoleAssignmentConfirmationModalSelectedWorkspaceMember } from '~/pages/settings/roles/types/RoleAssignmentConfirmationModalSelectedWorkspaceMember';

const StyledSettingsCardContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

type RoleAssignmentConfirmationModalSubtitleProps = {
  selectedWorkspaceMember: RoleAssignmentConfirmationModalSelectedWorkspaceMember;
  onRoleClick: (roleId: string) => void;
};

export const RoleAssignmentConfirmationModalSubtitle = ({
  selectedWorkspaceMember,
  onRoleClick,
}: RoleAssignmentConfirmationModalSubtitleProps) => {
  const workspaceMemberName = selectedWorkspaceMember.name;

  return (
    <>
      {t`${workspaceMemberName} will be unassigned from the following role:`}
      <StyledSettingsCardContainer>
        <SettingsCard
          title={selectedWorkspaceMember.role?.label || ''}
          Icon={<IconUser />}
          onClick={() =>
            selectedWorkspaceMember.role &&
            onRoleClick(selectedWorkspaceMember.role.id)
          }
        />
      </StyledSettingsCardContainer>
    </>
  );
};
