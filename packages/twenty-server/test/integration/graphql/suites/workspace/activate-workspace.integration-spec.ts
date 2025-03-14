import { EachTestingContext } from 'twenty-shared';

import { CreateObjectInput } from 'src/engine/metadata-modules/object-metadata/dtos/create-object.input';
import { performActivateWorkspace } from 'test/integration/utils/workspace/perform-activate-workspace';

type CreateObjectInputPayload = Omit<
  CreateObjectInput,
  'workspaceId' | 'dataSourceId'
>;

type CreateOneObjectMetadataItemTestingContext = EachTestingContext<
  Partial<CreateObjectInputPayload>
>[];
describe('Object metadata creation should fail', () => {
  it('should activate workspace', async () => {
    const response = await performActivateWorkspace({
      displayName: 'Acme',
    });

    console.log(response.body);
  });
});
