import { RecordInlineCellContext } from '@/object-record/record-inline-cell/components/RecordInlineCellContext';
import styled from '@emotion/styled';
import { autoUpdate, flip, offset, useFloating } from '@floating-ui/react';
import { useContext } from 'react';
import { createPortal } from 'react-dom';

const StyledInlineCellEditModeContainer = styled.div`
  align-items: center;

  display: flex;
  width: 100%;
  position: absolute;
  height: 24px;
`;

const StyledInlineCellInput = styled.div`
  align-items: center;
  display: flex;

  min-height: 32px;
  min-width: 240px;

  width: inherit;

  z-index: 1000;
`;

type RecordInlineCellEditModeProps = {
  children: React.ReactNode;
};

// TODO: Refactor this to avoid setting absolute px values.
export const RecordInlineCellEditMode = ({
  children,
}: RecordInlineCellEditModeProps) => {
  const { isCentered } = useContext(RecordInlineCellContext);

  const { refs, floatingStyles } = useFloating({
    placement: isCentered ? 'bottom' : 'bottom-start',
    middleware: [
      flip(),
      offset(
        isCentered
          ? {
              mainAxis: -26,
              crossAxis: 0,
            }
          : {
              mainAxis: -29,
              crossAxis: -4,
            },
      ),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <StyledInlineCellEditModeContainer
      ref={refs.setReference}
      data-testid="inline-cell-edit-mode-container"
    >
      {createPortal(
        <StyledInlineCellInput ref={refs.setFloating} style={floatingStyles}>
          {children}
        </StyledInlineCellInput>,
        document.body,
      )}
    </StyledInlineCellEditModeContainer>
  );
};
