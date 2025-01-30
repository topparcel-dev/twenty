import { IconComponent } from 'twenty-ui';
export enum CommandType {
  Navigate = 'Navigate',
  Create = 'Create',
  StandardAction = 'StandardAction',
  WorkflowRun = 'WorkflowRun',
}

export enum CommandScope {
  Global = 'Global',
  RecordSelection = 'RecordSelection',
  Object = 'Object',
}

export type Command = {
  id: string;
  to?: string;
  label: string;
  type?: CommandType;
  scope?: CommandScope;
  Icon?: IconComponent;
  hotKeys?: string[];
  onCommandClick?: () => void;
  shouldCloseCommandMenuOnClick?: boolean;
};
