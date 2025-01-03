import { commandMenuViewableRecordIdState } from '@/command-menu/states/commandMenuViewableRecordIdState';
import { commandMenuViewableRecordNameSingularState } from '@/command-menu/states/commandMenuviewableRecordNameSingularState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useRecordShowContainerData } from '@/object-record/record-show/hooks/useRecordShowContainerData';
import { useRecordShowContainerTabs } from '@/object-record/record-show/hooks/useRecordShowContainerTabs';
import { RecordValueSetterEffect } from '@/object-record/record-store/components/RecordValueSetterEffect';
import { RecordFieldValueSelectorContextProvider } from '@/object-record/record-store/contexts/RecordFieldValueSelectorContext';
import { ShowPageSubContainer } from '@/ui/layout/show-page/components/ShowPageSubContainer';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { useIsMobile } from 'twenty-ui';

const StyledRightDrawerRecord = styled.div`
  height: ${({ theme }) =>
    useIsMobile() ? `calc(100% - ${theme.spacing(16)})` : '100%'};
`;

export const CommandMenuShowPage = () => {
  const commandMenuViewableRecordId = useRecoilValue(
    commandMenuViewableRecordIdState,
  );

  const commandMenuViewableRecordNameSingular = useRecoilValue(
    commandMenuViewableRecordNameSingularState,
  );

  if (!commandMenuViewableRecordId) {
    throw new Error('Command menu viewable record id is not defined');
  }

  if (!commandMenuViewableRecordNameSingular) {
    throw new Error(
      'Command menu viewable record name singular is not defined',
    );
  }

  const {
    recordFromStore,
    objectMetadataItem,
    isPrefetchLoading,
    recordLoading,
  } = useRecordShowContainerData({
    objectNameSingular: commandMenuViewableRecordNameSingular,
    objectRecordId: commandMenuViewableRecordId,
  });

  const { layout, tabs } = useRecordShowContainerTabs(
    false,
    commandMenuViewableRecordNameSingular as CoreObjectNameSingular,
    true,
    objectMetadataItem,
  );

  return (
    <StyledRightDrawerRecord>
      <RecordFieldValueSelectorContextProvider>
        <RecordValueSetterEffect recordId={commandMenuViewableRecordId} />
        <ShowPageSubContainer
          tabs={tabs}
          layout={layout}
          targetableObject={{
            id: commandMenuViewableRecordId,
            targetObjectNameSingular: commandMenuViewableRecordNameSingular,
          }}
          isInRightDrawer={true}
          loading={isPrefetchLoading || recordLoading}
          isNewRightDrawerItemLoading={false}
        />
      </RecordFieldValueSelectorContextProvider>
    </StyledRightDrawerRecord>
  );
};
