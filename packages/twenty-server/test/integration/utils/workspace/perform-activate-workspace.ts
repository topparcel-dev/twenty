import { ActivateWorkspaceInput } from 'src/engine/core-modules/workspace/dtos/activate-workspace-input';
import { activateWorkspaceOperationFactory } from 'test/integration/graphql/utils/activate-workspace-operation-factory.util';
import { signUpOperationFactory } from 'test/integration/graphql/utils/signup-operation-factory.util';
import { makeMetadataAPIRequest } from 'test/integration/metadata/suites/utils/make-metadata-api-request.util';

export const performActivateWorkspace = async (
  args: ActivateWorkspaceInput,
) => {
  const graphqlOperation = activateWorkspaceOperationFactory(args);

  return await makeMetadataAPIRequest(graphqlOperation);
};

export const performSignUp = async () => {
  const graphQlOperation = signUpOperationFactory({
    email: 'paul@twenty.com',
    password: 'I_am_a_strong_p@55M0rD',
  });

  const unAuthenticated = true;
  return await makeMetadataAPIRequest(graphQlOperation, unAuthenticated);
};
