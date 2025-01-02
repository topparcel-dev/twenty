import { useDeleteMultipleRecordsAction } from '@/action-menu/actions/record-actions/multiple-records/hooks/useDeleteMultipleRecordsAction';
import { useExportMultipleRecordsAction } from '@/action-menu/actions/record-actions/multiple-records/hooks/useExportMultipleRecordsAction';
import { MultipleRecordsActionKeys } from '@/action-menu/actions/record-actions/multiple-records/types/MultipleRecordsActionKeys';
import { useCreateNewRecordNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useCreateNewRecordNoSelectionRecordAction';
import { NoSelectionRecordActionKeys } from '@/action-menu/actions/record-actions/no-selection/types/NoSelectionRecordActionsKey';
import { useAddToFavoritesSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useAddToFavoritesSingleRecordAction';
import { useDeleteSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useDeleteSingleRecordAction';
import { useDestroySingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useDestroySingleRecordAction';
import { useExportNoteAction } from '@/action-menu/actions/record-actions/single-record/hooks/useExportNoteAction';
import { useNavigateToNextRecordSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useNavigateToNextRecordSingleRecordAction';
import { useNavigateToPreviousRecordSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useNavigateToPreviousRecordSingleRecordAction';
import { useRemoveFromFavoritesSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useRemoveFromFavoritesSingleRecordAction';
import { SingleRecordActionKeys } from '@/action-menu/actions/record-actions/single-record/types/SingleRecordActionsKey';
import { ActionHook } from '@/action-menu/actions/types/ActionHook';
import { ActionViewType } from '@/action-menu/actions/types/ActionViewType';
import {
  ActionMenuEntry,
  ActionMenuEntryScope,
  ActionMenuEntryType,
} from '@/action-menu/types/ActionMenuEntry';
import {
  IconChevronDown,
  IconChevronUp,
  IconDatabaseExport,
  IconFileExport,
  IconHeart,
  IconHeartOff,
  IconPlus,
  IconTrash,
  IconTrashX,
} from 'twenty-ui';

export const DEFAULT_ACTIONS_CONFIG_V2: Record<
  string,
  ActionMenuEntry & {
    actionHook: ActionHook;
  }
> = {
  createNewRecord: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.Global,
    key: NoSelectionRecordActionKeys.CREATE_NEW_RECORD,
    label: 'Create new record',
    shortLabel: 'New record',
    position: 0,
    isPinned: true,
    Icon: IconPlus,
    availableOn: [
      ActionViewType.RECORD_TABLE_NO_SELECTION,
      ActionViewType.RECORD_BOARD_NO_SELECTION,
    ],
    actionHook: useCreateNewRecordNoSelectionRecordAction,
  },
  exportNoteToPdf: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.EXPORT_NOTE_TO_PDF,
    label: 'Export to PDF',
    shortLabel: 'Export',
    position: 1,
    isPinned: false,
    Icon: IconFileExport,
    availableOn: [
      ActionViewType.RECORD_TABLE_SINGLE_RECORD_SELECTION,
      ActionViewType.RECORD_BOARD_SINGLE_RECORD_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    actionHook: useExportNoteAction,
  },
  addToFavoritesSingleRecord: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.ADD_TO_FAVORITES,
    label: 'Add to favorites',
    shortLabel: 'Add to favorites',
    position: 2,
    isPinned: true,
    Icon: IconHeart,
    availableOn: [
      ActionViewType.RECORD_TABLE_SINGLE_RECORD_SELECTION,
      ActionViewType.RECORD_BOARD_SINGLE_RECORD_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    actionHook: useAddToFavoritesSingleRecordAction,
  },
  removeFromFavoritesSingleRecord: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.REMOVE_FROM_FAVORITES,
    label: 'Remove from favorites',
    shortLabel: 'Remove from favorites',
    isPinned: true,
    position: 3,
    Icon: IconHeartOff,
    availableOn: [
      ActionViewType.RECORD_TABLE_SINGLE_RECORD_SELECTION,
      ActionViewType.RECORD_BOARD_SINGLE_RECORD_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    actionHook: useRemoveFromFavoritesSingleRecordAction,
  },
  deleteSingleRecord: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.DELETE,
    label: 'Delete record',
    shortLabel: 'Delete',
    position: 4,
    Icon: IconTrash,
    accent: 'danger',
    isPinned: true,
    availableOn: [
      ActionViewType.RECORD_TABLE_SINGLE_RECORD_SELECTION,
      ActionViewType.RECORD_BOARD_SINGLE_RECORD_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    actionHook: useDeleteSingleRecordAction,
  },
  deleteMultipleRecords: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: MultipleRecordsActionKeys.DELETE,
    label: 'Delete records',
    shortLabel: 'Delete',
    position: 5,
    Icon: IconTrash,
    accent: 'danger',
    isPinned: true,
    availableOn: [
      ActionViewType.RECORD_TABLE_BULK_SELECTION,
      ActionViewType.RECORD_BOARD_BULK_SELECTION,
    ],
    actionHook: useDeleteMultipleRecordsAction,
  },
  exportMultipleRecords: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: MultipleRecordsActionKeys.EXPORT,
    label: 'Export records',
    shortLabel: 'Export',
    position: 6,
    Icon: IconDatabaseExport,
    accent: 'default',
    isPinned: false,
    availableOn: [
      ActionViewType.RECORD_TABLE_BULK_SELECTION,
      ActionViewType.RECORD_BOARD_BULK_SELECTION,
    ],
    actionHook: useExportMultipleRecordsAction,
  },
  exportView: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.Global,
    key: NoSelectionRecordActionKeys.EXPORT_VIEW,
    label: 'Export view',
    shortLabel: 'Export',
    position: 7,
    Icon: IconDatabaseExport,
    accent: 'default',
    isPinned: false,
    availableOn: [
      ActionViewType.RECORD_TABLE_NO_SELECTION,
      ActionViewType.RECORD_BOARD_NO_SELECTION,
    ],
    actionHook: useExportMultipleRecordsAction,
  },
  destroySingleRecord: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.DESTROY,
    label: 'Permanently destroy record',
    shortLabel: 'Destroy',
    position: 8,
    Icon: IconTrashX,
    accent: 'danger',
    isPinned: true,
    availableOn: [
      ActionViewType.RECORD_TABLE_SINGLE_RECORD_SELECTION,
      ActionViewType.RECORD_BOARD_SINGLE_RECORD_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    actionHook: useDestroySingleRecordAction,
  },
  navigateToPreviousRecord: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.NAVIGATE_TO_PREVIOUS_RECORD,
    label: 'Navigate to previous record',
    shortLabel: '',
    position: 9,
    isPinned: true,
    Icon: IconChevronUp,
    availableOn: [ActionViewType.SHOW_PAGE],
    actionHook: useNavigateToPreviousRecordSingleRecordAction,
  },
  navigateToNextRecord: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.NAVIGATE_TO_NEXT_RECORD,
    label: 'Navigate to next record',
    shortLabel: '',
    position: 10,
    isPinned: true,
    Icon: IconChevronDown,
    availableOn: [ActionViewType.SHOW_PAGE],
    actionHook: useNavigateToNextRecordSingleRecordAction,
  },
};
