import { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ComponentDecorator } from 'twenty-ui';

import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { getBasePathToShowPage } from '@/object-metadata/utils/getBasePathToShowPage';

import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import {
  RecordFieldValueSelectorContextProvider,
  useSetRecordValue,
} from '@/object-record/record-store/contexts/RecordFieldValueSelectorContext';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { RecordTableComponentInstance } from '@/object-record/record-table/components/RecordTableComponentInstance';
import { RecordTableCellContext } from '@/object-record/record-table/contexts/RecordTableCellContext';
import { RecordTableContext } from '@/object-record/record-table/contexts/RecordTableContext';
import { RecordTableRowContext } from '@/object-record/record-table/contexts/RecordTableRowContext';
import { ChipGeneratorsDecorator } from '~/testing/decorators/ChipGeneratorsDecorator';
import { MemoryRouterDecorator } from '~/testing/decorators/MemoryRouterDecorator';
import { getProfilingStory } from '~/testing/profiling/utils/getProfilingStory';

import { RecordTableCellFieldContextWrapper } from '@/object-record/record-table/record-table-cell/components/RecordTableCellFieldContextWrapper';
import { generatedMockObjectMetadataItems } from '~/testing/mock-data/generatedMockObjectMetadataItems';
import { mockPerformance } from './mock';

const RelationFieldValueSetterEffect = () => {
  const setEntity = useSetRecoilState(
    recordStoreFamilyState(mockPerformance.recordId),
  );

  const setRelationEntity = useSetRecoilState(
    recordStoreFamilyState(mockPerformance.relationRecordId),
  );

  const setRecordValue = useSetRecordValue();

  const [, setObjectMetadataItems] = useRecoilState(objectMetadataItemsState);

  useEffect(() => {
    setEntity(mockPerformance.entityValue);
    setRelationEntity(mockPerformance.relationFieldValue);

    setRecordValue(mockPerformance.entityValue.id, mockPerformance.entityValue);
    setRecordValue(
      mockPerformance.relationFieldValue.id,
      mockPerformance.relationFieldValue,
    );

    setObjectMetadataItems(generatedMockObjectMetadataItems);
  }, [setEntity, setRelationEntity, setRecordValue, setObjectMetadataItems]);

  return null;
};

const meta: Meta = {
  title: 'RecordIndex/Table/RecordTableCell',
  decorators: [
    MemoryRouterDecorator,
    ChipGeneratorsDecorator,
    (Story) => {
      return (
        <RecordFieldValueSelectorContextProvider>
          <RecordTableContext.Provider
            value={{
              viewBarId: mockPerformance.recordId,
              objectMetadataItem: mockPerformance.objectMetadataItem as any,
              onUpsertRecord: () => {},
              onOpenTableCell: () => {},
              onMoveFocus: () => {},
              onCloseTableCell: () => {},
              onMoveSoftFocusToCell: () => {},
              onActionMenuDropdownOpened: () => {},
              onCellMouseEnter: () => {},
              visibleTableColumns: mockPerformance.visibleTableColumns as any,
              objectNameSingular:
                mockPerformance.objectMetadataItem.nameSingular,
              recordTableId: 'recordTableId',
            }}
          >
            <RecordTableComponentInstance
              recordTableId="asd"
              onColumnsChange={() => {}}
            >
              <RecordTableRowContext.Provider
                value={{
                  objectNameSingular:
                    mockPerformance.entityValue.__typename.toLocaleLowerCase(),
                  recordId: mockPerformance.recordId,
                  rowIndex: 0,
                  pathToShowPage:
                    getBasePathToShowPage({
                      objectNameSingular:
                        mockPerformance.entityValue.__typename.toLocaleLowerCase(),
                    }) + mockPerformance.recordId,
                  isSelected: false,
                  isReadOnly: false,
                  isDragging: false,
                  dragHandleProps: null,
                  inView: true,
                  isPendingRow: false,
                }}
              >
                <RecordTableCellContext.Provider
                  value={{
                    columnDefinition: mockPerformance.fieldDefinition,
                    columnIndex: 0,
                    cellPosition: { row: 0, column: 0 },
                    hasSoftFocus: false,
                    isInEditMode: false,
                  }}
                >
                  <FieldContext.Provider
                    value={{
                      recordId: mockPerformance.recordId,
                      basePathToShowPage: '/object-record/',
                      isLabelIdentifier: false,
                      fieldDefinition: {
                        ...mockPerformance.fieldDefinition,
                      },
                      hotkeyScope: 'hotkey-scope',
                    }}
                  >
                    <RelationFieldValueSetterEffect />
                    <table>
                      <tbody>
                        <tr>
                          <Story />
                        </tr>
                      </tbody>
                    </table>
                  </FieldContext.Provider>
                </RecordTableCellContext.Provider>
              </RecordTableRowContext.Provider>
            </RecordTableComponentInstance>
          </RecordTableContext.Provider>
        </RecordFieldValueSelectorContextProvider>
      );
    },
    ComponentDecorator,
  ],
  component: RecordTableCellFieldContextWrapper,
  argTypes: { value: { control: 'date' } },
  args: {},
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

type Story = StoryObj<typeof RecordTableCellFieldContextWrapper>;

export const Default: Story = {};

export const Performance = getProfilingStory({
  componentName: 'RecordTableCell',
  averageThresholdInMs: 0.3,
  numberOfRuns: 50,
  numberOfTestsPerRun: 200,
  warmUpRounds: 20,
});
