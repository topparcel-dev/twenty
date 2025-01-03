import { useCommandMenu } from '@/command-menu/hooks/useCommandMenu';
import { commandMenuPageState } from '@/command-menu/states/commandMenuPageState';
import { commandMenuViewableRecordIdState } from '@/command-menu/states/commandMenuViewableRecordIdState';
import { commandMenuViewableRecordNameSingularState } from '@/command-menu/states/commandMenuviewableRecordNameSingularState';
import { CommandMenuPages } from '@/command-menu/types/CommandMenuPages';
import { useRecoilCallback } from 'recoil';

export const useOpenRecordInCommandMenu = () => {
  const { openCommandMenu } = useCommandMenu();

  const openRecordInCommandMenu = useRecoilCallback(
    ({ set }) => {
      return (recordId: string, objectNameSingular: string) => {
        set(commandMenuPageState, CommandMenuPages.ViewRecord);
        set(commandMenuViewableRecordIdState, recordId);
        set(commandMenuViewableRecordNameSingularState, objectNameSingular);
        openCommandMenu();
      };
    },
    [openCommandMenu],
  );

  return { openRecordInCommandMenu };
};
