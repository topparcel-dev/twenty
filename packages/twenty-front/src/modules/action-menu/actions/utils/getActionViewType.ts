import { ActionViewType } from '@/action-menu/actions/types/ActionViewType';
import { ContextStoreTargetedRecordsRule } from '@/context-store/states/contextStoreTargetedRecordsRuleComponentState';
import { ContextStoreViewType } from '@/context-store/types/ContextStoreViewType';

export const getActionViewType = (
  contextStoreCurrentViewType: ContextStoreViewType | null,
  contextStoreTargetedRecordsRule: ContextStoreTargetedRecordsRule,
) => {
  if (contextStoreCurrentViewType === null) {
    return null;
  }

  if (contextStoreCurrentViewType === ContextStoreViewType.ShowPage) {
    return ActionViewType.SHOW_PAGE;
  }

  if (
    contextStoreTargetedRecordsRule.mode === 'selection' &&
    contextStoreTargetedRecordsRule.selectedRecordIds.length === 0
  ) {
    return contextStoreCurrentViewType === ContextStoreViewType.Kanban
      ? ActionViewType.RECORD_BOARD_NO_SELECTION
      : ActionViewType.RECORD_TABLE_NO_SELECTION;
  }

  if (
    contextStoreTargetedRecordsRule.mode === 'selection' &&
    contextStoreTargetedRecordsRule.selectedRecordIds.length === 1
  ) {
    return contextStoreCurrentViewType === ContextStoreViewType.Kanban
      ? ActionViewType.RECORD_BOARD_SINGLE_RECORD_SELECTION
      : ActionViewType.RECORD_TABLE_SINGLE_RECORD_SELECTION;
  }

  return contextStoreCurrentViewType === ContextStoreViewType.Kanban
    ? ActionViewType.RECORD_BOARD_BULK_SELECTION
    : ActionViewType.RECORD_TABLE_BULK_SELECTION;
};
