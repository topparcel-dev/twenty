import { MockedProvider } from '@apollo/client/testing';
import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { useCommandMenu } from '@/command-menu/hooks/useCommandMenu';
import { viewableRecordIdState } from '@/command-menu/states/viewableRecordIdState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <RecoilRoot>
    <MockedProvider addTypename={false}>{children}</MockedProvider>
  </RecoilRoot>
);

describe('useOpenActivityRightDrawer', () => {
  it('works as expected', () => {
    const { result } = renderHook(
      () => {
        const { openRecordInCommandMenu } = useCommandMenu();

        const viewableRecordId = useRecoilValue(viewableRecordIdState);
        return {
          openRecordInCommandMenu,
          viewableRecordId,
        };
      },
      {
        wrapper: Wrapper,
      },
    );

    expect(result.current.viewableRecordId).toBeNull();
    act(() => {
      result.current.openRecordInCommandMenu({
        recordId: '123',
        objectNameSingular: CoreObjectNameSingular.Task,
      });
    });
    expect(result.current.viewableRecordId).toBe('123');
  });
});
