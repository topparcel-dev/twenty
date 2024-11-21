import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconComponent } from 'twenty-ui';

type SettingsOptionIconCustomizerProps = {
  Icon: IconComponent;
  zoom?: number;
  rotate?: number;
};

const StyledIconCustomizer = styled.div<{ zoom: number; rotate: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: scale(${({ zoom }) => zoom}) rotate(${({ rotate }) => rotate}deg);
`;

export const SettingsOptionIconCustomizer = ({
  Icon,
  zoom = 1,
  rotate = -4,
}: SettingsOptionIconCustomizerProps) => {
  const theme = useTheme();
  return (
    <StyledIconCustomizer zoom={zoom} rotate={rotate}>
      <Icon
        size={theme.icon.size.xl}
        color={theme.IllustrationIcon.color.grey}
        stroke={theme.icon.stroke.md}
      />
    </StyledIconCustomizer>
  );
};
