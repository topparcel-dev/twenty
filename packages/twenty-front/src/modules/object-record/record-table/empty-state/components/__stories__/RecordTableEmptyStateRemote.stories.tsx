import { Meta, StoryObj } from '@storybook/react';

import { RecordTableComponentInstance } from '@/object-record/record-table/components/RecordTableComponentInstance';
import { RecordTableEmptyStateRemote } from '@/object-record/record-table/empty-state/components/RecordTableEmptyStateRemote';
import { SnackBarProviderScope } from '@/ui/feedback/snack-bar-manager/scopes/SnackBarProviderScope';
import { ComponentDecorator } from 'twenty-ui';
import { MemoryRouterDecorator } from '~/testing/decorators/MemoryRouterDecorator';
import { ObjectMetadataItemsDecorator } from '~/testing/decorators/ObjectMetadataItemsDecorator';
import { RecordTableDecorator } from '~/testing/decorators/RecordTableDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';

const meta: Meta = {
  title: 'Modules/ObjectRecord/RecordTable/RecordTableEmptyStateRemote',
  component: RecordTableEmptyStateRemote,
  decorators: [
    ComponentDecorator,
    MemoryRouterDecorator,
    ObjectMetadataItemsDecorator,
    RecordTableDecorator,
    (Story) => (
      <SnackBarProviderScope snackBarManagerScopeId="snack-bar-manager">
        <RecordTableComponentInstance
          recordTableId="persons"
          onColumnsChange={() => {}}
        >
          <Story />
        </RecordTableComponentInstance>
      </SnackBarProviderScope>
    ),
  ],
  parameters: {
    msw: graphqlMocks,
  },
};

export default meta;
type Story = StoryObj<typeof RecordTableEmptyStateRemote>;

export const Default: Story = {};
