import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { TEXT_INPUT_STYLE } from 'twenty-ui';

import { LightCopyIconButton } from '@/object-record/record-field/components/LightCopyIconButton';
import { useRegisterInputEvents } from '@/object-record/record-field/meta-types/input/hooks/useRegisterInputEvents';
import { isDefined } from '~/utils/isDefined';
import { turnIntoEmptyStringIfWhitespacesOnly } from '~/utils/string/turnIntoEmptyStringIfWhitespacesOnly';

export type TextAreaInputProps = {
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  value: string;
  onEnter: (newText: string) => void;
  onEscape: (newText: string) => void;
  onTab?: (newText: string) => void;
  onShiftTab?: (newText: string) => void;
  onClickOutside: (event: MouseEvent | TouchEvent, inputValue: string) => void;
  hotkeyScope: string;
  onChange?: (newText: string) => void;
  maxRows?: number;
  copyButton?: boolean;
};

const StyledTextArea = styled(TextareaAutosize)`
  ${TEXT_INPUT_STYLE}
  align-items: center;
  display: flex;
  justify-content: center;
  resize: none;
  max-height: 400px;
  width: calc(100% - ${({ theme }) => theme.spacing(7)});
  background: transparent;
`;

const StyledTextAreaContainer = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border: ${({ theme }) => `1px solid ${theme.border.color.medium}`};
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(0)};
  border-radius: ${({ theme }) => theme.border.radius.sm};

  @supports (
    (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))
  ) {
    background: ${({ theme }) => theme.background.transparent.secondary};
    backdrop-filter: ${({ theme }) => theme.blur.medium};
    -webkit-backdrop-filter: ${({ theme }) => theme.blur.medium};
  }
`;

const StyledLightIconButtonContainer = styled.div`
  background: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
`;

export const TextAreaInput = ({
  disabled,
  className,
  placeholder,
  autoFocus,
  value,
  hotkeyScope,
  onEnter,
  onEscape,
  onTab,
  onShiftTab,
  onClickOutside,
  onChange,
  maxRows,
  copyButton = true,
}: TextAreaInputProps) => {
  const [internalText, setInternalText] = useState(value);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const targetValue = turnIntoEmptyStringIfWhitespacesOnly(
      event.target.value,
    );
    setInternalText(targetValue);
    onChange?.(targetValue);
  };

  const wrapperRef = useRef<HTMLTextAreaElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDefined(wrapperRef.current)) {
      wrapperRef.current.setSelectionRange(
        wrapperRef.current.value.length,
        wrapperRef.current.value.length,
      );
    }
  }, []);

  useRegisterInputEvents({
    inputRef: wrapperRef,
    copyRef: copyRef,
    inputValue: internalText,
    onEnter,
    onEscape,
    onClickOutside,
    onTab,
    onShiftTab,
    hotkeyScope,
  });

  return (
    <StyledTextAreaContainer>
      <StyledTextArea
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        ref={wrapperRef}
        onChange={handleChange}
        autoFocus={autoFocus}
        value={internalText}
        maxRows={maxRows}
      />
      {copyButton && (
        <StyledLightIconButtonContainer ref={copyRef}>
          <LightCopyIconButton copyText={internalText} />
        </StyledLightIconButtonContainer>
      )}
    </StyledTextAreaContainer>
  );
};
