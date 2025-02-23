import { Tag } from 'twenty-ui';
import { t } from '@lingui/core/macro';
import { ObjectTypeLabel } from '@/settings/data-model/utils/getObjectTypeLabel';

type SettingsDataModelObjectTypeTagProps = {
  objectTypeLabel: ObjectTypeLabel;
  className?: string;
};

export const SettingsDataModelObjectTypeTag = ({
  className,
  objectTypeLabel,
}: SettingsDataModelObjectTypeTagProps) => {
  return (
    <Tag
      className={className}
      color={objectTypeLabel.labelColor}
      text={objectTypeLabel.labelText}
      weight="medium"
    />
  );
};
