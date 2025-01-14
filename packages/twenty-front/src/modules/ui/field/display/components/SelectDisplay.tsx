import styled from '@emotion/styled';
import { IconComponent, Tag, ThemeColor } from 'twenty-ui';

type SelectDisplayProps = {
  color: ThemeColor | 'transparent';
  label: string;
  Icon?: IconComponent;
};

const StyledSelectContainer = styled.div`
  align-items: center;
  display: flex;
  display: flex;
  gap: ${2};
  justify-content: flex-start;
  max-width: 100%;

  overflow: hidden;

  width: 100%;
`;

export const SelectDisplay = ({ color, label, Icon }: SelectDisplayProps) => {
  return (
    <StyledSelectContainer>
      <Tag preventShrink color={color} text={label} Icon={Icon} />
    </StyledSelectContainer>
  );
};
