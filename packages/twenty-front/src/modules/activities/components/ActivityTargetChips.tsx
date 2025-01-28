import styled from '@emotion/styled';

import { useActivityTargetObjectRecords } from '@/activities/hooks/useActivityTargetObjectRecords';
import { Task } from '@/activities/types/Task';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { RecordChip } from '@/object-record/components/RecordChip';
import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';
import { ExpandableList } from '@/ui/layout/expandable-list/components/ExpandableList';

import { Note } from '@/activities/types/Note';
import { isNonEmptyString } from '@sniptt/guards';

type ActivityTargetChipsProps = {
  activityId: string;
  activityObjectNameSingular: CoreObjectNameSingular;
  maxWidth?: number;
};

const StyledContainer = styled.div<{ maxWidth?: number }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
  max-width: ${({ maxWidth }) => `${maxWidth}px` || 'none'};
`;

export const ActivityTargetChips = ({
  activityId,
  activityObjectNameSingular,
  maxWidth,
}: ActivityTargetChipsProps) => {
  const { record: activity } = useFindOneRecord<Note | Task>({
    objectNameSingular: activityObjectNameSingular,
    objectRecordId: activityId,
    skip: !isNonEmptyString(activityId),
  });

  const { activityTargetObjectRecords } =
    useActivityTargetObjectRecords(activity);
  console.log({
    activityTargetObjectRecords,
    activity,
    activityObjectNameSingular,
    activityId,
  });

  return (
    <StyledContainer maxWidth={maxWidth}>
      <ExpandableList isChipCountDisplayed>
        {activityTargetObjectRecords.map(
          (activityTargetObjectRecord, index) => (
            <RecordChip
              key={index}
              record={activityTargetObjectRecord.targetObject}
              objectNameSingular={
                activityTargetObjectRecord.targetObjectMetadataItem.nameSingular
              }
            />
          ),
        )}
      </ExpandableList>
    </StyledContainer>
  );
};
