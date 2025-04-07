import { SettingsRolePermissionsObjectPermission } from '@/settings/roles/types/SettingsRolePermissionsObjectPermission';
import { TableCell } from '@/ui/layout/table/components/TableCell';
import { TableRow } from '@/ui/layout/table/components/TableRow';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Checkbox } from 'twenty-ui/input';

const StyledIconWrapper = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.adaptiveColors.blue1};
  border: 1px solid ${({ theme }) => theme.adaptiveColors.blue3};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  display: flex;
  height: ${({ theme }) => theme.spacing(4)};
  justify-content: center;
  width: ${({ theme }) => theme.spacing(4)};
`;

const StyledIcon = styled.div`
  align-items: center;
  display: flex;
  color: ${({ theme }) => theme.color.blue};
  justify-content: center;
`;

const StyledLabel = styled.span`
  color: ${({ theme }) => theme.font.color.primary};
`;

const StyledPermissionCell = styled(TableCell)`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(2)};
`;

const StyledCheckboxCell = styled(TableCell)`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding-right: ${({ theme }) => theme.spacing(4)};
`;

const StyledTableRow = styled(TableRow)`
  align-items: center;
  display: flex;
`;

type SettingsRolePermissionsObjectsTableRowProps = {
  permission: SettingsRolePermissionsObjectPermission;
  isEditable: boolean;
};

export const SettingsRolePermissionsObjectsTableRow = ({
  permission,
  isEditable,
}: SettingsRolePermissionsObjectsTableRowProps) => {
  const theme = useTheme();

  return (
    <StyledTableRow>
      <StyledPermissionCell>
        <StyledIconWrapper>
          <StyledIcon>
            <permission.Icon size={theme.icon.size.sm} />
          </StyledIcon>
        </StyledIconWrapper>
        <StyledLabel>{permission.label}</StyledLabel>
      </StyledPermissionCell>
      <StyledCheckboxCell>
        <Checkbox
          checked={permission.value}
          onChange={() => permission.setValue(!permission.value)}
          disabled={!isEditable}
        />
      </StyledCheckboxCell>
    </StyledTableRow>
  );
};
