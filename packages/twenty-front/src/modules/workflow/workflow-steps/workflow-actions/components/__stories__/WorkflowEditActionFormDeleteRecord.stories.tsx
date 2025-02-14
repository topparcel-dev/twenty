import { WorkflowDeleteRecordAction } from '@/workflow/types/Workflow';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { ComponentDecorator, RouterDecorator } from 'twenty-ui';
import { ObjectMetadataItemsDecorator } from '~/testing/decorators/ObjectMetadataItemsDecorator';
import { SnackBarDecorator } from '~/testing/decorators/SnackBarDecorator';
import { WorkflowStepActionDrawerDecorator } from '~/testing/decorators/WorkflowStepActionDrawerDecorator';
import { WorkflowStepDecorator } from '~/testing/decorators/WorkflowStepDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { getPeopleMock } from '~/testing/mock-data/people';
import { getWorkflowNodeIdMock } from '~/testing/mock-data/workflow';
import { WorkflowEditActionFormDeleteRecord } from '../WorkflowEditActionFormDeleteRecord';
import { WorkspaceDecorator } from '~/testing/decorators/WorkspaceDecorator';

const DEFAULT_ACTION = {
  id: getWorkflowNodeIdMock(),
  name: 'Delete Record',
  type: 'DELETE_RECORD',
  valid: false,
  settings: {
    input: {
      objectName: 'person',
      objectRecordId: '',
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
} satisfies WorkflowDeleteRecordAction;

const meta: Meta<typeof WorkflowEditActionFormDeleteRecord> = {
  title: 'Modules/Workflow/WorkflowEditActionFormDeleteRecord',
  component: WorkflowEditActionFormDeleteRecord,
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

type Story = StoryObj<typeof WorkflowEditActionFormDeleteRecord>;

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

    const titleInput = await canvas.findByDisplayValue('Delete Record');

    expect(titleInput).toBeDisabled();

    const objectSelectCurrentValue = await canvas.findByText('People');

    await userEvent.click(objectSelectCurrentValue);

    {
      const searchInputInSelectDropdown =
        canvas.queryByPlaceholderText('Search');

      expect(searchInputInSelectDropdown).not.toBeInTheDocument();
    }

    const openRecordSelectButton = within(
      await canvas.findByTestId(
        'workflow-edit-action-record-delete-object-record-id',
      ),
    ).queryByRole('button');

    expect(openRecordSelectButton).not.toBeInTheDocument();
  },
};

const peopleMock = getPeopleMock()[0];

export const DisabledWithDefaultStaticValues: Story = {
  args: {
    action: {
      ...DEFAULT_ACTION,
      settings: {
        ...DEFAULT_ACTION.settings,
        input: {
          ...DEFAULT_ACTION.settings.input,
          objectRecordId: peopleMock.id,
        },
      },
    },
    actionOptions: {
      readonly: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleInput = await canvas.findByDisplayValue('Delete Record');

    expect(titleInput).toBeDisabled();

    const objectSelectCurrentValue = await canvas.findByText('People');

    await userEvent.click(objectSelectCurrentValue);

    {
      const searchInputInSelectDropdown =
        canvas.queryByPlaceholderText('Search');

      expect(searchInputInSelectDropdown).not.toBeInTheDocument();
    }

    const openRecordSelectButton = within(
      await canvas.findByTestId(
        'workflow-edit-action-record-delete-object-record-id',
      ),
    ).queryByRole('button');

    expect(openRecordSelectButton).not.toBeInTheDocument();

    const selectedRecordToDelete = await canvas.findByText(
      `${peopleMock.name.firstName} ${peopleMock.name.lastName}`,
    );

    expect(selectedRecordToDelete).toBeVisible();
  },
};

export const DisabledWithDefaultVariableValues: Story = {
  args: {
    action: {
      ...DEFAULT_ACTION,
      settings: {
        ...DEFAULT_ACTION.settings,
        input: {
          ...DEFAULT_ACTION.settings.input,
          objectRecordId: '{{trigger.recordId}}',
        },
      },
    },
    actionOptions: {
      readonly: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleInput = await canvas.findByDisplayValue('Delete Record');

    expect(titleInput).toBeDisabled();

    const objectSelectCurrentValue = await canvas.findByText('People');

    await userEvent.click(objectSelectCurrentValue);

    {
      const searchInputInSelectDropdown =
        canvas.queryByPlaceholderText('Search');

      expect(searchInputInSelectDropdown).not.toBeInTheDocument();
    }

    const openRecordSelectButton = within(
      await canvas.findByTestId(
        'workflow-edit-action-record-delete-object-record-id',
      ),
    ).queryByRole('button');

    expect(openRecordSelectButton).not.toBeInTheDocument();

    const recordVariableToDelete = await within(
      canvas.getByTestId('workflow-edit-action-record-delete-object-record-id'),
    ).findByText('Person');

    expect(recordVariableToDelete).toBeVisible();
  },
};
