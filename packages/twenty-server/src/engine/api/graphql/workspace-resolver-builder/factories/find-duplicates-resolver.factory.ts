import { Injectable } from '@nestjs/common';

import { WorkspaceQueryRunnerOptions } from 'src/engine/api/graphql/workspace-query-runner/interfaces/query-runner-option.interface';
import { WorkspaceResolverBuilderFactoryInterface } from 'src/engine/api/graphql/workspace-resolver-builder/interfaces/workspace-resolver-builder-factory.interface';
import {
  FindDuplicatesResolverArgs,
  Resolver,
} from 'src/engine/api/graphql/workspace-resolver-builder/interfaces/workspace-resolvers-builder.interface';
import { WorkspaceSchemaBuilderContext } from 'src/engine/api/graphql/workspace-schema-builder/interfaces/workspace-schema-builder-context.interface';

import { GraphqlQueryRunnerService } from 'src/engine/api/graphql/graphql-query-runner/graphql-query-runner.service';
import { workspaceQueryRunnerGraphqlApiExceptionHandler } from 'src/engine/api/graphql/workspace-query-runner/utils/workspace-query-runner-graphql-api-exception-handler.util';

@Injectable()
export class FindDuplicatesResolverFactory
  implements WorkspaceResolverBuilderFactoryInterface
{
  public static methodName = 'findDuplicates' as const;

  constructor(
    private readonly graphqlQueryRunnerService: GraphqlQueryRunnerService,
  ) {}

  create(
    context: WorkspaceSchemaBuilderContext,
  ): Resolver<FindDuplicatesResolverArgs> {
    const internalContext = context;

    return async (_source, args, context, info) => {
      try {
        const options: WorkspaceQueryRunnerOptions = {
          authContext: internalContext.authContext,
          info,
          objectMetadataMaps: internalContext.objectMetadataMaps,
          objectMetadataItemWithFieldMaps:
            internalContext.objectMetadataItemWithFieldMaps,
        };

        return await this.graphqlQueryRunnerService.findDuplicates(
          args,
          options,
        );
      } catch (error) {
        workspaceQueryRunnerGraphqlApiExceptionHandler(error, internalContext);
      }
    };
  }
}
