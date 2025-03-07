import { FieldMetadataType } from 'twenty-shared';

import { generateFakeFormResponse } from 'src/modules/workflow/workflow-builder/workflow-schema/utils/generate-fake-form-response';

describe('generateFakeFormResponse', () => {
  it('should generate fake responses for a form schema', () => {
    const schema = [
      {
        name: 'name',
        type: FieldMetadataType.TEXT,
        label: 'Name',
      },
      {
        name: 'age',
        type: FieldMetadataType.NUMBER,
        label: 'Age',
      },
      {
        name: 'email',
        type: FieldMetadataType.EMAILS,
        label: 'Email',
      },
    ];

    const result = generateFakeFormResponse(schema);

    expect(result).toEqual({
      email: {
        isLeaf: false,
        label: 'Email',
        value: {
          additionalEmails: {
            isLeaf: true,
            label: ' Additional Emails',
            type: FieldMetadataType.RAW_JSON,
            value: null,
          },
          primaryEmail: {
            isLeaf: true,
            label: ' Primary Email',
            type: FieldMetadataType.TEXT,
            value: 'My text',
          },
        },
        icon: undefined,
      },
      name: {
        isLeaf: true,
        label: 'Name',
        type: FieldMetadataType.TEXT,
        value: 'My text',
        icon: undefined,
      },
      age: {
        isLeaf: true,
        label: 'Age',
        type: FieldMetadataType.NUMBER,
        value: 20,
        icon: undefined,
      },
    });
  });
});
