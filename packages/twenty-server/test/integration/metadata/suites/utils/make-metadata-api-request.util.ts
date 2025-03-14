import { ASTNode, print } from 'graphql';
import request from 'supertest';

type GraphqlOperation = {
  query: ASTNode;
  variables?: Record<string, unknown>;
};

export const makeMetadataAPIRequest = (
  graphqlOperation: GraphqlOperation,
  unAuthenticated: boolean = false,
) => {
  const client = request(`http://localhost:${APP_PORT}`).post('/metadata');

  if (!unAuthenticated) {
    client.set('Authorization', `Bearer ${ADMIN_ACCESS_TOKEN}`);
  }
  return client.send({
    query: print(graphqlOperation.query),
    variables: graphqlOperation.variables || {},
  });
};
