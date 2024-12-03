import { useApolloClient, useMutation } from '@apollo/client';
import { getOperationName } from '@apollo/client/utilities';

import {
  UpdateOneFieldMetadataItemMutation,
  UpdateOneFieldMetadataItemMutationVariables,
} from '~/generated-metadata/graphql';

import { UPDATE_ONE_FIELD_METADATA_ITEM } from '../graphql/mutations';
import { FIND_MANY_OBJECT_METADATA_ITEMS } from '../graphql/queries';

import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useFindManyRecordsQuery } from '@/object-record/hooks/useFindManyRecordsQuery';
import { useSetRecoilState } from 'recoil';
import { isDefined } from 'twenty-ui';
import { useGetCurrentUserQuery } from '~/generated/graphql';
import { useApolloMetadataClient } from './useApolloMetadataClient';

export const useUpdateOneFieldMetadataItem = () => {
  const apolloMetadataClient = useApolloMetadataClient();
  const apolloClient = useApolloClient();

  const setCurrentWorkspace = useSetRecoilState(currentWorkspaceState);

  const { refetch: refetchCurrentUser } = useGetCurrentUserQuery({
    onCompleted: (data) => {
      if (isDefined(data?.currentUser?.defaultWorkspace)) {
        setCurrentWorkspace(data.currentUser.defaultWorkspace);
      }
    },
  });

  const { findManyRecordsQuery } = useFindManyRecordsQuery({
    objectNameSingular: CoreObjectNameSingular.View,
    recordGqlFields: {
      id: true,
      viewGroups: {
        id: true,
        fieldMetadataId: true,
        isVisible: true,
        fieldValue: true,
        position: true,
      },
    },
  });

  const [mutate] = useMutation<
    UpdateOneFieldMetadataItemMutation,
    UpdateOneFieldMetadataItemMutationVariables
  >(UPDATE_ONE_FIELD_METADATA_ITEM, {
    client: apolloMetadataClient ?? undefined,
  });

  const updateOneFieldMetadataItem = async ({
    objectMetadataId,
    fieldMetadataIdToUpdate,
    updatePayload,
  }: {
    objectMetadataId: string;
    fieldMetadataIdToUpdate: UpdateOneFieldMetadataItemMutationVariables['idToUpdate'];
    updatePayload: Pick<
      UpdateOneFieldMetadataItemMutationVariables['updatePayload'],
      | 'description'
      | 'icon'
      | 'isActive'
      | 'label'
      | 'name'
      | 'defaultValue'
      | 'options'
      | 'isLabelSyncedWithName'
    >;
  }) => {
    const result = await mutate({
      variables: {
        idToUpdate: fieldMetadataIdToUpdate,
        updatePayload: updatePayload,
      },
      awaitRefetchQueries: true,
      refetchQueries: [getOperationName(FIND_MANY_OBJECT_METADATA_ITEMS) ?? ''],
    });

    await refetchCurrentUser();

    await apolloClient.query({
      query: findManyRecordsQuery,
      variables: {
        filter: {
          objectMetadataId: {
            eq: objectMetadataId,
          },
        },
      },
      fetchPolicy: 'network-only',
    });

    return result;
  };

  return {
    updateOneFieldMetadataItem,
  };
};
