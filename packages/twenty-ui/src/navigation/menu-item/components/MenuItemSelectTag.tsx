import { useTheme } from '@emotion/react';

import { StyledMenuItemLeftContent } from '../internals/components/StyledMenuItemBase';

import { IconCheck, Tag } from '@ui/display';
import { ThemeColor } from '@ui/theme';
import { StyledMenuItemSelect } from './MenuItemSelect';

type MenuItemSelectTagProps = {
  selected: boolean;
  isKeySelected?: boolean;
  className?: string;
  onClick?: () => void;
  color: ThemeColor | 'transparent';
  text: string;
  variant?: 'solid' | 'outline';
};

export const MenuItemSelectTag = ({
  color,
  selected,
  isKeySelected,
  className,
  onClick,
  text,
  variant = 'solid',
}: MenuItemSelectTagProps) => {
  const theme = useTheme();

  return (
    <StyledMenuItemSelect
      onClick={onClick}
      className={className}
      selected={selected}
      isKeySelected={isKeySelected}
    >
      <StyledMenuItemLeftContent>
        <Tag variant={variant} color={color} text={text} />
      </StyledMenuItemLeftContent>
      {selected && <IconCheck size={theme.icon.size.sm} />}
    </StyledMenuItemSelect>
  );
};
