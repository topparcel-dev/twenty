import { RightDrawerCalendarEvent } from '@/activities/calendar/right-drawer/components/RightDrawerCalendarEvent';
import { RightDrawerAIChat } from '@/activities/copilot/right-drawer/components/RightDrawerAIChat';
import { RightDrawerEmailThread } from '@/activities/emails/right-drawer/components/RightDrawerEmailThread';
import { CommandMenu } from '@/command-menu/components/CommandMenu';
import { CommandMenuPages } from '@/command-menu/types/CommandMenuPages';

import { RightDrawerRecord } from '@/object-record/record-right-drawer/components/RightDrawerRecord';
import { RightDrawerWorkflowSelectAction } from '@/workflow/workflow-actions/components/RightDrawerWorkflowSelectAction';
import { RightDrawerWorkflowEditStep } from '@/workflow/workflow-step/components/RightDrawerWorkflowEditStep';
import { RightDrawerWorkflowViewStep } from '@/workflow/workflow-step/components/RightDrawerWorkflowViewStep';
import { RightDrawerWorkflowSelectTriggerType } from '@/workflow/workflow-trigger/components/RightDrawerWorkflowSelectTriggerType';

export const COMMAND_MENU_PAGES_CONFIG = new Map<
  CommandMenuPages,
  React.ReactNode
>([
  [CommandMenuPages.Root, <CommandMenu />],
  [CommandMenuPages.ViewRecord, <RightDrawerRecord />],
  [CommandMenuPages.ViewEmailThread, <RightDrawerEmailThread />],
  [CommandMenuPages.ViewCalendarEvent, <RightDrawerCalendarEvent />],
  [CommandMenuPages.Copilot, <RightDrawerAIChat />],
  [
    CommandMenuPages.WorkflowStepSelectTriggerType,
    <RightDrawerWorkflowSelectTriggerType />,
  ],
  [
    CommandMenuPages.WorkflowStepSelectAction,
    <RightDrawerWorkflowSelectAction />,
  ],
  [CommandMenuPages.WorkflowStepEdit, <RightDrawerWorkflowEditStep />],
  [CommandMenuPages.WorkflowStepView, <RightDrawerWorkflowViewStep />],
]);
