import { useRecordIndexContextOrThrow } from '@/object-record/record-index/contexts/RecordIndexContext';
import { useCreateNewTableRecord } from '@/object-record/record-table/hooks/useCreateNewTableRecords';
import { PageAddButton } from '@/ui/layout/page/components/PageAddButton';
import { PageHotkeysEffect } from '@/ui/layout/page/components/PageHotkeysEffect';

export const RecordIndexPageTableAddButtonNoGroup = () => {
  const { recordIndexId } = useRecordIndexContextOrThrow();

  const { createNewTableRecord } = useCreateNewTableRecord(recordIndexId);

  const handleCreateNewTableRecord = () => {
    createNewTableRecord();
  };

  return (
    <>
      <PageHotkeysEffect onAddButtonClick={handleCreateNewTableRecord} />
      <PageAddButton onClick={handleCreateNewTableRecord} />
    </>
  );
};
