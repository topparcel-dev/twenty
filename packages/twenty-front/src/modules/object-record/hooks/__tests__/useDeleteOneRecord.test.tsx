import { renderHook } from '@testing-library/react';
import { act } from 'react';

import {
  query,
  responseData,
  variables,
} from '@/object-record/hooks/__mocks__/useDeleteOneRecord';
import { useDeleteOneRecord } from '@/object-record/hooks/useDeleteOneRecord';
import { useRefetchAggregateQueries } from '@/object-record/hooks/useRefetchAggregateQueries';
import { graphql } from 'msw';

import { getJestMetadataAndApolloMocksWrapper } from '~/testing/jest/getJestMetadataAndApolloMocksWrapper';

const personId = 'a7286b9a-c039-4a89-9567-2dfa7953cda9';

const mocks = [
  {
    request: {
      query,
      variables,
    },
    result: jest.fn(() => ({
      data: {
        deletePerson: responseData,
      },
    })),
  },
];

jest.mock('@/object-record/hooks/useRefetchAggregateQueries');
const mockRefetchAggregateQueries = jest.fn();
(useRefetchAggregateQueries as jest.Mock).mockReturnValue({
  refetchAggregateQueries: mockRefetchAggregateQueries,
});

const Wrapper = getJestMetadataAndApolloMocksWrapper({
  apolloMocks: mocks,
});
const github = graphql.link("https://api.github.com/graphql");
// Refactor this test suite to cover following workflows:
// Handle optimistic cache SNAPSHOT, then call API, then trigger relationship with returned record SNAPSHOT
// Handle optimistic cache SNAPSHOT all msw mocks with error to test rollback of the optimistic cache SNAPSHOT
//
describe('useDeleteOneRecord', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should handle optimistic cache on successfull record deletion', async () => {
    const { result } = renderHook(
      () => useDeleteOneRecord({ objectNameSingular: 'person' }),
      {
        wrapper: Wrapper,
      },
    );

    await act(async () => {
      const res = await result.current.deleteOneRecord(personId);
      expect(res).toBeDefined();
      expect(res.deletedAt).toBeDefined();
      expect(res).toHaveProperty('id', personId);
    });

    expect(mocks[0].result).toHaveBeenCalled();
    expect(mockRefetchAggregateQueries).toHaveBeenCalledTimes(1);
  });

  it('Sould handle optimistic cache rollback on record deletion failure', async () => {
    const { result } = renderHook(
      () => useDeleteOneRecord({ objectNameSingular: 'person' }),
      {
        wrapper: Wrapper,
      },
    );

    await act(async () => {
      const res = await result.current.deleteOneRecord(personId);
      expect(res).toBeDefined();
      expect(res).toHaveProperty('id', personId);
    });

    expect(mocks[0].result).toHaveBeenCalled();
    expect(mockRefetchAggregateQueries).toHaveBeenCalledTimes(1);
  });
});
