import { useWorkflowRun } from '@/workflow/hooks/useWorkflowRun';
import { WorkflowRunDiagramCanvas } from '@/workflow/workflow-diagram/components/WorkflowRunDiagramCanvas';
import styled from '@emotion/styled';
import { isDefined } from 'twenty-shared';

const StyledSourceCodeContainer = styled.div`
  height: 100%;
`;

export const WorkflowRunVisualizer = ({
  workflowRunId,
}: {
  workflowRunId: string;
}) => {
  const workflowRun = useWorkflowRun({ workflowRunId });
  if (!isDefined(workflowRun)) {
    return null;
  }

  return (
    <StyledSourceCodeContainer>
      <WorkflowRunDiagramCanvas workflowRunStatus={workflowRun.status} />
    </StyledSourceCodeContainer>
  );
};
