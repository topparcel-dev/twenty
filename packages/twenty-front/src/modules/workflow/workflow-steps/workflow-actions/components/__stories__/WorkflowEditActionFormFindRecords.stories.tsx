import { WorkflowFindRecordsAction } from '@/workflow/types/Workflow';
import { WorkflowEditActionFormFindRecords } from '@/workflow/workflow-steps/workflow-actions/components/WorkflowEditActionFormFindRecords';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { ComponentDecorator, RouterDecorator } from 'twenty-ui';
import { ObjectMetadataItemsDecorator } from '~/testing/decorators/ObjectMetadataItemsDecorator';
import { SnackBarDecorator } from '~/testing/decorators/SnackBarDecorator';
import { WorkflowStepActionDrawerDecorator } from '~/testing/decorators/WorkflowStepActionDrawerDecorator';
import { WorkflowStepDecorator } from '~/testing/decorators/WorkflowStepDecorator';
import { WorkspaceDecorator } from '~/testing/decorators/WorkspaceDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { getWorkflowNodeIdMock } from '~/testing/mock-data/workflow';

const DEFAULT_ACTION = {
  id: getWorkflowNodeIdMock(),
  name: 'Search Records',
  type: 'FIND_RECORDS',
  valid: false,
  settings: {
    input: {
      objectName: 'person',
      limit: 1,
    },
    outputSchema: {},
    errorHandlingOptions: {
      retryOnFailure: {
        value: false,
      },
      continueOnFailure: {
        value: false,
      },
    },
  },
} satisfies WorkflowFindRecordsAction;

const meta: Meta<typeof WorkflowEditActionFormFindRecords> = {
  title: 'Modules/Workflow/WorkflowEditActionFormFindRecords',
  component: WorkflowEditActionFormFindRecords,
  parameters: {
    msw: graphqlMocks,
  },
  args: {
    action: DEFAULT_ACTION,
  },
  decorators: [
    WorkflowStepActionDrawerDecorator,
    WorkflowStepDecorator,
    ComponentDecorator,
    ObjectMetadataItemsDecorator,
    SnackBarDecorator,
    RouterDecorator,
    WorkspaceDecorator,
  ],
};

export default meta;

type Story = StoryObj<typeof WorkflowEditActionFormFindRecords>;

export const Default: Story = {
  args: {
    actionOptions: {
      onActionUpdate: fn(),
    },
  },
};

export const DisabledWithEmptyValues: Story = {
  args: {
    actionOptions: {
      readonly: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleInput = await canvas.findByDisplayValue('Search Records');

    expect(titleInput).toBeDisabled();

    const objectSelectCurrentValue = await canvas.findByText('People');

    await userEvent.click(objectSelectCurrentValue);

    {
      const searchInputInSelectDropdown =
        canvas.queryByPlaceholderText('Search');

      expect(searchInputInSelectDropdown).not.toBeInTheDocument();
    }
  },
};
