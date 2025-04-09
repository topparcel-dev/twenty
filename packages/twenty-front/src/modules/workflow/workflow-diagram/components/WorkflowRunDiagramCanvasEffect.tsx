import { useWorkflowCommandMenu } from '@/command-menu/hooks/useWorkflowCommandMenu';
import { activeTabIdComponentState } from '@/ui/layout/tab/states/activeTabIdComponentState';
import { workflowIdState } from '@/workflow/states/workflowIdState';
import { workflowSelectedNodeState } from '@/workflow/workflow-diagram/states/workflowSelectedNodeState';
import {
  WorkflowDiagramNode,
  WorkflowDiagramStepNodeData,
} from '@/workflow/workflow-diagram/types/WorkflowDiagram';
import { getWorkflowNodeIconKey } from '@/workflow/workflow-diagram/utils/getWorkflowNodeIconKey';
import { WORKFLOW_RUN_STEP_SIDE_PANEL_TAB_LIST_COMPONENT_ID } from '@/workflow/workflow-steps/constants/WorkflowRunStepSidePanelTabListComponentId';
import { TRIGGER_STEP_ID } from '@/workflow/workflow-trigger/constants/TriggerStepId';
import { OnSelectionChangeParams, useOnSelectionChange } from '@xyflow/react';
import { useCallback } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { isDefined } from 'twenty-shared/utils';
import { useIcons } from 'twenty-ui/display';

export const WorkflowRunDiagramCanvasEffect = () => {
  const { getIcon } = useIcons();
  const setWorkflowSelectedNode = useSetRecoilState(workflowSelectedNodeState);
  const { openWorkflowRunViewStepInCommandMenu } = useWorkflowCommandMenu();

  const workflowId = useRecoilValue(workflowIdState);

  const setDefaultWorkflowRunRightDrawerTab = useRecoilCallback(
    ({ set }) =>
      ({ nodeId }: { nodeId: string }) => {
        const defaultTab = nodeId === TRIGGER_STEP_ID ? 'node' : 'output';

        set(
          activeTabIdComponentState.atomFamily({
            instanceId: WORKFLOW_RUN_STEP_SIDE_PANEL_TAB_LIST_COMPONENT_ID,
          }),
          defaultTab,
        );
      },
    [],
  );

  const handleSelectionChange = useCallback(
    ({ nodes }: OnSelectionChangeParams) => {
      const selectedNode = nodes[0] as WorkflowDiagramNode | undefined;

      if (!isDefined(selectedNode)) {
        return;
      }

      setWorkflowSelectedNode(selectedNode.id);

      const selectedNodeData = selectedNode.data as WorkflowDiagramStepNodeData;

      if (isDefined(workflowId)) {
        openWorkflowRunViewStepInCommandMenu(
          workflowId,
          selectedNodeData.name,
          getIcon(getWorkflowNodeIconKey(selectedNodeData)),
        );

        setDefaultWorkflowRunRightDrawerTab({
          nodeId: selectedNode.id,
        });
      }
    },
    [
      setWorkflowSelectedNode,
      workflowId,
      setDefaultWorkflowRunRightDrawerTab,
      openWorkflowRunViewStepInCommandMenu,
      getIcon,
    ],
  );

  useOnSelectionChange({
    onChange: handleSelectionChange,
  });

  return null;
};
