/* @license Enterprise */

import { Field, InputType } from '@nestjs/graphql';

import { IsOptional, IsString } from 'class-validator';

@InputType()
export class GetAuthorizationUrlInput {
  @Field(() => String)
  @IsString()
  identityProviderId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  workspaceInviteHash?: string;
}
