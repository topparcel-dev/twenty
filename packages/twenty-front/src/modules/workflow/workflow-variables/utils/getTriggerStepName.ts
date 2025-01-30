import {
  WorkflowDatabaseEventTrigger,
  WorkflowTrigger,
} from '@/workflow/types/Workflow';
import { assertUnreachable } from '@/workflow/utils/assertUnreachable';
import { getTriggerDefaultLabel } from '@/workflow/workflow-trigger/utils/getTriggerLabel';
import { capitalize } from 'twenty-shared';
import { isDefined } from 'twenty-ui';

export const getTriggerStepName = (trigger: WorkflowTrigger): string => {
  switch (trigger.type) {
    case 'DATABASE_EVENT':
      return getDatabaseEventTriggerStepName(trigger);
    case 'MANUAL':
      if (!isDefined(trigger.settings.objectType)) {
        return 'Manual trigger';
      }

      return 'Manual trigger for ' + capitalize(trigger.settings.objectType);
  }

  return assertUnreachable(trigger);
};

const getDatabaseEventTriggerStepName = (
  trigger: WorkflowDatabaseEventTrigger,
): string => {
  const [, action] = trigger.settings.eventName.split('.');
  const defaultLabel = getTriggerDefaultLabel({
    type: 'DATABASE_EVENT',
    eventName: action,
  });

  return defaultLabel ?? '';
};
