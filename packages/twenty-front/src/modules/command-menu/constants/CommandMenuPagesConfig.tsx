import { CommandMenu } from '@/command-menu/components/CommandMenu';
import { CommandMenuShowPage } from '@/command-menu/components/CommandMenuShowPage';
import { CommandMenuPages } from '@/command-menu/types/CommandMenuPages';

export const COMMAND_MENU_PAGES_CONFIG = new Map<
  CommandMenuPages,
  React.ReactNode
>([
  [CommandMenuPages.Root, <CommandMenu />],
  [CommandMenuPages.ViewRecord, <CommandMenuShowPage />],
]);
