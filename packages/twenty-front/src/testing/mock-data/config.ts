import { CaptchaDriverType, ClientConfig } from '~/generated/graphql';

export const mockedClientConfig: ClientConfig = {
  signInPrefilled: true,
  isMultiWorkspaceEnabled: false,
  isSSOEnabled: false,
  authProviders: {
    google: true,
    magicLink: false,
    password: true,
    microsoft: false,
    sso: [],
    __typename: 'AuthProviders',
  },
  frontDomain: 'localhost',
  defaultSubdomain: 'app',
  chromeExtensionId: 'MOCKED_EXTENSION_ID',
  debugMode: false,
  analyticsEnabled: true,
  support: {
    supportDriver: 'front',
    supportFrontChatId: null,
    __typename: 'Support',
  },
  sentry: {
    dsn: 'MOCKED_DSN',
    release: 'MOCKED_RELEASE',
    environment: 'MOCKED_ENVIRONMENT',
    __typename: 'Sentry',
  },
  billing: {
    isBillingEnabled: true,
    billingUrl: '',
    billingFreeTrialDurationInDays: 10,
    __typename: 'Billing',
  },
  captcha: {
    provider: CaptchaDriverType.GoogleRecaptcha,
    siteKey: 'MOCKED_SITE_KEY',
    __typename: 'Captcha',
  },
  api: { mutationMaximumAffectedRecords: 100 },
};
