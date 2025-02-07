import { setupServer } from 'msw/node'
import { graphqlMocks } from '~/testing/graphqlMocks'
 
// Could this be a TypeScript file ?
export const nodeMswServer = setupServer(...graphqlMocks.handlers)