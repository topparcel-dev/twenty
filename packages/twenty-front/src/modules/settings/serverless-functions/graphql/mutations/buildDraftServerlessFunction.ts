import { gql } from '@apollo/client';
import { SERVERLESS_FUNCTION_FRAGMENT } from '@/settings/serverless-functions/graphql/fragments/serverlessFunctionFragment';

export const BUILD_DRAFT_SERVERLESS_FUNCTION = gql`
  ${SERVERLESS_FUNCTION_FRAGMENT}
  mutation BuildDraftServerlessFunction(
    $input: BuildDraftServerlessFunctionInput!
  ) {
    buildDraftServerlessFunction(input: $input) {
      ...ServerlessFunctionFields
    }
  }
`;
