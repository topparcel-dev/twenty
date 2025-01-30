import { useTheme } from '@emotion/react';
import { ReactNode } from 'react';

import {
  StyledIconCheck,
  StyledMenuItemLabel,
  StyledMenuItemLeftContent,
} from '../internals/components/StyledMenuItemBase';

<<<<<<< Updated upstream
import { IconCheck, OverflowingTextWithTooltip } from '@ui/display';
=======
import { OverflowingTextWithTooltip } from '@ui/display';
>>>>>>> Stashed changes
import { StyledMenuItemSelect } from './MenuItemSelect';

type MenuItemSelectAvatarProps = {
  avatar?: ReactNode;
  selected: boolean;
  text: string;
  className?: string;
  onClick?: (event?: React.MouseEvent) => void;
  disabled?: boolean;
  hovered?: boolean;
  testId?: string;
};

export const MenuItemSelectAvatar = ({
  avatar,
  text,
  selected,
  className,
  onClick,
  disabled,
  hovered,
  testId,
}: MenuItemSelectAvatarProps) => {
  const theme = useTheme();

  return (
    <StyledMenuItemSelect
      onClick={onClick}
      className={className}
      selected={selected}
      disabled={disabled}
      hovered={hovered}
      data-testid={testId}
    >
      <StyledMenuItemLeftContent>
        {avatar}
        <StyledMenuItemLabel hasLeftIcon={!!avatar}>
          <OverflowingTextWithTooltip text={text} />
        </StyledMenuItemLabel>
      </StyledMenuItemLeftContent>
      {selected && <StyledIconCheck size={theme.icon.size.md} />}
    </StyledMenuItemSelect>
  );
};
