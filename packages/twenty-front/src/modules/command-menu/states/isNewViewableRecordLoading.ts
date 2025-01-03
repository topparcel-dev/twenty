import { createState } from '@ui/utilities/state/utils/createState';

export const isNewViewableRecordLoadingState = createState<boolean>({
  key: 'command-menu/is-new-viewable-record-loading',
  defaultValue: false,
});
