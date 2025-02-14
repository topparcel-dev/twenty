import { Field, ObjectType } from '@nestjs/graphql';

import { WorkspaceUrlsAndId } from 'src/engine/core-modules/workspace/dtos/workspace-subdomain-id.dto';

import { AuthToken } from './token.entity';

@ObjectType()
export class SignUpOutput {
  @Field(() => AuthToken)
  loginToken: AuthToken;

  @Field(() => WorkspaceUrlsAndId)
  workspace: WorkspaceUrlsAndId;
}
