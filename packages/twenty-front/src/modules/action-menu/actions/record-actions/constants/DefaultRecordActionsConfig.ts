import { useDeleteMultipleRecordsAction } from '@/action-menu/actions/record-actions/multiple-records/hooks/useDeleteMultipleRecordsAction';
import { useDestroyMultipleRecordsAction } from '@/action-menu/actions/record-actions/multiple-records/hooks/useDestroyMultipleRecordsAction';
import { useExportMultipleRecordsAction } from '@/action-menu/actions/record-actions/multiple-records/hooks/useExportMultipleRecordsAction';
import { useRestoreMultipleRecordsAction } from '@/action-menu/actions/record-actions/multiple-records/hooks/useRestoreMultipleRecordsAction';
import { MultipleRecordsActionKeys } from '@/action-menu/actions/record-actions/multiple-records/types/MultipleRecordsActionKeys';
import { useCreateNewTableRecordNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useCreateNewTableRecordNoSelectionRecordAction';
import { useGoToCompaniesNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useGoToCompaniesNoSelectionRecordAction';
import { useGoToOpportunitiesNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useGoToOpportunitiesNoSelectionRecordAction';
import { useGoToPeopleNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useGoToPeopleNoSelectionRecordAction';
import { useGoToSettingsNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useGoToSettingsNoSelectionRecordAction';
import { useGoToTasksNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useGoToTasksNoSelectionRecordAction';
import { useHideDeletedRecordsNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useHideDeletedRecordsNoSelectionRecordAction';
import { useImportRecordsNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useImportRecordsNoSelectionRecordAction';
import { useSeeDeletedRecordsNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useSeeDeletedRecordsNoSelectionRecordAction';
import { useSeeWorkflowsNoSelectionRecordAction } from '@/action-menu/actions/record-actions/no-selection/hooks/useSeeWorkflowsNoSelectionRecordAction';
import { NoSelectionRecordActionKeys } from '@/action-menu/actions/record-actions/no-selection/types/NoSelectionRecordActionsKeys';
import { useAddToFavoritesSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useAddToFavoritesSingleRecordAction';
import { useDeleteSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useDeleteSingleRecordAction';
import { useDestroySingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useDestroySingleRecordAction';
import { useExportNoteAction } from '@/action-menu/actions/record-actions/single-record/hooks/useExportNoteAction';
import { useNavigateToNextRecordSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useNavigateToNextRecordSingleRecordAction';
import { useNavigateToPreviousRecordSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useNavigateToPreviousRecordSingleRecordAction';
import { useRemoveFromFavoritesSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useRemoveFromFavoritesSingleRecordAction';
import { useRestoreSingleRecordAction } from '@/action-menu/actions/record-actions/single-record/hooks/useRestoreSingleRecordAction';
import { SingleRecordActionKeys } from '@/action-menu/actions/record-actions/single-record/types/SingleRecordActionsKey';
import { ActionViewType } from '@/action-menu/actions/types/ActionViewType';
import { RecordConfigAction } from '@/action-menu/actions/types/RecordConfigAction';
import {
  ActionMenuEntryScope,
  ActionMenuEntryType,
} from '@/action-menu/types/ActionMenuEntry';
import { BACKEND_BATCH_REQUEST_MAX_COUNT } from '@/object-record/constants/BackendBatchRequestMaxCount';
import { msg } from '@lingui/core/macro';
import { isNonEmptyString } from '@sniptt/guards';
import { isDefined } from 'twenty-shared/utils';
import {
  IconBuildingSkyscraper,
  IconCheckbox,
  IconChevronDown,
  IconChevronUp,
  IconEyeOff,
  IconFileExport,
  IconFileImport,
  IconHeart,
  IconHeartOff,
  IconPlus,
  IconRefresh,
  IconRotate2,
  IconSettings,
  IconSettingsAutomation,
  IconTargetArrow,
  IconTrash,
  IconTrashX,
  IconUser,
} from 'twenty-ui/display';

export const DEFAULT_RECORD_ACTIONS_CONFIG: Record<
  | NoSelectionRecordActionKeys
  | SingleRecordActionKeys
  | MultipleRecordsActionKeys,
  RecordConfigAction
> = {
  [NoSelectionRecordActionKeys.CREATE_NEW_RECORD]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.Object,
    key: NoSelectionRecordActionKeys.CREATE_NEW_RECORD,
    label: msg`Create new record`,
    shortLabel: msg`New record`,
    position: 0,
    isPinned: true,
    Icon: IconPlus,
    shouldBeRegistered: ({ hasObjectReadOnlyPermission }) =>
      !hasObjectReadOnlyPermission,
    availableOn: [ActionViewType.INDEX_PAGE_NO_SELECTION],
    useAction: useCreateNewTableRecordNoSelectionRecordAction,
  },
  [SingleRecordActionKeys.EXPORT_NOTE_TO_PDF]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.EXPORT_NOTE_TO_PDF,
    label: msg`Export to PDF`,
    shortLabel: msg`Export`,
    position: 1,
    isPinned: false,
    Icon: IconFileExport,
    shouldBeRegistered: ({ selectedRecord, isNoteOrTask }) =>
      isDefined(isNoteOrTask) &&
      isNoteOrTask &&
      isNonEmptyString(selectedRecord?.bodyV2?.blocknote),
    availableOn: [ActionViewType.SHOW_PAGE],
    useAction: useExportNoteAction,
  },
  [SingleRecordActionKeys.ADD_TO_FAVORITES]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.ADD_TO_FAVORITES,
    label: msg`Add to favorites`,
    shortLabel: msg`Add to favorites`,
    position: 2,
    isPinned: true,
    Icon: IconHeart,
    shouldBeRegistered: ({ selectedRecord, isFavorite }) =>
      !selectedRecord?.isRemote && !isFavorite,
    availableOn: [
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    useAction: useAddToFavoritesSingleRecordAction,
  },
  [SingleRecordActionKeys.REMOVE_FROM_FAVORITES]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.REMOVE_FROM_FAVORITES,
    label: msg`Remove from favorites`,
    shortLabel: msg`Remove from favorites`,
    isPinned: true,
    position: 3,
    Icon: IconHeartOff,
    shouldBeRegistered: ({ selectedRecord, isFavorite }) =>
      isDefined(selectedRecord) &&
      !selectedRecord?.isRemote &&
      isDefined(isFavorite) &&
      isFavorite,
    availableOn: [
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    useAction: useRemoveFromFavoritesSingleRecordAction,
  },
  [SingleRecordActionKeys.EXPORT]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.EXPORT,
    label: msg`Export`,
    shortLabel: msg`Export`,
    position: 4,
    Icon: IconFileExport,
    accent: 'default',
    isPinned: false,
    shouldBeRegistered: ({ selectedRecord }) =>
      isDefined(selectedRecord) && !selectedRecord.isRemote,
    availableOn: [
      ActionViewType.SHOW_PAGE,
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
    ],
    useAction: useExportMultipleRecordsAction,
  },
  [MultipleRecordsActionKeys.EXPORT]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: MultipleRecordsActionKeys.EXPORT,
    label: msg`Export records`,
    shortLabel: msg`Export`,
    position: 5,
    Icon: IconFileExport,
    accent: 'default',
    isPinned: false,
    shouldBeRegistered: () => true,
    availableOn: [ActionViewType.INDEX_PAGE_BULK_SELECTION],
    useAction: useExportMultipleRecordsAction,
  },
  [NoSelectionRecordActionKeys.EXPORT_VIEW]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.Object,
    key: NoSelectionRecordActionKeys.EXPORT_VIEW,
    label: msg`Export view`,
    shortLabel: msg`Export`,
    position: 6,
    Icon: IconFileExport,
    accent: 'default',
    isPinned: false,
    shouldBeRegistered: () => true,
    availableOn: [ActionViewType.INDEX_PAGE_NO_SELECTION],
    useAction: useExportMultipleRecordsAction,
  },
  [SingleRecordActionKeys.DELETE]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.DELETE,
    label: msg`Delete`,
    shortLabel: msg`Delete`,
    position: 7,
    Icon: IconTrash,
    accent: 'default',
    isPinned: true,
    shouldBeRegistered: ({ selectedRecord }) =>
      isDefined(selectedRecord) && !selectedRecord.isRemote,
    availableOn: [
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    useAction: useDeleteSingleRecordAction,
  },
  [MultipleRecordsActionKeys.DELETE]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: MultipleRecordsActionKeys.DELETE,
    label: msg`Delete records`,
    shortLabel: msg`Delete`,
    position: 8,
    Icon: IconTrash,
    accent: 'default',
    isPinned: true,
    shouldBeRegistered: ({
      hasObjectReadOnlyPermission,
      isRemote,
      isSoftDeleteFilterActive,
      numberOfSelectedRecords,
    }) =>
      !hasObjectReadOnlyPermission &&
      !isRemote &&
      !isSoftDeleteFilterActive &&
      isDefined(numberOfSelectedRecords) &&
      numberOfSelectedRecords < BACKEND_BATCH_REQUEST_MAX_COUNT,
    availableOn: [ActionViewType.INDEX_PAGE_BULK_SELECTION],
    useAction: useDeleteMultipleRecordsAction,
  },
  [NoSelectionRecordActionKeys.SEE_DELETED_RECORDS]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.Object,
    key: NoSelectionRecordActionKeys.SEE_DELETED_RECORDS,
    label: msg`See deleted records`,
    shortLabel: msg`Deleted records`,
    position: 9,
    Icon: IconRotate2,
    accent: 'default',
    isPinned: false,
    shouldBeRegistered: ({ isSoftDeleteFilterActive }) =>
      !isSoftDeleteFilterActive,
    availableOn: [ActionViewType.INDEX_PAGE_NO_SELECTION],
    useAction: useSeeDeletedRecordsNoSelectionRecordAction,
  },
  [NoSelectionRecordActionKeys.HIDE_DELETED_RECORDS]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.Object,
    key: NoSelectionRecordActionKeys.HIDE_DELETED_RECORDS,
    label: msg`Hide deleted records`,
    shortLabel: msg`Hide deleted`,
    position: 10,
    Icon: IconEyeOff,
    accent: 'default',
    isPinned: false,
    shouldBeRegistered: ({ isSoftDeleteFilterActive }) =>
      isDefined(isSoftDeleteFilterActive) && isSoftDeleteFilterActive,
    availableOn: [ActionViewType.INDEX_PAGE_NO_SELECTION],
    useAction: useHideDeletedRecordsNoSelectionRecordAction,
  },
  [NoSelectionRecordActionKeys.IMPORT_RECORDS]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.Object,
    key: NoSelectionRecordActionKeys.IMPORT_RECORDS,
    label: msg`Import records`,
    shortLabel: msg`Import`,
    position: 11,
    Icon: IconFileImport,
    accent: 'default',
    isPinned: false,
    shouldBeRegistered: () => true,
    availableOn: [ActionViewType.INDEX_PAGE_NO_SELECTION],
    useAction: useImportRecordsNoSelectionRecordAction,
  },
  [SingleRecordActionKeys.DESTROY]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.DESTROY,
    label: msg`Permanently destroy record`,
    shortLabel: msg`Destroy`,
    position: 12,
    Icon: IconTrashX,
    accent: 'danger',
    isPinned: true,
    shouldBeRegistered: ({
      selectedRecord,
      hasObjectReadOnlyPermission,
      isRemote,
    }) =>
      !hasObjectReadOnlyPermission &&
      !isRemote &&
      isDefined(selectedRecord?.deletedAt),
    availableOn: [
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    useAction: useDestroySingleRecordAction,
  },
  [SingleRecordActionKeys.NAVIGATE_TO_PREVIOUS_RECORD]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.NAVIGATE_TO_PREVIOUS_RECORD,
    label: msg`Navigate to previous record`,
    position: 13,
    isPinned: true,
    Icon: IconChevronUp,
    shouldBeRegistered: ({ isInRightDrawer }) => !isInRightDrawer,
    availableOn: [ActionViewType.SHOW_PAGE],
    useAction: useNavigateToPreviousRecordSingleRecordAction,
  },
  [SingleRecordActionKeys.NAVIGATE_TO_NEXT_RECORD]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.NAVIGATE_TO_NEXT_RECORD,
    label: msg`Navigate to next record`,
    position: 14,
    isPinned: true,
    Icon: IconChevronDown,
    shouldBeRegistered: ({ isInRightDrawer }) => !isInRightDrawer,
    availableOn: [ActionViewType.SHOW_PAGE],
    useAction: useNavigateToNextRecordSingleRecordAction,
  },
  [MultipleRecordsActionKeys.DESTROY]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: MultipleRecordsActionKeys.DESTROY,
    label: msg`Permanently destroy records`,
    shortLabel: msg`Destroy`,
    position: 15,
    Icon: IconTrashX,
    accent: 'danger',
    isPinned: true,
    shouldBeRegistered: ({
      hasObjectReadOnlyPermission,
      isRemote,
      isSoftDeleteFilterActive,
      numberOfSelectedRecords,
    }) =>
      !hasObjectReadOnlyPermission &&
      !isRemote &&
      isDefined(isSoftDeleteFilterActive) &&
      isSoftDeleteFilterActive &&
      isDefined(numberOfSelectedRecords) &&
      numberOfSelectedRecords < BACKEND_BATCH_REQUEST_MAX_COUNT,
    availableOn: [ActionViewType.INDEX_PAGE_BULK_SELECTION],
    useAction: useDestroyMultipleRecordsAction,
  },
  [SingleRecordActionKeys.RESTORE]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: SingleRecordActionKeys.RESTORE,
    label: msg`Restore record`,
    shortLabel: msg`Restore`,
    position: 16,
    Icon: IconRefresh,
    accent: 'default',
    isPinned: true,
    shouldBeRegistered: ({
      selectedRecord,
      hasObjectReadOnlyPermission,
      isRemote,
      isShowPage,
      isSoftDeleteFilterActive,
    }) =>
      !isRemote &&
      isDefined(selectedRecord?.deletedAt) &&
      !hasObjectReadOnlyPermission &&
      ((isDefined(isShowPage) && isShowPage) ||
        (isDefined(isSoftDeleteFilterActive) && isSoftDeleteFilterActive)),
    availableOn: [
      ActionViewType.SHOW_PAGE,
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
    ],
    useAction: useRestoreSingleRecordAction,
  },
  [MultipleRecordsActionKeys.RESTORE]: {
    type: ActionMenuEntryType.Standard,
    scope: ActionMenuEntryScope.RecordSelection,
    key: MultipleRecordsActionKeys.RESTORE,
    label: msg`Restore records`,
    shortLabel: msg`Restore`,
    position: 17,
    Icon: IconRefresh,
    accent: 'default',
    isPinned: true,
    shouldBeRegistered: ({
      hasObjectReadOnlyPermission,
      isRemote,
      isSoftDeleteFilterActive,
      numberOfSelectedRecords,
    }) =>
      !hasObjectReadOnlyPermission &&
      !isRemote &&
      isDefined(isSoftDeleteFilterActive) &&
      isSoftDeleteFilterActive &&
      isDefined(numberOfSelectedRecords) &&
      numberOfSelectedRecords < BACKEND_BATCH_REQUEST_MAX_COUNT,
    availableOn: [ActionViewType.INDEX_PAGE_BULK_SELECTION],
    useAction: useRestoreMultipleRecordsAction,
  },
  [NoSelectionRecordActionKeys.GO_TO_WORKFLOWS]: {
    type: ActionMenuEntryType.Navigation,
    scope: ActionMenuEntryScope.Global,
    key: NoSelectionRecordActionKeys.GO_TO_WORKFLOWS,
    label: msg`Go to workflows`,
    shortLabel: msg`See workflows`,
    position: 18,
    Icon: IconSettingsAutomation,
    accent: 'default',
    isPinned: false,
    shouldBeRegistered: () => true,
    availableOn: [ActionViewType.INDEX_PAGE_NO_SELECTION],
    useAction: useSeeWorkflowsNoSelectionRecordAction,
    hotKeys: ['G', 'W'],
  },
  [NoSelectionRecordActionKeys.GO_TO_PEOPLE]: {
    type: ActionMenuEntryType.Navigation,
    scope: ActionMenuEntryScope.Global,
    key: NoSelectionRecordActionKeys.GO_TO_PEOPLE,
    label: msg`Go to People`,
    shortLabel: msg`People`,
    position: 19,
    Icon: IconUser,
    isPinned: false,
    availableOn: [
      ActionViewType.INDEX_PAGE_NO_SELECTION,
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
      ActionViewType.INDEX_PAGE_BULK_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    shouldBeRegistered: () => true,
    useAction: useGoToPeopleNoSelectionRecordAction,
    hotKeys: ['G', 'P'],
  },
  [NoSelectionRecordActionKeys.GO_TO_COMPANIES]: {
    type: ActionMenuEntryType.Navigation,
    scope: ActionMenuEntryScope.Global,
    key: NoSelectionRecordActionKeys.GO_TO_COMPANIES,
    label: msg`Go to Companies`,
    shortLabel: msg`Companies`,
    position: 20,
    Icon: IconBuildingSkyscraper,
    isPinned: false,
    availableOn: [
      ActionViewType.INDEX_PAGE_NO_SELECTION,
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
      ActionViewType.INDEX_PAGE_BULK_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    shouldBeRegistered: () => true,
    useAction: useGoToCompaniesNoSelectionRecordAction,
    hotKeys: ['G', 'C'],
  },
  [NoSelectionRecordActionKeys.GO_TO_OPPORTUNITIES]: {
    type: ActionMenuEntryType.Navigation,
    scope: ActionMenuEntryScope.Global,
    key: NoSelectionRecordActionKeys.GO_TO_OPPORTUNITIES,
    label: msg`Go to Opportunities`,
    shortLabel: msg`Opportunities`,
    position: 21,
    Icon: IconTargetArrow,
    isPinned: false,
    availableOn: [
      ActionViewType.INDEX_PAGE_NO_SELECTION,
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
      ActionViewType.INDEX_PAGE_BULK_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    shouldBeRegistered: () => true,
    useAction: useGoToOpportunitiesNoSelectionRecordAction,
    hotKeys: ['G', 'O'],
  },
  [NoSelectionRecordActionKeys.GO_TO_SETTINGS]: {
    type: ActionMenuEntryType.Navigation,
    scope: ActionMenuEntryScope.Global,
    key: NoSelectionRecordActionKeys.GO_TO_SETTINGS,
    label: msg`Go to Settings`,
    shortLabel: msg`Settings`,
    position: 22,
    Icon: IconSettings,
    isPinned: false,
    availableOn: [
      ActionViewType.INDEX_PAGE_NO_SELECTION,
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
      ActionViewType.INDEX_PAGE_BULK_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    shouldBeRegistered: () => true,
    useAction: useGoToSettingsNoSelectionRecordAction,
    hotKeys: ['G', 'S'],
  },
  [NoSelectionRecordActionKeys.GO_TO_TASKS]: {
    type: ActionMenuEntryType.Navigation,
    scope: ActionMenuEntryScope.Global,
    key: NoSelectionRecordActionKeys.GO_TO_TASKS,
    label: msg`Go to Tasks`,
    shortLabel: msg`Tasks`,
    position: 23,
    Icon: IconCheckbox,
    isPinned: false,
    availableOn: [
      ActionViewType.INDEX_PAGE_NO_SELECTION,
      ActionViewType.INDEX_PAGE_SINGLE_RECORD_SELECTION,
      ActionViewType.INDEX_PAGE_BULK_SELECTION,
      ActionViewType.SHOW_PAGE,
    ],
    shouldBeRegistered: () => true,
    useAction: useGoToTasksNoSelectionRecordAction,
    hotKeys: ['G', 'T'],
  },
};
