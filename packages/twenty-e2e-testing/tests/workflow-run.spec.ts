import { expect } from '@playwright/test';
import { test } from '../lib/fixtures/blank-workflow';

test.fixme(
  'The workflow run visualizer shows the executed draft version without the last draft changes',
  async ({ workflowVisualizer, page }) => {
    await workflowVisualizer.createInitialTrigger('manual');

    const manualTriggerAvailabilitySelect = page.getByRole('button', {
      name: 'When record(s) are selected',
    });

    await manualTriggerAvailabilitySelect.click();

    const alwaysAvailableOption = page.getByText(
      'When no record(s) are selected',
    );

    await alwaysAvailableOption.click();

    await workflowVisualizer.closeSidePanel();

    const { createdStepId: firstStepId } =
      await workflowVisualizer.createStep('create-record');

    await workflowVisualizer.closeSidePanel();

    const launchTestButton = page.getByLabel('Test Workflow');

    await launchTestButton.click();

    const goToExecutionPageLink = page.getByRole('link', {
      name: 'View execution details',
    });
    const executionPageUrl = await goToExecutionPageLink.getAttribute('href');
    expect(executionPageUrl).not.toBeNull();

    await workflowVisualizer.deleteStep(firstStepId);

    await page.goto(executionPageUrl!);

    const workflowRunName = page.getByText('Execution of v1');

    await expect(workflowRunName).toBeVisible();

    const flowTab = page.getByText('Flow', { exact: true });

    await flowTab.click();

    const executedFirstStepNode = workflowVisualizer.getStepNode(firstStepId);

    await expect(executedFirstStepNode).toBeVisible();

    await executedFirstStepNode.click();

    await expect(
      workflowVisualizer.commandMenu.getByRole('textbox').first(),
    ).toHaveValue('Create Record');
  },
);
