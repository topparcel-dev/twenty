import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { BASE_RECORD_LAYOUT } from '@/object-record/record-show/constants/BaseRecordLayout';
import { CardType } from '@/object-record/record-show/types/CardType';
import { RecordLayout } from '@/object-record/record-show/types/RecordLayout';
import { SingleTabProps } from '@/ui/layout/tab/components/TabList';
import { RecordLayoutTab } from '@/ui/layout/tab/types/RecordLayoutTab';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';
import { useRecoilValue } from 'recoil';
import {
  IconCalendarEvent,
  IconMail,
  IconNotes,
  IconPrinter,
  IconSettings,
} from 'twenty-ui';
import { FeatureFlag, FieldMetadataType } from '~/generated-metadata/graphql';

export const useRecordShowContainerTabs = (
  loading: boolean,
  targetObjectNameSingular: CoreObjectNameSingular,
  isInRightDrawer: boolean,
  objectMetadataItem: ObjectMetadataItem,
): SingleTabProps[] => {
  const isMobile = useIsMobile();
  const objectMetadataItems = useRecoilValue(objectMetadataItemsState);

  const currentWorkspace = useRecoilValue(currentWorkspaceState);

  // Object-specific layouts that override or extend the base layout
  const OBJECT_SPECIFIC_LAYOUTS: Partial<
    Record<CoreObjectNameSingular, RecordLayout>
  > = {
    [CoreObjectNameSingular.Note]: {
      richText: {
        title: 'Note',
        position: 0,
        Icon: IconNotes,
        cards: [{ type: CardType.RichTextCard }],
        hide: {
          ifMobile: false,
          ifDesktop: false,
          ifInRightDrawer: false,
          ifFeaturesDisabled: [],
          ifRequiredObjectsInactive: [],
          ifRelationsMissing: [],
        },
      },
      tasks: null,
      notes: null,
    },
    [CoreObjectNameSingular.Task]: {
      richText: {
        title: 'Note',
        position: 0,
        Icon: IconNotes,
        cards: [{ type: CardType.RichTextCard }],
        hide: {
          ifMobile: false,
          ifDesktop: false,
          ifInRightDrawer: false,
          ifFeaturesDisabled: [],
          ifRequiredObjectsInactive: [],
          ifRelationsMissing: [],
        },
      },
      tasks: null,
      notes: null,
    },
    [CoreObjectNameSingular.Company]: {
      emails: {
        title: 'Emails',
        position: 600,
        Icon: IconMail,
        cards: [{ type: CardType.EmailCard }],
        hide: {
          ifMobile: false,
          ifDesktop: false,
          ifInRightDrawer: false,
          ifFeaturesDisabled: [],
          ifRequiredObjectsInactive: [],
          ifRelationsMissing: [],
        },
      },
      calendar: {
        title: 'Calendar',
        position: 700,
        Icon: IconCalendarEvent,
        cards: [{ type: CardType.CalendarCard }],
        hide: {
          ifMobile: false,
          ifDesktop: false,
          ifInRightDrawer: false,
          ifFeaturesDisabled: [],
          ifRequiredObjectsInactive: [],
          ifRelationsMissing: [],
        },
      },
    },
    [CoreObjectNameSingular.Person]: {
      emails: {
        title: 'Emails',
        position: 600,
        Icon: IconMail,
        cards: [{ type: CardType.EmailCard }],
        hide: {
          ifMobile: false,
          ifDesktop: false,
          ifInRightDrawer: false,
          ifFeaturesDisabled: [],
          ifRequiredObjectsInactive: [],
          ifRelationsMissing: [],
        },
      },
      calendar: {
        title: 'Calendar',
        position: 700,
        Icon: IconCalendarEvent,
        cards: [{ type: CardType.CalendarCard }],
        hide: {
          ifMobile: false,
          ifDesktop: false,
          ifInRightDrawer: false,
          ifFeaturesDisabled: [],
          ifRequiredObjectsInactive: [],
          ifRelationsMissing: [],
        },
      },
    },
    [CoreObjectNameSingular.Workflow]: {
      workflow: {
        title: 'Flow',
        position: 0,
        Icon: IconSettings,
        cards: [{ type: CardType.WorkflowCard }],
        hide: {
          ifMobile: false,
          ifDesktop: false,
          ifInRightDrawer: false,
          ifFeaturesDisabled: ['IS_WORKFLOW_ENABLED'],
          ifRequiredObjectsInactive: [],
          ifRelationsMissing: [],
        },
      },
      timeline: null,
    },
    [CoreObjectNameSingular.WorkflowVersion]: {
      workflowVersion: {
        title: 'Flow',
        position: 0,
        Icon: IconSettings,
        cards: [{ type: CardType.WorkflowVersionCard }],
        hide: {
          ifMobile: false,
          ifDesktop: false,
          ifInRightDrawer: false,
          ifFeaturesDisabled: ['IS_WORKFLOW_ENABLED'],
          ifRequiredObjectsInactive: [],
          ifRelationsMissing: [],
        },
      },
      timeline: null,
    },
    [CoreObjectNameSingular.WorkflowRun]: {
      workflowRunOutput: {
        title: 'Output',
        position: 0,
        Icon: IconPrinter,
        cards: [{ type: CardType.WorkflowRunOutputCard }],
        hide: {
          ifMobile: false,
          ifDesktop: false,
          ifInRightDrawer: false,
          ifFeaturesDisabled: ['IS_WORKFLOW_ENABLED'],
          ifRequiredObjectsInactive: [],
          ifRelationsMissing: [],
        },
      },
      workflowRunFlow: {
        title: 'Flow',
        position: 0,
        Icon: IconSettings,
        cards: [{ type: CardType.WorkflowRunCard }],
        hide: {
          ifMobile: false,
          ifDesktop: false,
          ifInRightDrawer: false,
          ifFeaturesDisabled: ['IS_WORKFLOW_ENABLED'],
          ifRequiredObjectsInactive: [],
          ifRelationsMissing: [],
        },
      },
      timeline: null,
    },
  };

  // Merge base layout with object-specific layout
  const tabDefinitions: RecordLayout = {
    ...BASE_RECORD_LAYOUT,
    ...(OBJECT_SPECIFIC_LAYOUTS[targetObjectNameSingular] || {}),
  };

  return Object.entries(tabDefinitions)
    .filter(
      (entry): entry is [string, NonNullable<RecordLayoutTab>] =>
        entry[1] !== null && entry[1] !== undefined,
    )
    .sort(([, a], [, b]) => a.position - b.position)
    .map(([key, { title, Icon, hide, cards }]) => {
      // Special handling for fields tab
      if (key === 'fields') {
        return {
          id: key,
          title,
          Icon,
          cards,
          hide: !(isMobile || isInRightDrawer),
        };
      }

      const baseHide =
        (hide.ifMobile && isMobile) ||
        (hide.ifDesktop && !isMobile) ||
        (hide.ifInRightDrawer && isInRightDrawer);

      const featureNotEnabled =
        hide.ifFeaturesDisabled.length > 0 &&
        !hide.ifFeaturesDisabled.every((flagKey) => {
          return !!currentWorkspace?.featureFlags?.find(
            (flag: FeatureFlag) => flag.key === flagKey && flag.value,
          );
        });

      const requiredObjectsInactive =
        hide.ifRequiredObjectsInactive.length > 0 &&
        !hide.ifRequiredObjectsInactive.every((obj) =>
          objectMetadataItems.some(
            (item) => item.nameSingular === obj && item.isActive,
          ),
        );

      const relationsDontExist =
        hide.ifRelationsMissing.length > 0 &&
        !hide.ifRelationsMissing.every((rel) =>
          objectMetadataItem.fields.some(
            (field) =>
              field.type === FieldMetadataType.Relation &&
              field.name === rel &&
              field.isActive,
          ),
        );

      return {
        id: key,
        title,
        Icon,
        cards,
        hide:
          loading ||
          baseHide ||
          featureNotEnabled ||
          requiredObjectsInactive ||
          relationsDontExist,
      };
    });
};
