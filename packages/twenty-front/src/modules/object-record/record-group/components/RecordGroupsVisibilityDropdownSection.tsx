import {
  DropResult,
  OnDragEndResponder,
  ResponderProvided,
} from '@hello-pangea/dnd';
import { useRef } from 'react';

import { RecordGroupMenuItemDraggable } from '@/object-record/record-group/components/RecordGroupMenuItemDraggable';
import {
  RecordGroupDefinition,
  RecordGroupDefinitionType,
} from '@/object-record/record-group/types/RecordGroupDefinition';
import { DraggableItem } from '@/ui/layout/draggable-list/components/DraggableItem';
import { DraggableList } from '@/ui/layout/draggable-list/components/DraggableList';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { StyledDropdownMenuSubheader } from '@/ui/layout/dropdown/components/StyledDropdownMenuSubheader';

type RecordGroupsVisibilityDropdownSectionProps = {
  recordGroups: RecordGroupDefinition[];
  isDraggable: boolean;
  onDragEnd?: OnDragEndResponder;
  onVisibilityChange: (viewGroup: RecordGroupDefinition) => void;
  title: string;
  showSubheader?: boolean;
  showDragGrip: boolean;
};

export const RecordGroupsVisibilityDropdownSection = ({
  recordGroups,
  isDraggable,
  onDragEnd,
  onVisibilityChange,
  title,
  showSubheader = true,
  showDragGrip,
}: RecordGroupsVisibilityDropdownSectionProps) => {
  const handleOnDrag = (result: DropResult, provided: ResponderProvided) => {
    onDragEnd?.(result, provided);
  };

  const noValueRecordGroups =
    recordGroups.filter(
      (recordGroup) => recordGroup.type === RecordGroupDefinitionType.NoValue,
    ) ?? [];

  const recordGroupsWithoutNoValueGroups = recordGroups.filter(
    (recordGroup) => recordGroup.type !== RecordGroupDefinitionType.NoValue,
  );

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      {showSubheader && (
        <StyledDropdownMenuSubheader>{title}</StyledDropdownMenuSubheader>
      )}
      <DropdownMenuItemsContainer>
        {!!recordGroups.length && (
          <>
            {!isDraggable ? (
              recordGroupsWithoutNoValueGroups.map((recordGroup) => (
                <RecordGroupMenuItemDraggable
                  recordGroup={recordGroup}
                  onVisibilityChange={onVisibilityChange}
                  showDragGrip={showDragGrip}
                  isDraggable={isDraggable}
                />
              ))
            ) : (
              <DraggableList
                onDragEnd={handleOnDrag}
                draggableItems={
                  <>
                    {recordGroupsWithoutNoValueGroups.map(
                      (recordGroup, index) => (
                        <DraggableItem
                          key={recordGroup.id}
                          draggableId={recordGroup.id}
                          index={index + 1}
                          itemComponent={
                            <RecordGroupMenuItemDraggable
                              recordGroup={recordGroup}
                              onVisibilityChange={onVisibilityChange}
                              showDragGrip={showDragGrip}
                              isDraggable={isDraggable}
                            />
                          }
                        />
                      ),
                    )}
                  </>
                }
              />
            )}
            {noValueRecordGroups.map((recordGroup) => (
              <RecordGroupMenuItemDraggable
                recordGroup={recordGroup}
                onVisibilityChange={onVisibilityChange}
              />
            ))}
          </>
        )}
      </DropdownMenuItemsContainer>
    </div>
  );
};
