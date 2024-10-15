import { useLastVisitedView } from '@/navigation/hooks/useLastVisitedView';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerAnimatedCollapseWrapper } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerAnimatedCollapseWrapper';
import { NavigationDrawerSubItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSubItem';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { getNavigationSubItemState } from '@/ui/navigation/navigation-drawer/utils/getNavigationSubItemState';
import { View } from '@/views/types/View';
import { getObjectMetadataItemViews } from '@/views/utils/getObjectMetadataItemViews';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useIcons } from 'twenty-ui';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { NavigationDrawerItemsCollapsedContainer } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItemsCollapsedContainer';
const ORDERED_STANDARD_OBJECTS = [
  'person',
  'company',
  'opportunity',
  'task',
  'note',
];

export const NavigationDrawerSectionForObjectMetadataItems = ({
  sectionTitle,
  isRemote,
  views,
  objectMetadataItems,
}: {
  sectionTitle: string;
  isRemote: boolean;
  views: View[];
  objectMetadataItems: ObjectMetadataItem[];
}) => {
  const { toggleNavigationSection, isNavigationSectionOpenState } =
    useNavigationSection('Objects' + (isRemote ? 'Remote' : 'Workspace'));
  const isNavigationSectionOpen = useRecoilValue(isNavigationSectionOpenState);

  const { getIcon } = useIcons();
  const currentPath = useLocation().pathname;
  const { getLastVisitedViewIdFromObjectMetadataItemId } = useLastVisitedView();

  const renderObjectMetadataItems = () => {
    return [
      ...objectMetadataItems
        .filter((item) => ORDERED_STANDARD_OBJECTS.includes(item.nameSingular))
        .sort((objectMetadataItemA, objectMetadataItemB) => {
          const indexA = ORDERED_STANDARD_OBJECTS.indexOf(
            objectMetadataItemA.nameSingular,
          );
          const indexB = ORDERED_STANDARD_OBJECTS.indexOf(
            objectMetadataItemB.nameSingular,
          );
          if (indexA === -1 || indexB === -1) {
            return objectMetadataItemA.nameSingular.localeCompare(
              objectMetadataItemB.nameSingular,
            );
          }
          return indexA - indexB;
        }),
      ...objectMetadataItems
        .filter((item) => !ORDERED_STANDARD_OBJECTS.includes(item.nameSingular))
        .sort((objectMetadataItemA, objectMetadataItemB) => {
          return new Date(objectMetadataItemA.createdAt) <
            new Date(objectMetadataItemB.createdAt)
            ? 1
            : -1;
        }),
    ].map((objectMetadataItem) => {
      const objectMetadataViews = getObjectMetadataItemViews(
        objectMetadataItem.id,
        views,
      );
      const lastVisitedViewId = getLastVisitedViewIdFromObjectMetadataItemId(
        objectMetadataItem.id,
      );
      const viewId = lastVisitedViewId ?? objectMetadataViews[0]?.id;

      const navigationPath = `/objects/${objectMetadataItem.namePlural}${
        viewId ? `?view=${viewId}` : ''
      }`;

      const isActive =
        currentPath === `/objects/${objectMetadataItem.namePlural}`;
      const shouldSubItemsBeDisplayed =
        isActive && objectMetadataViews.length > 1;

      const sortedObjectMetadataViews = [...objectMetadataViews].sort(
        (viewA, viewB) =>
          viewA.key === 'INDEX' ? -1 : viewA.position - viewB.position,
      );

      const selectedSubItemIndex = sortedObjectMetadataViews.findIndex(
        (view) => viewId === view.id,
      );

      const subItemArrayLength = sortedObjectMetadataViews.length;

      return (
        <NavigationDrawerItemsCollapsedContainer
          isGroup={shouldSubItemsBeDisplayed}
        >
          <NavigationDrawerItem
            key={objectMetadataItem.id}
            label={objectMetadataItem.labelPlural}
            to={navigationPath}
            Icon={getIcon(objectMetadataItem.icon)}
            active={isActive}
          />
          {shouldSubItemsBeDisplayed &&
            sortedObjectMetadataViews.map((view, index) => (
              <NavigationDrawerSubItem
                label={view.name}
                to={`/objects/${objectMetadataItem.namePlural}?view=${view.id}`}
                active={viewId === view.id}
                subItemState={getNavigationSubItemState({
                  index,
                  arrayLength: subItemArrayLength,
                  selectedIndex: selectedSubItemIndex,
                })}
                Icon={getIcon(view.icon)}
                key={view.id}
              />
            ))}
        </NavigationDrawerItemsCollapsedContainer>
      );
    });
  };

  return (
    objectMetadataItems.length > 0 && (
      <NavigationDrawerSection>
        <NavigationDrawerAnimatedCollapseWrapper>
          <NavigationDrawerSectionTitle
            label={sectionTitle}
            onClick={() => toggleNavigationSection()}
          />
        </NavigationDrawerAnimatedCollapseWrapper>
        {isNavigationSectionOpen && renderObjectMetadataItems()}
      </NavigationDrawerSection>
    )
  );
};
