import { createState } from '@ui/utilities/state/utils/createState';

export const commandMenuViewableRecordNameSingularState = createState<
  string | null
>({
  key: 'command-menu/viewable-record-name-singular',
  defaultValue: null,
});
