import React, { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import { useClickOustideListenerStates } from '@/ui/utilities/pointer-event/hooks/useClickOustideListenerStates';

export enum ClickOutsideMode {
  comparePixels = 'comparePixels',
  compareHTMLRef = 'compareHTMLRef',
}

export type ClickOutsideListenerProps<T extends Element> = {
  refs: Array<React.RefObject<T>>;
  excludeClassNames?: string[];
  callback: (event: MouseEvent | TouchEvent) => void;
  mode?: ClickOutsideMode;
  listenerId: string;
  enabled?: boolean;
};

export const useListenClickOutsideV2 = <T extends Element>({
  refs,
  excludeClassNames,
  callback,
  mode = ClickOutsideMode.compareHTMLRef,
  listenerId,
  enabled = true,
}: ClickOutsideListenerProps<T>) => {
  const {
    getClickOutsideListenerIsMouseDownInsideState,
    getClickOutsideListenerIsActivatedState,
    getClickOutsideListenerMouseDownHappenedState,
  } = useClickOustideListenerStates(listenerId);

  const handleMouseDown = useRecoilCallback(
    ({ snapshot, set }) =>
      (event: MouseEvent | TouchEvent) => {
        const clickOutsideListenerIsActivated = snapshot
          .getLoadable(getClickOutsideListenerIsActivatedState)
          .getValue();

        set(getClickOutsideListenerMouseDownHappenedState, true);

        const isListening = clickOutsideListenerIsActivated && enabled;

        if (!isListening) {
          return;
        }

        if (mode === ClickOutsideMode.compareHTMLRef) {
          const clickedOnAtLeastOneRef = refs
            .filter((ref) => !!ref.current)
            .some((ref) => ref.current?.contains(event.target as Node));

          set(
            getClickOutsideListenerIsMouseDownInsideState,
            clickedOnAtLeastOneRef,
          );
        }

        if (mode === ClickOutsideMode.comparePixels) {
          const clickedOnAtLeastOneRef = refs
            .filter((ref) => !!ref.current)
            .some((ref) => {
              if (!ref.current) {
                return false;
              }

              const { x, y, width, height } =
                ref.current.getBoundingClientRect();

              const clientX =
                'clientX' in event
                  ? event.clientX
                  : event.changedTouches[0].clientX;
              const clientY =
                'clientY' in event
                  ? event.clientY
                  : event.changedTouches[0].clientY;

              if (
                clientX < x ||
                clientX > x + width ||
                clientY < y ||
                clientY > y + height
              ) {
                return false;
              }
              return true;
            });

          set(
            getClickOutsideListenerIsMouseDownInsideState,
            clickedOnAtLeastOneRef,
          );
        }
      },
    [
      getClickOutsideListenerIsActivatedState,
      enabled,
      mode,
      refs,
      getClickOutsideListenerIsMouseDownInsideState,
      getClickOutsideListenerMouseDownHappenedState,
    ],
  );

  const handleClickOutside = useRecoilCallback(
    ({ snapshot }) =>
      (event: MouseEvent | TouchEvent) => {
        const clickOutsideListenerIsActivated = snapshot
          .getLoadable(getClickOutsideListenerIsActivatedState)
          .getValue();

        const isListening = clickOutsideListenerIsActivated && enabled;

        const isMouseDownInside = snapshot
          .getLoadable(getClickOutsideListenerIsMouseDownInsideState)
          .getValue();

        const hasMouseDownHappened = snapshot
          .getLoadable(getClickOutsideListenerMouseDownHappenedState)
          .getValue();

        if (mode === ClickOutsideMode.compareHTMLRef) {
          const clickedElement = event.target as HTMLElement;
          let isClickedOnExcluded = false;
          let currentElement: HTMLElement | null = clickedElement;

          while (currentElement) {
            const currentClassList = currentElement.classList;

            isClickedOnExcluded =
              excludeClassNames?.some((className) =>
                currentClassList.contains(className),
              ) ?? false;

            if (isClickedOnExcluded) {
              break;
            }

            currentElement = currentElement.parentElement;
          }

          const clickedOnAtLeastOneRef = refs
            .filter((ref) => !!ref.current)
            .some((ref) => ref.current?.contains(event.target as Node));

          if (
            isListening &&
            hasMouseDownHappened &&
            !clickedOnAtLeastOneRef &&
            !isMouseDownInside &&
            !isClickedOnExcluded
          ) {
            callback(event);
          }
        }

        if (mode === ClickOutsideMode.comparePixels) {
          const clickedOnAtLeastOneRef = refs
            .filter((ref) => !!ref.current)
            .some((ref) => {
              if (!ref.current) {
                return false;
              }

              const { x, y, width, height } =
                ref.current.getBoundingClientRect();

              const clientX =
                'clientX' in event
                  ? event.clientX
                  : event.changedTouches[0].clientX;
              const clientY =
                'clientY' in event
                  ? event.clientY
                  : event.changedTouches[0].clientY;

              if (
                clientX < x ||
                clientX > x + width ||
                clientY < y ||
                clientY > y + height
              ) {
                return false;
              }
              return true;
            });

          if (
            !clickedOnAtLeastOneRef &&
            !isMouseDownInside &&
            isListening &&
            hasMouseDownHappened
          ) {
            callback(event);
          }
        }
      },
    [
      getClickOutsideListenerIsActivatedState,
      enabled,
      getClickOutsideListenerIsMouseDownInsideState,
      getClickOutsideListenerMouseDownHappenedState,
      mode,
      refs,
      excludeClassNames,
      callback,
    ],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown, {
      capture: true,
    });
    document.addEventListener('click', handleClickOutside, { capture: true });
    document.addEventListener('touchstart', handleMouseDown, {
      capture: true,
    });
    document.addEventListener('touchend', handleClickOutside, {
      capture: true,
    });

    return () => {
      document.removeEventListener('mousedown', handleMouseDown, {
        capture: true,
      });
      document.removeEventListener('click', handleClickOutside, {
        capture: true,
      });
      document.removeEventListener('touchstart', handleMouseDown, {
        capture: true,
      });
      document.removeEventListener('touchend', handleClickOutside, {
        capture: true,
      });
    };
  }, [refs, callback, mode, handleClickOutside, handleMouseDown]);
};
