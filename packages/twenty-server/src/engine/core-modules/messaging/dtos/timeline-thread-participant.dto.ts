import { Field, ObjectType } from '@nestjs/graphql';

import { UUIDScalarType } from 'src/engine/api/graphql/workspace-schema-builder/graphql-types/scalars';

@ObjectType()
export class TimelineThreadParticipant {
  @Field(() => UUIDScalarType, { nullable: true })
  personId: string | null;

  @Field(() => UUIDScalarType, { nullable: true })
  workspaceMemberId: string | null;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  displayName: string;

  @Field()
  avatarUrl: string;

  @Field()
  handle: string;
}
