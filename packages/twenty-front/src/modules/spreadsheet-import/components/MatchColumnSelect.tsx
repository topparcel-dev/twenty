import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from '@floating-ui/react';
import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AppTooltip, MenuItem, MenuItemSelect, SelectOption } from 'twenty-ui';
import { ReadonlyDeep } from 'type-fest';
import { useDebouncedCallback } from 'use-debounce';

import { DropdownMenu } from '@/ui/layout/dropdown/components/DropdownMenu';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { DropdownMenuSearchInput } from '@/ui/layout/dropdown/components/DropdownMenuSearchInput';
import { DropdownMenuSeparator } from '@/ui/layout/dropdown/components/DropdownMenuSeparator';
import { OverlayContainer } from '@/ui/layout/overlay/components/OverlayContainer';
import { useListenClickOutside } from '@/ui/utilities/pointer-event/hooks/useListenClickOutside';
import { useLingui } from '@lingui/react/macro';
import { v4 as uuidV4 } from 'uuid';
import { useUpdateEffect } from '~/hooks/useUpdateEffect';

const StyledFloatingDropdown = styled.div`
  z-index: ${({ theme }) => theme.lastLayerZIndex};
`;

interface MatchColumnSelectProps {
  onChange: (value: ReadonlyDeep<SelectOption> | null) => void;
  value?: ReadonlyDeep<SelectOption>;
  options: readonly ReadonlyDeep<SelectOption>[];
  placeholder?: string;
  name?: string;
}

export const MatchColumnSelect = ({
  onChange,
  value,
  options: initialOptions,
  placeholder,
}: MatchColumnSelectProps) => {
  const theme = useTheme();

  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [options, setOptions] = useState(initialOptions);

  const { refs, floatingStyles } = useFloating({
    strategy: 'absolute',
    middleware: [
      offset(() => {
        return parseInt(theme.spacing(2), 10);
      }),
      flip(),
      size(),
    ],
    whileElementsMounted: autoUpdate,
    open: isOpen,
    placement: 'bottom-start',
  });

  const handleSearchFilterChange = useCallback(
    (text: string) => {
      setOptions(
        initialOptions.filter((option) =>
          option.label.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    },
    [initialOptions],
  );

  const debouncedHandleSearchFilter = useDebouncedCallback(
    handleSearchFilterChange,
    100,
    {
      leading: true,
    },
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setSearchFilter(value);
    debouncedHandleSearchFilter(value);
  };

  const handleDropdownItemClick = () => {
    setIsOpen(true);
  };

  const handleChange = (option: ReadonlyDeep<SelectOption>) => {
    onChange(option);
    setIsOpen(false);
  };

  useListenClickOutside({
    refs: [dropdownContainerRef],
    callback: () => {
      setIsOpen(false);
    },
    listenerId: 'match-column-select',
  });

  useUpdateEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);

  const { t } = useLingui();

  return (
    <>
      <div ref={refs.setReference}>
        <MenuItem
          LeftIcon={value?.Icon}
          onClick={handleDropdownItemClick}
          text={value?.label ?? placeholder ?? ''}
          accent={value?.label ? 'default' : 'placeholder'}
        />
      </div>
      {isOpen &&
        createPortal(
          <StyledFloatingDropdown ref={refs.setFloating} style={floatingStyles}>
            <OverlayContainer>
              <DropdownMenu
                data-select-disable
                ref={dropdownContainerRef}
                // width={refs.domReference.current?.clientWidth}
              >
                <DropdownMenuSearchInput
                  value={searchFilter}
                  onChange={handleFilterChange}
                  autoFocus
                />
                <DropdownMenuSeparator />
                <DropdownMenuItemsContainer hasMaxHeight>
                  {options?.map((option) => {
                    const id = `${uuidV4()}-${option.value}`;
                    return (
                      <React.Fragment key={id}>
                        <div id={id}>
                          <MenuItemSelect
                            selected={value?.label === option.label}
                            onClick={() => handleChange(option)}
                            disabled={
                              option.disabled && value?.value !== option.value
                            }
                            LeftIcon={option?.Icon}
                            text={option.label}
                          />
                        </div>
                        {option.disabled &&
                          value?.value !== option.value &&
                          createPortal(
                            <AppTooltip
                              key={id}
                              anchorSelect={`#${id}`}
                              content={t`You are already importing this column.`}
                              place="right"
                              offset={-20}
                            />,
                            document.body,
                          )}
                      </React.Fragment>
                    );
                  })}
                  {options?.length === 0 && (
                    <MenuItem key="No results" text={t`No results`} />
                  )}
                </DropdownMenuItemsContainer>
              </DropdownMenu>
            </OverlayContainer>
          </StyledFloatingDropdown>,
          document.body,
        )}
    </>
  );
};
