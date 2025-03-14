import { EachTestingContext } from 'twenty-shared';

import { CreateObjectInput } from 'src/engine/metadata-modules/object-metadata/dtos/create-object.input';
import { performSignUp } from 'test/integration/utils/workspace/perform-activate-workspace';

type CreateObjectInputPayload = Omit<
  CreateObjectInput,
  'workspaceId' | 'dataSourceId'
>;

type CreateOneObjectMetadataItemTestingContext = EachTestingContext<
  Partial<CreateObjectInputPayload>
>[];
describe('Workspace activation', () => {
  it('should activate workspace', async () => {
    const tmp = await performSignUp();
    console.log(tmp.body);
    // const response = await performActivateWorkspace({
    //   displayName: 'Acme',
    // });

    // console.log(response.body);
  });
});
