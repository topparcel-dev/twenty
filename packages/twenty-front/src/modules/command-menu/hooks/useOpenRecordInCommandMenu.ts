import { useCommandMenu } from '@/command-menu/hooks/useCommandMenu';
import { commandMenuPageState } from '@/command-menu/states/commandMenuPageState';
import { viewableRecordIdState } from '@/command-menu/states/viewableRecordIdState';
import { viewableRecordNameSingularState } from '@/command-menu/states/viewableRecordNameSingularState';
import { CommandMenuPages } from '@/command-menu/types/CommandMenuPages';
import { useRecoilCallback } from 'recoil';

export const useOpenRecordInCommandMenu = () => {
  const { openCommandMenu } = useCommandMenu();

  const openRecordInCommandMenu = useRecoilCallback(
    ({ set }) => {
      return (recordId: string, objectNameSingular: string) => {
        set(commandMenuPageState, CommandMenuPages.ViewRecord);
        set(viewableRecordIdState, recordId);
        set(viewableRecordNameSingularState, objectNameSingular);
        openCommandMenu();
      };
    },
    [openCommandMenu],
  );

  return { openRecordInCommandMenu };
};
