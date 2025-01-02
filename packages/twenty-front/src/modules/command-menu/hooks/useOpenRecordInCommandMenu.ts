import { CommandMenuPages } from '@/command-menu/components/CommandMenuPages';
import { useCommandMenu } from '@/command-menu/hooks/useCommandMenu';
import { commandMenuPageState } from '@/command-menu/states/commandMenuPageState';
import { commandMenuViewableRecordIdState } from '@/command-menu/states/commandMenuViewableRecordIdState';
import { useRecoilCallback } from 'recoil';

export const useOpenRecordInCommandMenu = () => {
  const { openCommandMenu } = useCommandMenu();

  const openRecordInCommandMenu = useRecoilCallback(
    ({ set }) => {
      return (recordId: string) => {
        openCommandMenu();
        set(commandMenuPageState, CommandMenuPages.ViewRecord);
        set(commandMenuViewableRecordIdState, recordId);
      };
    },
    [openCommandMenu],
  );

  return { openRecordInCommandMenu };
};
