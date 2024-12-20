import { DEV_SEED_WORKSPACE_MEMBER_IDS } from 'src/database/typeorm-seeds/workspace/workspace-members';

export const DEMO_OBJECTS_DATA_SEEDS = [
  {
    exampleText: 'Object 1',
    exampleSelect: 'bird',
    examplePhoneNumbers: {
      primaryPhoneNumber: '234-567-890',
      primaryPhoneCountryCode: '+1',
      additionalPhones: [
        { number: '234-567-890', callingCode: '+1', countryCode: 'US' },
      ],
    },
    exampleEmailAddresses: {
      primaryEmail: 'john@twenty.com',
      additionalEmails: [
        'tim@twenty.com',
        'timapple@twenty.com',
        'johnappletim@twenty.com',
      ],
    },
    exampleDateTime: new Date().toISOString(),
    exampleDate: new Date().toISOString(),
    exampleBoolean: true,
    exampleNumber: 123,
    exampleLinks: 123.456,
    exampleCurrency: {
      amountMicros: 2000000000,
      currencyCode: 'USD',
    },
    exampleFullName: { firstName: 'John', lastName: 'Doe' },
    exampleRating: 'RATING_3',
    exampleMultiSelect: ['option1', 'option2'],
    exampleAddress: {
      addressStreet1: '456 Oak Street',
      addressStreet2: '',
      addressCity: 'Springfield',
      addressState: 'California',
      addressCountry: 'United States',
      addressPostcode: '90210',
      addressLat: 34.0522,
      addressLng: -118.2437,
    },
    exampleRawJson: { key: 'value' },
    exampleRichText: "{ key: 'value' }",
    exampleActor: {
      createdBySource: 'MANUAL',
      createdByWorkspaceMemberId: DEV_SEED_WORKSPACE_MEMBER_IDS.TIM,
      createdByName: 'Tim Apple',
    },
    exampleArray: ['value1', 'value2'],
  },
];
