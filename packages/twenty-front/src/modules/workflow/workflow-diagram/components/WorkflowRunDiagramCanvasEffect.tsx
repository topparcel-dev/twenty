import { useCommandMenu } from '@/command-menu/hooks/useCommandMenu';
import { useTabListStates } from '@/ui/layout/tab/hooks/internal/useTabListStates';
import { getSnapshotValue } from '@/ui/utilities/state/utils/getSnapshotValue';
import { workflowIdState } from '@/workflow/states/workflowIdState';
import { workflowSelectedNodeState } from '@/workflow/workflow-diagram/states/workflowSelectedNodeState';
import {
  WorkflowDiagramNode,
  WorkflowDiagramStepNodeData,
} from '@/workflow/workflow-diagram/types/WorkflowDiagram';
import { getWorkflowNodeIconKey } from '@/workflow/workflow-diagram/utils/getWorkflowNodeIconKey';
import { WORKFLOW_RUN_STEP_SIDE_PANEL_TAB_LIST_COMPONENT_ID } from '@/workflow/workflow-steps/constants/WorkflowRunStepSidePanelTabListComponentId';
import { WorkflowRunTabId } from '@/workflow/workflow-steps/types/WorkflowRunTabId';
import { TRIGGER_STEP_ID } from '@/workflow/workflow-trigger/constants/TriggerStepId';
import { OnSelectionChangeParams, useOnSelectionChange } from '@xyflow/react';
import { useCallback } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { isDefined } from 'twenty-shared';
import { useIcons } from 'twenty-ui';

export const WorkflowRunDiagramCanvasEffect = () => {
  const { getIcon } = useIcons();
  const setWorkflowSelectedNode = useSetRecoilState(workflowSelectedNodeState);
  const { openWorkflowViewRunStepInCommandMenu } = useCommandMenu();

  const workflowId = useRecoilValue(workflowIdState);

  const { activeTabIdState: workflowRunRightDrawerListActiveTabIdState } =
    useTabListStates({
      tabListScopeId: WORKFLOW_RUN_STEP_SIDE_PANEL_TAB_LIST_COMPONENT_ID,
    });

  const goBackToFirstWorkflowRunRightDrawerTabIfNeeded = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const activeWorkflowRunRightDrawerTab = getSnapshotValue(
          snapshot,
          workflowRunRightDrawerListActiveTabIdState,
        ) as WorkflowRunTabId | null;

        if (
          activeWorkflowRunRightDrawerTab === 'input' ||
          activeWorkflowRunRightDrawerTab === 'output'
        ) {
          set(workflowRunRightDrawerListActiveTabIdState, 'node');
        }
      },
    [workflowRunRightDrawerListActiveTabIdState],
  );

  const handleSelectionChange = useCallback(
    ({ nodes }: OnSelectionChangeParams) => {
      const selectedNode = nodes[0] as WorkflowDiagramNode | undefined;

      if (!isDefined(selectedNode)) {
        return;
      }

      setWorkflowSelectedNode(selectedNode.id);

      const selectedNodeData = selectedNode.data as WorkflowDiagramStepNodeData;

      if (
        selectedNode.id === TRIGGER_STEP_ID ||
        selectedNodeData.runStatus === 'not-executed' ||
        selectedNodeData.runStatus === 'running'
      ) {
        goBackToFirstWorkflowRunRightDrawerTabIfNeeded();
      }

      if (isDefined(workflowId)) {
        openWorkflowViewRunStepInCommandMenu(
          workflowId,
          selectedNodeData.name,
          getIcon(getWorkflowNodeIconKey(selectedNodeData)),
        );
      }
    },
    [
      setWorkflowSelectedNode,
      workflowId,
      getIcon,
      goBackToFirstWorkflowRunRightDrawerTabIfNeeded,
      openWorkflowViewRunStepInCommandMenu,
    ],
  );

  useOnSelectionChange({
    onChange: handleSelectionChange,
  });

  return null;
};
