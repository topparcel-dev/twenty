import { OnEvent } from '@nestjs/event-emitter';

import { DatabaseEventAction } from 'src/engine/api/graphql/graphql-query-runner/enums/database-event-action';

export function OnDatabaseEvent(
  object: string,
  action: DatabaseEventAction,
): MethodDecorator {
  const event = `${object}.${action}`;

  return (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    OnEvent(event)(target, propertyKey, descriptor);
  };
}
