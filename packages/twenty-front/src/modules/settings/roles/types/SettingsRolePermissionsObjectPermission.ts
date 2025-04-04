import { IconComponent } from 'twenty-ui/display';
export type SettingsRolePermissionsObjectPermission = {
  key: string;
  label: string;
  value: boolean;
  Icon: IconComponent;
  setValue: (value: boolean) => void;
};
