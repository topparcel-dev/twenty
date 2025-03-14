import { ActivateWorkspaceInput } from 'src/engine/core-modules/workspace/dtos/activate-workspace-input';
import { activateWorkspaceOperationFactory } from 'test/integration/graphql/utils/activate-workspace-operation-factory.util';
import { makeMetadataAPIRequest } from 'test/integration/metadata/suites/utils/make-metadata-api-request.util';


export const performActivateWorkspace = async (
  args: ActivateWorkspaceInput,
) => {
  const graphqlOperation = activateWorkspaceOperationFactory(
    args
  );

  return await makeMetadataAPIRequest(graphqlOperation);
};
