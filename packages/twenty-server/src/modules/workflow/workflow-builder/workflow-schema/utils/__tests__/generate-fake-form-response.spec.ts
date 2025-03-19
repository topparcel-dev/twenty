import { FieldMetadataType } from 'twenty-shared';

import { generateFakeFormResponse } from 'src/modules/workflow/workflow-builder/workflow-schema/utils/generate-fake-form-response';

describe('generateFakeFormResponse', () => {
  it('should generate fake responses for a form schema', () => {
    const schema = [
      {
        id: '96939213-49ac-4dee-949d-56e6c7be98e6',
        type: FieldMetadataType.TEXT,
        label: 'Name',
      },
      {
        id: '96939213-49ac-4dee-949d-56e6c7be98e7',
        type: FieldMetadataType.NUMBER,
        label: 'Age',
      },
      {
        id: '96939213-49ac-4dee-949d-56e6c7be98e8',
        type: FieldMetadataType.EMAILS,
        label: 'Email',
      },
    ];

    const result = generateFakeFormResponse(schema);

    expect(result).toEqual({
      '96939213-49ac-4dee-949d-56e6c7be98e8': {
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
      '96939213-49ac-4dee-949d-56e6c7be98e6': {
        isLeaf: true,
        label: 'Name',
        type: FieldMetadataType.TEXT,
        value: 'My text',
        icon: undefined,
      },
      '96939213-49ac-4dee-949d-56e6c7be98e7': {
        isLeaf: true,
        label: 'Age',
        type: FieldMetadataType.NUMBER,
        value: 20,
        icon: undefined,
      },
    });
  });
});
