import * as Apollo from '@apollo/client';
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ConnectionCursor: any;
  DateTime: string;
  JSON: any;
  JSONObject: any;
  UUID: any;
  Upload: any;
};

export type ActivateWorkspaceInput = {
  displayName?: InputMaybe<Scalars['String']>;
};

export type Analytics = {
  __typename?: 'Analytics';
  /** Boolean that confirms query was dispatched */
  success: Scalars['Boolean'];
};

export type AnalyticsTinybirdJwtMap = {
  __typename?: 'AnalyticsTinybirdJwtMap';
  getPageviewsAnalytics: Scalars['String'];
  getServerlessFunctionDuration: Scalars['String'];
  getServerlessFunctionErrorCount: Scalars['String'];
  getServerlessFunctionSuccessRate: Scalars['String'];
  getUsersAnalytics: Scalars['String'];
  getWebhookAnalytics: Scalars['String'];
};

export type ApiConfig = {
  __typename?: 'ApiConfig';
  mutationMaximumAffectedRecords: Scalars['Float'];
};

export type ApiKeyToken = {
  __typename?: 'ApiKeyToken';
  token: Scalars['String'];
};

export type AppToken = {
  __typename?: 'AppToken';
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AppTokenEdge = {
  __typename?: 'AppTokenEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the AppToken */
  node: AppToken;
};

export type AuthProviders = {
  __typename?: 'AuthProviders';
  google: Scalars['Boolean'];
  magicLink: Scalars['Boolean'];
  microsoft: Scalars['Boolean'];
  password: Scalars['Boolean'];
  sso: Array<SsoIdentityProvider>;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  expiresAt: Scalars['DateTime'];
  token: Scalars['String'];
};

export type AuthTokenPair = {
  __typename?: 'AuthTokenPair';
  accessToken: AuthToken;
  refreshToken: AuthToken;
};

export type AuthTokens = {
  __typename?: 'AuthTokens';
  tokens: AuthTokenPair;
};

export type AuthorizeApp = {
  __typename?: 'AuthorizeApp';
  redirectUrl: Scalars['String'];
};

export type AvailableWorkspaceOutput = {
  __typename?: 'AvailableWorkspaceOutput';
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
  sso: Array<SsoConnection>;
  workspaceUrls: WorkspaceUrls;
};

export type Billing = {
  __typename?: 'Billing';
  billingUrl?: Maybe<Scalars['String']>;
  isBillingEnabled: Scalars['Boolean'];
  trialPeriods: Array<BillingTrialPeriodDto>;
};

/** The different billing plans available */
export enum BillingPlanKey {
  ENTERPRISE = 'ENTERPRISE',
  PRO = 'PRO'
}

export type BillingPlanOutput = {
  __typename?: 'BillingPlanOutput';
  baseProduct: BillingProductDto;
  meteredProducts: Array<BillingProductDto>;
  otherLicensedProducts: Array<BillingProductDto>;
  planKey: BillingPlanKey;
};

export type BillingPriceLicensedDto = {
  __typename?: 'BillingPriceLicensedDTO';
  recurringInterval: SubscriptionInterval;
  stripePriceId: Scalars['String'];
  unitAmount: Scalars['Float'];
};

export type BillingPriceMeteredDto = {
  __typename?: 'BillingPriceMeteredDTO';
  recurringInterval: SubscriptionInterval;
  stripePriceId: Scalars['String'];
  tiers?: Maybe<Array<BillingPriceTierDto>>;
  tiersMode?: Maybe<BillingPriceTiersMode>;
};

export type BillingPriceTierDto = {
  __typename?: 'BillingPriceTierDTO';
  flatAmount?: Maybe<Scalars['Float']>;
  unitAmount?: Maybe<Scalars['Float']>;
  upTo?: Maybe<Scalars['Float']>;
};

/** The different billing price tiers modes */
export enum BillingPriceTiersMode {
  GRADUATED = 'GRADUATED',
  VOLUME = 'VOLUME'
}

export type BillingPriceUnionDto = BillingPriceLicensedDto | BillingPriceMeteredDto;

export type BillingProductDto = {
  __typename?: 'BillingProductDTO';
  description: Scalars['String'];
  images?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  prices: Array<Maybe<BillingPriceUnionDto>>;
  type: BillingUsageType;
};

export type BillingProductPriceDto = {
  __typename?: 'BillingProductPriceDTO';
  created: Scalars['Float'];
  recurringInterval: SubscriptionInterval;
  stripePriceId: Scalars['String'];
  unitAmount: Scalars['Float'];
};

export type BillingProductPricesOutput = {
  __typename?: 'BillingProductPricesOutput';
  productPrices: Array<BillingProductPriceDto>;
  totalNumberOfPrices: Scalars['Int'];
};

export type BillingSessionOutput = {
  __typename?: 'BillingSessionOutput';
  url?: Maybe<Scalars['String']>;
};

export type BillingSubscription = {
  __typename?: 'BillingSubscription';
  id: Scalars['UUID'];
  interval?: Maybe<SubscriptionInterval>;
  status: SubscriptionStatus;
};

export type BillingTrialPeriodDto = {
  __typename?: 'BillingTrialPeriodDTO';
  duration: Scalars['Float'];
  isCreditCardRequired: Scalars['Boolean'];
};

export type BillingUpdateOutput = {
  __typename?: 'BillingUpdateOutput';
  /** Boolean that confirms query was successful */
  success: Scalars['Boolean'];
};

export enum BillingUsageType {
  LICENSED = 'LICENSED',
  METERED = 'METERED'
}

export type BooleanFieldComparison = {
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
};

export type BuildDraftServerlessFunctionInput = {
  /** The id of the function. */
  id: Scalars['ID'];
};

export enum CalendarChannelVisibility {
  METADATA = 'METADATA',
  SHARE_EVERYTHING = 'SHARE_EVERYTHING'
}

export type Captcha = {
  __typename?: 'Captcha';
  provider?: Maybe<CaptchaDriverType>;
  siteKey?: Maybe<Scalars['String']>;
};

export enum CaptchaDriverType {
  GoogleRecaptcha = 'GoogleRecaptcha',
  Turnstile = 'Turnstile'
}

export type ClientConfig = {
  __typename?: 'ClientConfig';
  analyticsEnabled: Scalars['Boolean'];
  api: ApiConfig;
  authProviders: AuthProviders;
  billing: Billing;
  canManageFeatureFlags: Scalars['Boolean'];
  captcha: Captcha;
  chromeExtensionId?: Maybe<Scalars['String']>;
  debugMode: Scalars['Boolean'];
  defaultSubdomain?: Maybe<Scalars['String']>;
  frontDomain: Scalars['String'];
  isEmailVerificationRequired: Scalars['Boolean'];
  isGoogleCalendarEnabled: Scalars['Boolean'];
  isGoogleMessagingEnabled: Scalars['Boolean'];
  isMicrosoftCalendarEnabled: Scalars['Boolean'];
  isMicrosoftMessagingEnabled: Scalars['Boolean'];
  isMultiWorkspaceEnabled: Scalars['Boolean'];
  publicFeatureFlags: Array<PublicFeatureFlag>;
  sentry: Sentry;
  signInPrefilled: Scalars['Boolean'];
  support: Support;
};

export type ComputeStepOutputSchemaInput = {
  /** Step JSON format */
  step: Scalars['JSON'];
};

export type CreateDraftFromWorkflowVersionInput = {
  /** Workflow ID */
  workflowId: Scalars['String'];
  /** Workflow version ID */
  workflowVersionIdToCopy: Scalars['String'];
};

export type CreateFieldInput = {
  defaultValue?: InputMaybe<Scalars['JSON']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isCustom?: InputMaybe<Scalars['Boolean']>;
  isLabelSyncedWithName?: InputMaybe<Scalars['Boolean']>;
  isNullable?: InputMaybe<Scalars['Boolean']>;
  isRemoteCreation?: InputMaybe<Scalars['Boolean']>;
  isSystem?: InputMaybe<Scalars['Boolean']>;
  isUnique?: InputMaybe<Scalars['Boolean']>;
  label: Scalars['String'];
  name: Scalars['String'];
  objectMetadataId: Scalars['String'];
  options?: InputMaybe<Scalars['JSON']>;
  settings?: InputMaybe<Scalars['JSON']>;
  type: FieldMetadataType;
};

export type CreateOneFieldMetadataInput = {
  /** The record to create */
  field: CreateFieldInput;
};

export type CreateServerlessFunctionInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  timeoutSeconds?: InputMaybe<Scalars['Float']>;
};

export type CreateWorkflowVersionStepInput = {
  /** New step type */
  stepType: Scalars['String'];
  /** Workflow version ID */
  workflowVersionId: Scalars['String'];
};

export type CursorPaging = {
  /** Paginate after opaque cursor */
  after?: InputMaybe<Scalars['ConnectionCursor']>;
  /** Paginate before opaque cursor */
  before?: InputMaybe<Scalars['ConnectionCursor']>;
  /** Paginate first */
  first?: InputMaybe<Scalars['Int']>;
  /** Paginate last */
  last?: InputMaybe<Scalars['Int']>;
};

export type CustomDomainDetails = {
  __typename?: 'CustomDomainDetails';
  customDomain: Scalars['String'];
  id: Scalars['String'];
  records: Array<CustomDomainVerification>;
};

export type CustomDomainVerification = {
  __typename?: 'CustomDomainVerification';
  key: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
  validationType: Scalars['String'];
  value: Scalars['String'];
};

export type DeleteOneFieldInput = {
  /** The id of the field to delete. */
  id: Scalars['UUID'];
};

export type DeleteOneObjectInput = {
  /** The id of the record to delete. */
  id: Scalars['UUID'];
};

export type DeleteSsoInput = {
  identityProviderId: Scalars['String'];
};

export type DeleteSsoOutput = {
  __typename?: 'DeleteSsoOutput';
  identityProviderId: Scalars['String'];
};

export type DeleteWorkflowVersionStepInput = {
  /** Step to delete ID */
  stepId: Scalars['String'];
  /** Workflow version ID */
  workflowVersionId: Scalars['String'];
};

/** Schema update on a table */
export enum DistantTableUpdate {
  COLUMNS_ADDED = 'COLUMNS_ADDED',
  COLUMNS_DELETED = 'COLUMNS_DELETED',
  COLUMNS_TYPE_CHANGED = 'COLUMNS_TYPE_CHANGED',
  TABLE_DELETED = 'TABLE_DELETED'
}

export type EditSsoInput = {
  id: Scalars['String'];
  status: SsoIdentityProviderStatus;
};

export type EditSsoOutput = {
  __typename?: 'EditSsoOutput';
  id: Scalars['String'];
  issuer: Scalars['String'];
  name: Scalars['String'];
  status: SsoIdentityProviderStatus;
  type: IdentityProviderType;
};

export type EmailPasswordResetLink = {
  __typename?: 'EmailPasswordResetLink';
  /** Boolean that confirms query was dispatched */
  success: Scalars['Boolean'];
};

export type EnvironmentVariable = {
  __typename?: 'EnvironmentVariable';
  description: Scalars['String'];
  name: Scalars['String'];
  sensitive: Scalars['Boolean'];
  value: Scalars['String'];
};

export enum EnvironmentVariablesGroup {
  BillingConfig = 'BillingConfig',
  CaptchaConfig = 'CaptchaConfig',
  CloudflareConfig = 'CloudflareConfig',
  EmailSettings = 'EmailSettings',
  ExceptionHandler = 'ExceptionHandler',
  GoogleAuth = 'GoogleAuth',
  LLM = 'LLM',
  Logging = 'Logging',
  MicrosoftAuth = 'MicrosoftAuth',
  Other = 'Other',
  RateLimiting = 'RateLimiting',
  SSL = 'SSL',
  ServerConfig = 'ServerConfig',
  ServerlessConfig = 'ServerlessConfig',
  StorageConfig = 'StorageConfig',
  SupportChatConfig = 'SupportChatConfig',
  TinybirdConfig = 'TinybirdConfig',
  TokensDuration = 'TokensDuration'
}

export type EnvironmentVariablesGroupData = {
  __typename?: 'EnvironmentVariablesGroupData';
  description: Scalars['String'];
  isHiddenOnLoad: Scalars['Boolean'];
  name: EnvironmentVariablesGroup;
  variables: Array<EnvironmentVariable>;
};

export type EnvironmentVariablesOutput = {
  __typename?: 'EnvironmentVariablesOutput';
  groups: Array<EnvironmentVariablesGroupData>;
};

export type ExecuteServerlessFunctionInput = {
  /** Id of the serverless function to execute */
  id: Scalars['UUID'];
  /** Payload in JSON format */
  payload: Scalars['JSON'];
  /** Version of the serverless function to execute */
  version?: Scalars['String'];
};

export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  id: Scalars['UUID'];
  key: FeatureFlagKey;
  value: Scalars['Boolean'];
  workspaceId: Scalars['String'];
};

export enum FeatureFlagKey {
  IsAdvancedFiltersEnabled = 'IsAdvancedFiltersEnabled',
  IsAirtableIntegrationEnabled = 'IsAirtableIntegrationEnabled',
  IsAnalyticsV2Enabled = 'IsAnalyticsV2Enabled',
  IsBillingPlansEnabled = 'IsBillingPlansEnabled',
  IsCommandMenuV2Enabled = 'IsCommandMenuV2Enabled',
  IsCopilotEnabled = 'IsCopilotEnabled',
  IsCustomDomainEnabled = 'IsCustomDomainEnabled',
  IsEventObjectEnabled = 'IsEventObjectEnabled',
  IsJsonFilterEnabled = 'IsJsonFilterEnabled',
  IsLocalizationEnabled = 'IsLocalizationEnabled',
  IsMicrosoftSyncEnabled = 'IsMicrosoftSyncEnabled',
  IsNewRelationEnabled = 'IsNewRelationEnabled',
  IsPermissionsEnabled = 'IsPermissionsEnabled',
  IsPostgreSQLIntegrationEnabled = 'IsPostgreSQLIntegrationEnabled',
  IsRichTextV2Enabled = 'IsRichTextV2Enabled',
  IsStripeIntegrationEnabled = 'IsStripeIntegrationEnabled',
  IsUniqueIndexesEnabled = 'IsUniqueIndexesEnabled',
  IsWorkflowEnabled = 'IsWorkflowEnabled'
}

export type Field = {
  __typename?: 'Field';
  createdAt: Scalars['DateTime'];
  defaultValue?: Maybe<Scalars['JSON']>;
  description?: Maybe<Scalars['String']>;
  fromRelationMetadata?: Maybe<RelationMetadata>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  isActive?: Maybe<Scalars['Boolean']>;
  isCustom?: Maybe<Scalars['Boolean']>;
  isLabelSyncedWithName?: Maybe<Scalars['Boolean']>;
  isNullable?: Maybe<Scalars['Boolean']>;
  isSystem?: Maybe<Scalars['Boolean']>;
  isUnique?: Maybe<Scalars['Boolean']>;
  label: Scalars['String'];
  name: Scalars['String'];
  object?: Maybe<Object>;
  options?: Maybe<Scalars['JSON']>;
  relation?: Maybe<Relation>;
  relationDefinition?: Maybe<RelationDefinition>;
  settings?: Maybe<Scalars['JSON']>;
  toRelationMetadata?: Maybe<RelationMetadata>;
  type: FieldMetadataType;
  updatedAt: Scalars['DateTime'];
};

export type FieldConnection = {
  __typename?: 'FieldConnection';
  /** Array of edges. */
  edges: Array<FieldEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type FieldEdge = {
  __typename?: 'FieldEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Field */
  node: Field;
};

export type FieldFilter = {
  and?: InputMaybe<Array<FieldFilter>>;
  id?: InputMaybe<UuidFilterComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  isCustom?: InputMaybe<BooleanFieldComparison>;
  isSystem?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<FieldFilter>>;
};

/** Type of the field */
export enum FieldMetadataType {
  ACTOR = 'ACTOR',
  ADDRESS = 'ADDRESS',
  ARRAY = 'ARRAY',
  BOOLEAN = 'BOOLEAN',
  CURRENCY = 'CURRENCY',
  DATE = 'DATE',
  DATE_TIME = 'DATE_TIME',
  EMAILS = 'EMAILS',
  FULL_NAME = 'FULL_NAME',
  LINKS = 'LINKS',
  MULTI_SELECT = 'MULTI_SELECT',
  NUMBER = 'NUMBER',
  NUMERIC = 'NUMERIC',
  PHONES = 'PHONES',
  POSITION = 'POSITION',
  RATING = 'RATING',
  RAW_JSON = 'RAW_JSON',
  RELATION = 'RELATION',
  RICH_TEXT = 'RICH_TEXT',
  RICH_TEXT_V2 = 'RICH_TEXT_V2',
  SELECT = 'SELECT',
  TEXT = 'TEXT',
  TS_VECTOR = 'TS_VECTOR',
  UUID = 'UUID'
}

export enum FileFolder {
  Attachment = 'Attachment',
  PersonPicture = 'PersonPicture',
  ProfilePicture = 'ProfilePicture',
  ServerlessFunction = 'ServerlessFunction',
  WorkspaceLogo = 'WorkspaceLogo'
}

export type FindAvailableSsoidpOutput = {
  __typename?: 'FindAvailableSSOIDPOutput';
  id: Scalars['String'];
  issuer: Scalars['String'];
  name: Scalars['String'];
  status: SsoIdentityProviderStatus;
  type: IdentityProviderType;
  workspace: WorkspaceNameAndId;
};

export type FullName = {
  __typename?: 'FullName';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type GetAuthorizationUrlInput = {
  identityProviderId: Scalars['String'];
  workspaceInviteHash?: InputMaybe<Scalars['String']>;
};

export type GetAuthorizationUrlOutput = {
  __typename?: 'GetAuthorizationUrlOutput';
  authorizationURL: Scalars['String'];
  id: Scalars['String'];
  type: Scalars['String'];
};

export type GetServerlessFunctionSourceCodeInput = {
  /** The id of the function. */
  id: Scalars['ID'];
  /** The version of the function */
  version?: Scalars['String'];
};

export enum IdentityProviderType {
  OIDC = 'OIDC',
  SAML = 'SAML'
}

export type ImpersonateOutput = {
  __typename?: 'ImpersonateOutput';
  loginToken: AuthToken;
  workspace: WorkspaceUrlsAndId;
};

export type Index = {
  __typename?: 'Index';
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  indexFieldMetadatas: IndexIndexFieldMetadatasConnection;
  indexType: IndexType;
  indexWhereClause?: Maybe<Scalars['String']>;
  isCustom?: Maybe<Scalars['Boolean']>;
  isUnique: Scalars['Boolean'];
  name: Scalars['String'];
  objectMetadata: IndexObjectMetadataConnection;
  updatedAt: Scalars['DateTime'];
};


export type IndexIndexFieldMetadatasArgs = {
  filter?: IndexFieldFilter;
  paging?: CursorPaging;
};


export type IndexObjectMetadataArgs = {
  filter?: ObjectFilter;
  paging?: CursorPaging;
};

export type IndexConnection = {
  __typename?: 'IndexConnection';
  /** Array of edges. */
  edges: Array<IndexEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type IndexEdge = {
  __typename?: 'IndexEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Index */
  node: Index;
};

export type IndexField = {
  __typename?: 'IndexField';
  createdAt: Scalars['DateTime'];
  fieldMetadataId: Scalars['UUID'];
  id: Scalars['UUID'];
  order: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type IndexFieldEdge = {
  __typename?: 'IndexFieldEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the IndexField */
  node: IndexField;
};

export type IndexFieldFilter = {
  and?: InputMaybe<Array<IndexFieldFilter>>;
  fieldMetadataId?: InputMaybe<UuidFilterComparison>;
  id?: InputMaybe<UuidFilterComparison>;
  or?: InputMaybe<Array<IndexFieldFilter>>;
};

export type IndexFilter = {
  and?: InputMaybe<Array<IndexFilter>>;
  id?: InputMaybe<UuidFilterComparison>;
  isCustom?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<IndexFilter>>;
};

export type IndexIndexFieldMetadatasConnection = {
  __typename?: 'IndexIndexFieldMetadatasConnection';
  /** Array of edges. */
  edges: Array<IndexFieldEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type IndexObjectMetadataConnection = {
  __typename?: 'IndexObjectMetadataConnection';
  /** Array of edges. */
  edges: Array<ObjectEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

/** Type of the index */
export enum IndexType {
  BTREE = 'BTREE',
  GIN = 'GIN'
}

export type InvalidatePassword = {
  __typename?: 'InvalidatePassword';
  /** Boolean that confirms query was dispatched */
  success: Scalars['Boolean'];
};

export type LinkMetadata = {
  __typename?: 'LinkMetadata';
  label: Scalars['String'];
  url: Scalars['String'];
};

export type LinksMetadata = {
  __typename?: 'LinksMetadata';
  primaryLinkLabel: Scalars['String'];
  primaryLinkUrl: Scalars['String'];
  secondaryLinks?: Maybe<Array<LinkMetadata>>;
};

export type LoginToken = {
  __typename?: 'LoginToken';
  loginToken: AuthToken;
};

export enum MessageChannelVisibility {
  METADATA = 'METADATA',
  SHARE_EVERYTHING = 'SHARE_EVERYTHING',
  SUBJECT = 'SUBJECT'
}

export type Mutation = {
  __typename?: 'Mutation';
  activateWorkflowVersion: Scalars['Boolean'];
  activateWorkspace: Workspace;
  authorizeApp: AuthorizeApp;
  buildDraftServerlessFunction: ServerlessFunction;
  checkoutSession: BillingSessionOutput;
  computeStepOutputSchema: Scalars['JSON'];
  createDraftFromWorkflowVersion: WorkflowVersion;
  createOIDCIdentityProvider: SetupSsoOutput;
  createOneAppToken: AppToken;
  createOneField: Field;
  createOneObject: Object;
  createOneServerlessFunction: ServerlessFunction;
  createSAMLIdentityProvider: SetupSsoOutput;
  createWorkflowVersionStep: WorkflowAction;
  deactivateWorkflowVersion: Scalars['Boolean'];
  deleteCurrentWorkspace: Workspace;
  deleteOneField: Field;
  deleteOneObject: Object;
  deleteOneServerlessFunction: ServerlessFunction;
  deleteSSOIdentityProvider: DeleteSsoOutput;
  deleteUser: User;
  deleteWorkflowVersionStep: WorkflowAction;
  deleteWorkspaceInvitation: Scalars['String'];
  disablePostgresProxy: PostgresCredentials;
  editSSOIdentityProvider: EditSsoOutput;
  emailPasswordResetLink: EmailPasswordResetLink;
  enablePostgresProxy: PostgresCredentials;
  executeOneServerlessFunction: ServerlessFunctionExecutionResult;
  generateApiKeyToken: ApiKeyToken;
  generateTransientToken: TransientToken;
  getAuthTokensFromLoginToken: AuthTokens;
  getAuthorizationUrl: GetAuthorizationUrlOutput;
  getLoginTokenFromCredentials: LoginToken;
  getLoginTokenFromEmailVerificationToken: LoginToken;
  impersonate: ImpersonateOutput;
  publishServerlessFunction: ServerlessFunction;
  renewToken: AuthTokens;
  resendEmailVerificationToken: ResendEmailVerificationTokenOutput;
  resendWorkspaceInvitation: SendInvitationsOutput;
  runWorkflowVersion: WorkflowRun;
  sendInvitations: SendInvitationsOutput;
  signUp: SignUpOutput;
  skipSyncEmailOnboardingStep: OnboardingStepSuccess;
  track: Analytics;
  updateBillingSubscription: BillingUpdateOutput;
  updateLabPublicFeatureFlag: FeatureFlag;
  updateOneField: Field;
  updateOneObject: Object;
  updateOneServerlessFunction: ServerlessFunction;
  updatePasswordViaResetToken: InvalidatePassword;
  updateWorkflowVersionStep: WorkflowAction;
  updateWorkspace: Workspace;
  updateWorkspaceFeatureFlag: Scalars['Boolean'];
  updateWorkspaceMemberRole: WorkspaceMember;
  uploadFile: Scalars['String'];
  uploadImage: Scalars['String'];
  uploadProfilePicture: Scalars['String'];
  uploadWorkspaceLogo: Scalars['String'];
  userLookupAdminPanel: UserLookup;
};


export type MutationActivateWorkflowVersionArgs = {
  workflowVersionId: Scalars['String'];
};


export type MutationActivateWorkspaceArgs = {
  data: ActivateWorkspaceInput;
};


export type MutationAuthorizeAppArgs = {
  clientId: Scalars['String'];
  codeChallenge?: InputMaybe<Scalars['String']>;
  redirectUrl: Scalars['String'];
};


export type MutationBuildDraftServerlessFunctionArgs = {
  input: BuildDraftServerlessFunctionInput;
};


export type MutationCheckoutSessionArgs = {
  plan?: BillingPlanKey;
  recurringInterval: SubscriptionInterval;
  requirePaymentMethod?: Scalars['Boolean'];
  successUrlPath?: InputMaybe<Scalars['String']>;
};


export type MutationComputeStepOutputSchemaArgs = {
  input: ComputeStepOutputSchemaInput;
};


export type MutationCreateDraftFromWorkflowVersionArgs = {
  input: CreateDraftFromWorkflowVersionInput;
};


export type MutationCreateOidcIdentityProviderArgs = {
  input: SetupOidcSsoInput;
};


export type MutationCreateOneFieldArgs = {
  input: CreateOneFieldMetadataInput;
};


export type MutationCreateOneServerlessFunctionArgs = {
  input: CreateServerlessFunctionInput;
};


export type MutationCreateSamlIdentityProviderArgs = {
  input: SetupSamlSsoInput;
};


export type MutationCreateWorkflowVersionStepArgs = {
  input: CreateWorkflowVersionStepInput;
};


export type MutationDeactivateWorkflowVersionArgs = {
  workflowVersionId: Scalars['String'];
};


export type MutationDeleteOneFieldArgs = {
  input: DeleteOneFieldInput;
};


export type MutationDeleteOneObjectArgs = {
  input: DeleteOneObjectInput;
};


export type MutationDeleteOneServerlessFunctionArgs = {
  input: ServerlessFunctionIdInput;
};


export type MutationDeleteSsoIdentityProviderArgs = {
  input: DeleteSsoInput;
};


export type MutationDeleteWorkflowVersionStepArgs = {
  input: DeleteWorkflowVersionStepInput;
};


export type MutationDeleteWorkspaceInvitationArgs = {
  appTokenId: Scalars['String'];
};


export type MutationEditSsoIdentityProviderArgs = {
  input: EditSsoInput;
};


export type MutationEmailPasswordResetLinkArgs = {
  email: Scalars['String'];
};


export type MutationExecuteOneServerlessFunctionArgs = {
  input: ExecuteServerlessFunctionInput;
};


export type MutationGenerateApiKeyTokenArgs = {
  apiKeyId: Scalars['String'];
  expiresAt: Scalars['String'];
};


export type MutationGetAuthTokensFromLoginTokenArgs = {
  loginToken: Scalars['String'];
};


export type MutationGetAuthorizationUrlArgs = {
  input: GetAuthorizationUrlInput;
};


export type MutationGetLoginTokenFromCredentialsArgs = {
  captchaToken?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationGetLoginTokenFromEmailVerificationTokenArgs = {
  captchaToken?: InputMaybe<Scalars['String']>;
  emailVerificationToken: Scalars['String'];
};


export type MutationImpersonateArgs = {
  userId: Scalars['String'];
  workspaceId: Scalars['String'];
};


export type MutationPublishServerlessFunctionArgs = {
  input: PublishServerlessFunctionInput;
};


export type MutationRenewTokenArgs = {
  appToken: Scalars['String'];
};


export type MutationResendEmailVerificationTokenArgs = {
  email: Scalars['String'];
};


export type MutationResendWorkspaceInvitationArgs = {
  appTokenId: Scalars['String'];
};


export type MutationRunWorkflowVersionArgs = {
  input: RunWorkflowVersionInput;
};


export type MutationSendInvitationsArgs = {
  emails: Array<Scalars['String']>;
};


export type MutationSignUpArgs = {
  captchaToken?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  workspaceId?: InputMaybe<Scalars['String']>;
  workspaceInviteHash?: InputMaybe<Scalars['String']>;
  workspacePersonalInviteToken?: InputMaybe<Scalars['String']>;
};


export type MutationTrackArgs = {
  action: Scalars['String'];
  payload: Scalars['JSON'];
};


export type MutationUpdateLabPublicFeatureFlagArgs = {
  input: UpdateLabPublicFeatureFlagInput;
};


export type MutationUpdateOneFieldArgs = {
  input: UpdateOneFieldMetadataInput;
};


export type MutationUpdateOneObjectArgs = {
  input: UpdateOneObjectInput;
};


export type MutationUpdateOneServerlessFunctionArgs = {
  input: UpdateServerlessFunctionInput;
};


export type MutationUpdatePasswordViaResetTokenArgs = {
  newPassword: Scalars['String'];
  passwordResetToken: Scalars['String'];
};


export type MutationUpdateWorkflowVersionStepArgs = {
  input: UpdateWorkflowVersionStepInput;
};


export type MutationUpdateWorkspaceArgs = {
  data: UpdateWorkspaceInput;
};


export type MutationUpdateWorkspaceFeatureFlagArgs = {
  featureFlag: Scalars['String'];
  value: Scalars['Boolean'];
  workspaceId: Scalars['String'];
};


export type MutationUpdateWorkspaceMemberRoleArgs = {
  roleId?: InputMaybe<Scalars['String']>;
  workspaceMemberId: Scalars['String'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
  fileFolder?: InputMaybe<FileFolder>;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload'];
  fileFolder?: InputMaybe<FileFolder>;
};


export type MutationUploadProfilePictureArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadWorkspaceLogoArgs = {
  file: Scalars['Upload'];
};


export type MutationUserLookupAdminPanelArgs = {
  userIdentifier: Scalars['String'];
};

export type Object = {
  __typename?: 'Object';
  createdAt: Scalars['DateTime'];
  dataSourceId: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fields: ObjectFieldsConnection;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  imageIdentifierFieldMetadataId?: Maybe<Scalars['String']>;
  indexMetadatas: ObjectIndexMetadatasConnection;
  isActive: Scalars['Boolean'];
  isCustom: Scalars['Boolean'];
  isLabelSyncedWithName: Scalars['Boolean'];
  isRemote: Scalars['Boolean'];
  isSystem: Scalars['Boolean'];
  labelIdentifierFieldMetadataId?: Maybe<Scalars['String']>;
  labelPlural: Scalars['String'];
  labelSingular: Scalars['String'];
  namePlural: Scalars['String'];
  nameSingular: Scalars['String'];
  shortcut?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


export type ObjectFieldsArgs = {
  filter?: FieldFilter;
  paging?: CursorPaging;
};


export type ObjectIndexMetadatasArgs = {
  filter?: IndexFilter;
  paging?: CursorPaging;
};

export type ObjectConnection = {
  __typename?: 'ObjectConnection';
  /** Array of edges. */
  edges: Array<ObjectEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ObjectEdge = {
  __typename?: 'ObjectEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Object */
  node: Object;
};

export type ObjectFieldsConnection = {
  __typename?: 'ObjectFieldsConnection';
  /** Array of edges. */
  edges: Array<FieldEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type ObjectFilter = {
  and?: InputMaybe<Array<ObjectFilter>>;
  id?: InputMaybe<UuidFilterComparison>;
  isActive?: InputMaybe<BooleanFieldComparison>;
  isCustom?: InputMaybe<BooleanFieldComparison>;
  isRemote?: InputMaybe<BooleanFieldComparison>;
  isSystem?: InputMaybe<BooleanFieldComparison>;
  or?: InputMaybe<Array<ObjectFilter>>;
};

export type ObjectIndexMetadatasConnection = {
  __typename?: 'ObjectIndexMetadatasConnection';
  /** Array of edges. */
  edges: Array<IndexEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

/** Onboarding status */
export enum OnboardingStatus {
  COMPLETED = 'COMPLETED',
  INVITE_TEAM = 'INVITE_TEAM',
  PLAN_REQUIRED = 'PLAN_REQUIRED',
  PROFILE_CREATION = 'PROFILE_CREATION',
  SYNC_EMAIL = 'SYNC_EMAIL',
  WORKSPACE_ACTIVATION = 'WORKSPACE_ACTIVATION'
}

export type OnboardingStepSuccess = {
  __typename?: 'OnboardingStepSuccess';
  /** Boolean that confirms query was dispatched */
  success: Scalars['Boolean'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last returned record. */
  endCursor?: Maybe<Scalars['ConnectionCursor']>;
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  /** The cursor of the first returned record. */
  startCursor?: Maybe<Scalars['ConnectionCursor']>;
};

export type PostgresCredentials = {
  __typename?: 'PostgresCredentials';
  id: Scalars['UUID'];
  password: Scalars['String'];
  user: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type PublicFeatureFlag = {
  __typename?: 'PublicFeatureFlag';
  key: FeatureFlagKey;
  metadata: PublicFeatureFlagMetadata;
};

export type PublicFeatureFlagMetadata = {
  __typename?: 'PublicFeatureFlagMetadata';
  description: Scalars['String'];
  imagePath: Scalars['String'];
  label: Scalars['String'];
};

export type PublicWorkspaceDataOutput = {
  __typename?: 'PublicWorkspaceDataOutput';
  authProviders: AuthProviders;
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
  workspaceUrls: WorkspaceUrls;
};

export type PublishServerlessFunctionInput = {
  /** The id of the function. */
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  billingPortalSession: BillingSessionOutput;
  checkUserExists: UserExistsOutput;
  checkWorkspaceInviteHashIsValid: WorkspaceInviteHashValid;
  clientConfig: ClientConfig;
  currentUser: User;
  currentWorkspace: Workspace;
  field: Field;
  fields: FieldConnection;
  findAvailableWorkspacesByEmail: Array<AvailableWorkspaceOutput>;
  findManyServerlessFunctions: Array<ServerlessFunction>;
  findOneServerlessFunction: ServerlessFunction;
  findWorkspaceFromInviteHash: Workspace;
  findWorkspaceInvitations: Array<WorkspaceInvitation>;
  getAvailablePackages: Scalars['JSON'];
  getCustomDomainDetails?: Maybe<CustomDomainDetails>;
  getEnvironmentVariablesGrouped: EnvironmentVariablesOutput;
  getPostgresCredentials?: Maybe<PostgresCredentials>;
  getProductPrices: BillingProductPricesOutput;
  getPublicWorkspaceDataByDomain: PublicWorkspaceDataOutput;
  getRoles: Array<Role>;
  getServerlessFunctionSourceCode?: Maybe<Scalars['JSON']>;
  getTimelineCalendarEventsFromCompanyId: TimelineCalendarEventsWithTotal;
  getTimelineCalendarEventsFromPersonId: TimelineCalendarEventsWithTotal;
  getTimelineThreadsFromCompanyId: TimelineThreadsWithTotal;
  getTimelineThreadsFromPersonId: TimelineThreadsWithTotal;
  index: Index;
  indexMetadatas: IndexConnection;
  listSSOIdentityProvidersByWorkspaceId: Array<FindAvailableSsoidpOutput>;
  object: Object;
  objects: ObjectConnection;
  plans: Array<BillingPlanOutput>;
  validatePasswordResetToken: ValidatePasswordResetToken;
};


export type QueryBillingPortalSessionArgs = {
  returnUrlPath?: InputMaybe<Scalars['String']>;
};


export type QueryCheckUserExistsArgs = {
  captchaToken?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};


export type QueryCheckWorkspaceInviteHashIsValidArgs = {
  inviteHash: Scalars['String'];
};


export type QueryFindAvailableWorkspacesByEmailArgs = {
  email: Scalars['String'];
};


export type QueryFindOneServerlessFunctionArgs = {
  input: ServerlessFunctionIdInput;
};


export type QueryFindWorkspaceFromInviteHashArgs = {
  inviteHash: Scalars['String'];
};


export type QueryGetAvailablePackagesArgs = {
  input: ServerlessFunctionIdInput;
};


export type QueryGetProductPricesArgs = {
  product: Scalars['String'];
};


export type QueryGetServerlessFunctionSourceCodeArgs = {
  input: GetServerlessFunctionSourceCodeInput;
};


export type QueryGetTimelineCalendarEventsFromCompanyIdArgs = {
  companyId: Scalars['UUID'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};


export type QueryGetTimelineCalendarEventsFromPersonIdArgs = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  personId: Scalars['UUID'];
};


export type QueryGetTimelineThreadsFromCompanyIdArgs = {
  companyId: Scalars['UUID'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};


export type QueryGetTimelineThreadsFromPersonIdArgs = {
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
  personId: Scalars['UUID'];
};


export type QueryValidatePasswordResetTokenArgs = {
  passwordResetToken: Scalars['String'];
};

export type Relation = {
  __typename?: 'Relation';
  sourceFieldMetadata: Field;
  sourceObjectMetadata: Object;
  targetFieldMetadata: Field;
  targetObjectMetadata: Object;
  type: RelationType;
};

export type RelationDefinition = {
  __typename?: 'RelationDefinition';
  direction: RelationDefinitionType;
  relationId: Scalars['UUID'];
  sourceFieldMetadata: Field;
  sourceObjectMetadata: Object;
  targetFieldMetadata: Field;
  targetObjectMetadata: Object;
};

/** Relation definition type */
export enum RelationDefinitionType {
  MANY_TO_MANY = 'MANY_TO_MANY',
  MANY_TO_ONE = 'MANY_TO_ONE',
  ONE_TO_MANY = 'ONE_TO_MANY',
  ONE_TO_ONE = 'ONE_TO_ONE'
}

export type RelationMetadata = {
  __typename?: 'RelationMetadata';
  createdAt: Scalars['DateTime'];
  fromFieldMetadataId: Scalars['String'];
  fromObjectMetadata: Object;
  fromObjectMetadataId: Scalars['String'];
  id: Scalars['UUID'];
  relationType: RelationMetadataType;
  toFieldMetadataId: Scalars['String'];
  toObjectMetadata: Object;
  toObjectMetadataId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RelationMetadataConnection = {
  __typename?: 'RelationMetadataConnection';
  /** Array of edges. */
  edges: Array<RelationMetadataEdge>;
  /** Paging information */
  pageInfo: PageInfo;
};

export type RelationMetadataEdge = {
  __typename?: 'RelationMetadataEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the RelationMetadata */
  node: RelationMetadata;
};

/** Type of the relation */
export enum RelationMetadataType {
  MANY_TO_MANY = 'MANY_TO_MANY',
  MANY_TO_ONE = 'MANY_TO_ONE',
  ONE_TO_MANY = 'ONE_TO_MANY',
  ONE_TO_ONE = 'ONE_TO_ONE'
}

/** Relation type */
export enum RelationType {
  MANY_TO_ONE = 'MANY_TO_ONE',
  ONE_TO_MANY = 'ONE_TO_MANY',
  ONE_TO_ONE = 'ONE_TO_ONE'
}

export type RemoteServer = {
  __typename?: 'RemoteServer';
  createdAt: Scalars['DateTime'];
  foreignDataWrapperId: Scalars['ID'];
  foreignDataWrapperOptions?: Maybe<Scalars['JSON']>;
  foreignDataWrapperType: Scalars['String'];
  id: Scalars['ID'];
  label: Scalars['String'];
  schema?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userMappingOptions?: Maybe<UserMappingOptionsUser>;
};

export type RemoteTable = {
  __typename?: 'RemoteTable';
  id?: Maybe<Scalars['UUID']>;
  name: Scalars['String'];
  schema?: Maybe<Scalars['String']>;
  schemaPendingUpdates?: Maybe<Array<DistantTableUpdate>>;
  status: RemoteTableStatus;
};

/** Status of the table */
export enum RemoteTableStatus {
  NOT_SYNCED = 'NOT_SYNCED',
  SYNCED = 'SYNCED'
}

export type ResendEmailVerificationTokenOutput = {
  __typename?: 'ResendEmailVerificationTokenOutput';
  success: Scalars['Boolean'];
};

export type Role = {
  __typename?: 'Role';
  canUpdateAllSettings: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isEditable: Scalars['Boolean'];
  label: Scalars['String'];
  workspaceMembers: Array<WorkspaceMember>;
};

export type RunWorkflowVersionInput = {
  /** Execution result in JSON format */
  payload?: InputMaybe<Scalars['JSON']>;
  /** Workflow version ID */
  workflowVersionId: Scalars['String'];
};

export type SsoConnection = {
  __typename?: 'SSOConnection';
  id: Scalars['String'];
  issuer: Scalars['String'];
  name: Scalars['String'];
  status: SsoIdentityProviderStatus;
  type: IdentityProviderType;
};

export type SsoIdentityProvider = {
  __typename?: 'SSOIdentityProvider';
  id: Scalars['String'];
  issuer: Scalars['String'];
  name: Scalars['String'];
  status: SsoIdentityProviderStatus;
  type: IdentityProviderType;
};

export enum SsoIdentityProviderStatus {
  Active = 'Active',
  Error = 'Error',
  Inactive = 'Inactive'
}

export type SendInvitationsOutput = {
  __typename?: 'SendInvitationsOutput';
  errors: Array<Scalars['String']>;
  result: Array<WorkspaceInvitation>;
  /** Boolean that confirms query was dispatched */
  success: Scalars['Boolean'];
};

export type Sentry = {
  __typename?: 'Sentry';
  dsn?: Maybe<Scalars['String']>;
  environment?: Maybe<Scalars['String']>;
  release?: Maybe<Scalars['String']>;
};

export type ServerlessFunction = {
  __typename?: 'ServerlessFunction';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  latestVersion?: Maybe<Scalars['String']>;
  latestVersionInputSchema?: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  publishedVersions: Array<Scalars['String']>;
  runtime: Scalars['String'];
  syncStatus: ServerlessFunctionSyncStatus;
  timeoutSeconds: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ServerlessFunctionExecutionResult = {
  __typename?: 'ServerlessFunctionExecutionResult';
  /** Execution result in JSON format */
  data?: Maybe<Scalars['JSON']>;
  /** Execution duration in milliseconds */
  duration: Scalars['Float'];
  /** Execution error in JSON format */
  error?: Maybe<Scalars['JSON']>;
  /** Execution status */
  status: ServerlessFunctionExecutionStatus;
};

/** Status of the serverless function execution */
export enum ServerlessFunctionExecutionStatus {
  ERROR = 'ERROR',
  IDLE = 'IDLE',
  SUCCESS = 'SUCCESS'
}

export type ServerlessFunctionIdInput = {
  /** The id of the function. */
  id: Scalars['ID'];
};

/** SyncStatus of the serverlessFunction */
export enum ServerlessFunctionSyncStatus {
  BUILDING = 'BUILDING',
  NOT_READY = 'NOT_READY',
  READY = 'READY'
}

export enum SettingsFeatures {
  ADMIN_PANEL = 'ADMIN_PANEL',
  API_KEYS_AND_WEBHOOKS = 'API_KEYS_AND_WEBHOOKS',
  DATA_MODEL = 'DATA_MODEL',
  ROLES = 'ROLES',
  SECURITY_SETTINGS = 'SECURITY_SETTINGS',
  WORKSPACE_SETTINGS = 'WORKSPACE_SETTINGS',
  WORKSPACE_USERS = 'WORKSPACE_USERS'
}

export type SetupOidcSsoInput = {
  clientID: Scalars['String'];
  clientSecret: Scalars['String'];
  issuer: Scalars['String'];
  name: Scalars['String'];
};

export type SetupSamlSsoInput = {
  certificate: Scalars['String'];
  fingerprint?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  issuer: Scalars['String'];
  name: Scalars['String'];
  ssoURL: Scalars['String'];
};

export type SetupSsoOutput = {
  __typename?: 'SetupSsoOutput';
  id: Scalars['String'];
  issuer: Scalars['String'];
  name: Scalars['String'];
  status: SsoIdentityProviderStatus;
  type: IdentityProviderType;
};

export type SignUpOutput = {
  __typename?: 'SignUpOutput';
  loginToken: AuthToken;
  workspace: WorkspaceUrlsAndId;
};

export enum SubscriptionInterval {
  Day = 'Day',
  Month = 'Month',
  Week = 'Week',
  Year = 'Year'
}

export enum SubscriptionStatus {
  Active = 'Active',
  Canceled = 'Canceled',
  Incomplete = 'Incomplete',
  IncompleteExpired = 'IncompleteExpired',
  PastDue = 'PastDue',
  Paused = 'Paused',
  Trialing = 'Trialing',
  Unpaid = 'Unpaid'
}

export type Support = {
  __typename?: 'Support';
  supportDriver: Scalars['String'];
  supportFrontChatId?: Maybe<Scalars['String']>;
};

export type TimelineCalendarEvent = {
  __typename?: 'TimelineCalendarEvent';
  conferenceLink: LinksMetadata;
  conferenceSolution: Scalars['String'];
  description: Scalars['String'];
  endsAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  isCanceled: Scalars['Boolean'];
  isFullDay: Scalars['Boolean'];
  location: Scalars['String'];
  participants: Array<TimelineCalendarEventParticipant>;
  startsAt: Scalars['DateTime'];
  title: Scalars['String'];
  visibility: CalendarChannelVisibility;
};

export type TimelineCalendarEventParticipant = {
  __typename?: 'TimelineCalendarEventParticipant';
  avatarUrl: Scalars['String'];
  displayName: Scalars['String'];
  firstName: Scalars['String'];
  handle: Scalars['String'];
  lastName: Scalars['String'];
  personId?: Maybe<Scalars['UUID']>;
  workspaceMemberId?: Maybe<Scalars['UUID']>;
};

export type TimelineCalendarEventsWithTotal = {
  __typename?: 'TimelineCalendarEventsWithTotal';
  timelineCalendarEvents: Array<TimelineCalendarEvent>;
  totalNumberOfCalendarEvents: Scalars['Int'];
};

export type TimelineThread = {
  __typename?: 'TimelineThread';
  firstParticipant: TimelineThreadParticipant;
  id: Scalars['UUID'];
  lastMessageBody: Scalars['String'];
  lastMessageReceivedAt: Scalars['DateTime'];
  lastTwoParticipants: Array<TimelineThreadParticipant>;
  numberOfMessagesInThread: Scalars['Float'];
  participantCount: Scalars['Float'];
  read: Scalars['Boolean'];
  subject: Scalars['String'];
  visibility: MessageChannelVisibility;
};

export type TimelineThreadParticipant = {
  __typename?: 'TimelineThreadParticipant';
  avatarUrl: Scalars['String'];
  displayName: Scalars['String'];
  firstName: Scalars['String'];
  handle: Scalars['String'];
  lastName: Scalars['String'];
  personId?: Maybe<Scalars['UUID']>;
  workspaceMemberId?: Maybe<Scalars['UUID']>;
};

export type TimelineThreadsWithTotal = {
  __typename?: 'TimelineThreadsWithTotal';
  timelineThreads: Array<TimelineThread>;
  totalNumberOfThreads: Scalars['Int'];
};

export type TransientToken = {
  __typename?: 'TransientToken';
  transientToken: AuthToken;
};

export type UuidFilterComparison = {
  eq?: InputMaybe<Scalars['UUID']>;
  gt?: InputMaybe<Scalars['UUID']>;
  gte?: InputMaybe<Scalars['UUID']>;
  iLike?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<Scalars['UUID']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['UUID']>;
  lt?: InputMaybe<Scalars['UUID']>;
  lte?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
  notILike?: InputMaybe<Scalars['UUID']>;
  notIn?: InputMaybe<Array<Scalars['UUID']>>;
  notLike?: InputMaybe<Scalars['UUID']>;
};

export type UpdateFieldInput = {
  defaultValue?: InputMaybe<Scalars['JSON']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isLabelSyncedWithName?: InputMaybe<Scalars['Boolean']>;
  isNullable?: InputMaybe<Scalars['Boolean']>;
  isSystem?: InputMaybe<Scalars['Boolean']>;
  isUnique?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Scalars['JSON']>;
  settings?: InputMaybe<Scalars['JSON']>;
};

export type UpdateLabPublicFeatureFlagInput = {
  publicFeatureFlag: Scalars['String'];
  value: Scalars['Boolean'];
};

export type UpdateObjectPayload = {
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  imageIdentifierFieldMetadataId?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isLabelSyncedWithName?: InputMaybe<Scalars['Boolean']>;
  labelIdentifierFieldMetadataId?: InputMaybe<Scalars['String']>;
  labelPlural?: InputMaybe<Scalars['String']>;
  labelSingular?: InputMaybe<Scalars['String']>;
  namePlural?: InputMaybe<Scalars['String']>;
  nameSingular?: InputMaybe<Scalars['String']>;
  shortcut?: InputMaybe<Scalars['String']>;
};

export type UpdateOneFieldMetadataInput = {
  /** The id of the record to update */
  id: Scalars['UUID'];
  /** The record to update */
  update: UpdateFieldInput;
};

export type UpdateOneObjectInput = {
  /** The id of the object to update */
  id: Scalars['UUID'];
  update: UpdateObjectPayload;
};

export type UpdateServerlessFunctionInput = {
  code: Scalars['JSON'];
  description?: InputMaybe<Scalars['String']>;
  /** Id of the serverless function to execute */
  id: Scalars['UUID'];
  name: Scalars['String'];
  timeoutSeconds?: InputMaybe<Scalars['Float']>;
};

export type UpdateWorkflowVersionStepInput = {
  /** Step to update in JSON format */
  step: Scalars['JSON'];
  /** Workflow version ID */
  workflowVersionId: Scalars['String'];
};

export type UpdateWorkspaceInput = {
  allowImpersonation?: InputMaybe<Scalars['Boolean']>;
  customDomain?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  inviteHash?: InputMaybe<Scalars['String']>;
  isGoogleAuthEnabled?: InputMaybe<Scalars['Boolean']>;
  isMicrosoftAuthEnabled?: InputMaybe<Scalars['Boolean']>;
  isPasswordAuthEnabled?: InputMaybe<Scalars['Boolean']>;
  isPublicInviteLinkEnabled?: InputMaybe<Scalars['Boolean']>;
  logo?: InputMaybe<Scalars['String']>;
  subdomain?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  analyticsTinybirdJwts?: Maybe<AnalyticsTinybirdJwtMap>;
  canImpersonate: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  currentUserWorkspace?: Maybe<UserWorkspace>;
  currentWorkspace?: Maybe<Workspace>;
  defaultAvatarUrl?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['UUID'];
  isEmailVerified: Scalars['Boolean'];
  lastName: Scalars['String'];
  locale: Scalars['String'];
  onboardingStatus?: Maybe<OnboardingStatus>;
  passwordHash?: Maybe<Scalars['String']>;
  supportUserHash?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userVars: Scalars['JSONObject'];
  workspaceMember?: Maybe<WorkspaceMember>;
  workspaceMembers?: Maybe<Array<WorkspaceMember>>;
  workspaces: Array<UserWorkspace>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the User */
  node: User;
};

export type UserExists = {
  __typename?: 'UserExists';
  availableWorkspaces: Array<AvailableWorkspaceOutput>;
  exists: Scalars['Boolean'];
  isEmailVerified: Scalars['Boolean'];
};

export type UserExistsOutput = UserExists | UserNotExists;

export type UserInfo = {
  __typename?: 'UserInfo';
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
};

export type UserLookup = {
  __typename?: 'UserLookup';
  user: UserInfo;
  workspaces: Array<WorkspaceInfo>;
};

export type UserMappingOptionsUser = {
  __typename?: 'UserMappingOptionsUser';
  user?: Maybe<Scalars['String']>;
};

export type UserNotExists = {
  __typename?: 'UserNotExists';
  exists: Scalars['Boolean'];
};

export type UserWorkspace = {
  __typename?: 'UserWorkspace';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['UUID'];
  settingsPermissions?: Maybe<Array<SettingsFeatures>>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['String'];
};

export type ValidatePasswordResetToken = {
  __typename?: 'ValidatePasswordResetToken';
  email: Scalars['String'];
  id: Scalars['String'];
};

export type WorkflowAction = {
  __typename?: 'WorkflowAction';
  id: Scalars['UUID'];
  name: Scalars['String'];
  settings: Scalars['JSON'];
  type: Scalars['String'];
  valid: Scalars['Boolean'];
};

export type WorkflowRun = {
  __typename?: 'WorkflowRun';
  workflowRunId: Scalars['UUID'];
};

export type WorkflowVersion = {
  __typename?: 'WorkflowVersion';
  id: Scalars['UUID'];
};

export type Workspace = {
  __typename?: 'Workspace';
  activationStatus: WorkspaceActivationStatus;
  allowImpersonation: Scalars['Boolean'];
  billingSubscriptions: Array<BillingSubscription>;
  createdAt: Scalars['DateTime'];
  currentBillingSubscription?: Maybe<BillingSubscription>;
  customDomain?: Maybe<Scalars['String']>;
  databaseSchema: Scalars['String'];
  databaseUrl: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  displayName?: Maybe<Scalars['String']>;
  featureFlags?: Maybe<Array<FeatureFlag>>;
  hasValidEnterpriseKey: Scalars['Boolean'];
  id: Scalars['UUID'];
  inviteHash?: Maybe<Scalars['String']>;
  isGoogleAuthEnabled: Scalars['Boolean'];
  isMicrosoftAuthEnabled: Scalars['Boolean'];
  isPasswordAuthEnabled: Scalars['Boolean'];
  isPublicInviteLinkEnabled: Scalars['Boolean'];
  logo?: Maybe<Scalars['String']>;
  metadataVersion: Scalars['Float'];
  subdomain: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  workspaceMembersCount?: Maybe<Scalars['Float']>;
  workspaceUrls: WorkspaceUrls;
};

export enum WorkspaceActivationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ONGOING_CREATION = 'ONGOING_CREATION',
  PENDING_CREATION = 'PENDING_CREATION',
  SUSPENDED = 'SUSPENDED'
}

export type WorkspaceEdge = {
  __typename?: 'WorkspaceEdge';
  /** Cursor for this node. */
  cursor: Scalars['ConnectionCursor'];
  /** The node containing the Workspace */
  node: Workspace;
};

export type WorkspaceInfo = {
  __typename?: 'WorkspaceInfo';
  allowImpersonation: Scalars['Boolean'];
  featureFlags: Array<FeatureFlag>;
  id: Scalars['String'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  totalUsers: Scalars['Float'];
  users: Array<UserInfo>;
};

export type WorkspaceInvitation = {
  __typename?: 'WorkspaceInvitation';
  email: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  id: Scalars['UUID'];
};

export type WorkspaceInviteHashValid = {
  __typename?: 'WorkspaceInviteHashValid';
  isValid: Scalars['Boolean'];
};

export type WorkspaceMember = {
  __typename?: 'WorkspaceMember';
  avatarUrl?: Maybe<Scalars['String']>;
  colorScheme: Scalars['String'];
  dateFormat?: Maybe<WorkspaceMemberDateFormatEnum>;
  id: Scalars['UUID'];
  locale?: Maybe<Scalars['String']>;
  name: FullName;
  roles?: Maybe<Array<Role>>;
  timeFormat?: Maybe<WorkspaceMemberTimeFormatEnum>;
  timeZone?: Maybe<Scalars['String']>;
  userEmail: Scalars['String'];
  userWorkspaceId?: Maybe<Scalars['String']>;
};

/** Date format as Month first, Day first, Year first or system as default */
export enum WorkspaceMemberDateFormatEnum {
  DAY_FIRST = 'DAY_FIRST',
  MONTH_FIRST = 'MONTH_FIRST',
  SYSTEM = 'SYSTEM',
  YEAR_FIRST = 'YEAR_FIRST'
}

/** Time time as Military, Standard or system as default */
export enum WorkspaceMemberTimeFormatEnum {
  HOUR_12 = 'HOUR_12',
  HOUR_24 = 'HOUR_24',
  SYSTEM = 'SYSTEM'
}

export type WorkspaceNameAndId = {
  __typename?: 'WorkspaceNameAndId';
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type WorkspaceUrlsAndId = {
  __typename?: 'WorkspaceUrlsAndId';
  id: Scalars['String'];
  workspaceUrls: WorkspaceUrls;
};

export type WorkspaceUrls = {
  __typename?: 'workspaceUrls';
  customUrl?: Maybe<Scalars['String']>;
  subdomainUrl: Scalars['String'];
};

export type TimelineCalendarEventFragmentFragment = { __typename?: 'TimelineCalendarEvent', id: any, title: string, description: string, location: string, startsAt: string, endsAt: string, isFullDay: boolean, visibility: CalendarChannelVisibility, participants: Array<{ __typename?: 'TimelineCalendarEventParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }> };

export type TimelineCalendarEventParticipantFragmentFragment = { __typename?: 'TimelineCalendarEventParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string };

export type TimelineCalendarEventsWithTotalFragmentFragment = { __typename?: 'TimelineCalendarEventsWithTotal', totalNumberOfCalendarEvents: number, timelineCalendarEvents: Array<{ __typename?: 'TimelineCalendarEvent', id: any, title: string, description: string, location: string, startsAt: string, endsAt: string, isFullDay: boolean, visibility: CalendarChannelVisibility, participants: Array<{ __typename?: 'TimelineCalendarEventParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }> }> };

export type GetTimelineCalendarEventsFromCompanyIdQueryVariables = Exact<{
  companyId: Scalars['UUID'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetTimelineCalendarEventsFromCompanyIdQuery = { __typename?: 'Query', getTimelineCalendarEventsFromCompanyId: { __typename?: 'TimelineCalendarEventsWithTotal', totalNumberOfCalendarEvents: number, timelineCalendarEvents: Array<{ __typename?: 'TimelineCalendarEvent', id: any, title: string, description: string, location: string, startsAt: string, endsAt: string, isFullDay: boolean, visibility: CalendarChannelVisibility, participants: Array<{ __typename?: 'TimelineCalendarEventParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }> }> } };

export type GetTimelineCalendarEventsFromPersonIdQueryVariables = Exact<{
  personId: Scalars['UUID'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetTimelineCalendarEventsFromPersonIdQuery = { __typename?: 'Query', getTimelineCalendarEventsFromPersonId: { __typename?: 'TimelineCalendarEventsWithTotal', totalNumberOfCalendarEvents: number, timelineCalendarEvents: Array<{ __typename?: 'TimelineCalendarEvent', id: any, title: string, description: string, location: string, startsAt: string, endsAt: string, isFullDay: boolean, visibility: CalendarChannelVisibility, participants: Array<{ __typename?: 'TimelineCalendarEventParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }> }> } };

export type ParticipantFragmentFragment = { __typename?: 'TimelineThreadParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string };

export type TimelineThreadFragmentFragment = { __typename?: 'TimelineThread', id: any, read: boolean, visibility: MessageChannelVisibility, lastMessageReceivedAt: string, lastMessageBody: string, subject: string, numberOfMessagesInThread: number, participantCount: number, firstParticipant: { __typename?: 'TimelineThreadParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }, lastTwoParticipants: Array<{ __typename?: 'TimelineThreadParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }> };

export type TimelineThreadsWithTotalFragmentFragment = { __typename?: 'TimelineThreadsWithTotal', totalNumberOfThreads: number, timelineThreads: Array<{ __typename?: 'TimelineThread', id: any, read: boolean, visibility: MessageChannelVisibility, lastMessageReceivedAt: string, lastMessageBody: string, subject: string, numberOfMessagesInThread: number, participantCount: number, firstParticipant: { __typename?: 'TimelineThreadParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }, lastTwoParticipants: Array<{ __typename?: 'TimelineThreadParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }> }> };

export type GetTimelineThreadsFromCompanyIdQueryVariables = Exact<{
  companyId: Scalars['UUID'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetTimelineThreadsFromCompanyIdQuery = { __typename?: 'Query', getTimelineThreadsFromCompanyId: { __typename?: 'TimelineThreadsWithTotal', totalNumberOfThreads: number, timelineThreads: Array<{ __typename?: 'TimelineThread', id: any, read: boolean, visibility: MessageChannelVisibility, lastMessageReceivedAt: string, lastMessageBody: string, subject: string, numberOfMessagesInThread: number, participantCount: number, firstParticipant: { __typename?: 'TimelineThreadParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }, lastTwoParticipants: Array<{ __typename?: 'TimelineThreadParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }> }> } };

export type GetTimelineThreadsFromPersonIdQueryVariables = Exact<{
  personId: Scalars['UUID'];
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type GetTimelineThreadsFromPersonIdQuery = { __typename?: 'Query', getTimelineThreadsFromPersonId: { __typename?: 'TimelineThreadsWithTotal', totalNumberOfThreads: number, timelineThreads: Array<{ __typename?: 'TimelineThread', id: any, read: boolean, visibility: MessageChannelVisibility, lastMessageReceivedAt: string, lastMessageBody: string, subject: string, numberOfMessagesInThread: number, participantCount: number, firstParticipant: { __typename?: 'TimelineThreadParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }, lastTwoParticipants: Array<{ __typename?: 'TimelineThreadParticipant', personId?: any | null, workspaceMemberId?: any | null, firstName: string, lastName: string, displayName: string, avatarUrl: string, handle: string }> }> } };

export type TrackMutationVariables = Exact<{
  action: Scalars['String'];
  payload: Scalars['JSON'];
}>;


export type TrackMutation = { __typename?: 'Mutation', track: { __typename?: 'Analytics', success: boolean } };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
  fileFolder?: InputMaybe<FileFolder>;
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: string };

export type UploadImageMutationVariables = Exact<{
  file: Scalars['Upload'];
  fileFolder?: InputMaybe<FileFolder>;
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: string };

export type AuthTokenFragmentFragment = { __typename?: 'AuthToken', token: string, expiresAt: string };

export type AuthTokensFragmentFragment = { __typename?: 'AuthTokenPair', accessToken: { __typename?: 'AuthToken', token: string, expiresAt: string }, refreshToken: { __typename?: 'AuthToken', token: string, expiresAt: string } };

export type AvailableSsoIdentityProvidersFragmentFragment = { __typename?: 'FindAvailableSSOIDPOutput', id: string, issuer: string, name: string, status: SsoIdentityProviderStatus, workspace: { __typename?: 'WorkspaceNameAndId', id: string, displayName?: string | null } };

export type AuthorizeAppMutationVariables = Exact<{
  clientId: Scalars['String'];
  codeChallenge: Scalars['String'];
  redirectUrl: Scalars['String'];
}>;


export type AuthorizeAppMutation = { __typename?: 'Mutation', authorizeApp: { __typename?: 'AuthorizeApp', redirectUrl: string } };

export type EmailPasswordResetLinkMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type EmailPasswordResetLinkMutation = { __typename?: 'Mutation', emailPasswordResetLink: { __typename?: 'EmailPasswordResetLink', success: boolean } };

export type GenerateApiKeyTokenMutationVariables = Exact<{
  apiKeyId: Scalars['String'];
  expiresAt: Scalars['String'];
}>;


export type GenerateApiKeyTokenMutation = { __typename?: 'Mutation', generateApiKeyToken: { __typename?: 'ApiKeyToken', token: string } };

export type GenerateTransientTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateTransientTokenMutation = { __typename?: 'Mutation', generateTransientToken: { __typename?: 'TransientToken', transientToken: { __typename?: 'AuthToken', token: string } } };

export type GetAuthTokensFromLoginTokenMutationVariables = Exact<{
  loginToken: Scalars['String'];
}>;


export type GetAuthTokensFromLoginTokenMutation = { __typename?: 'Mutation', getAuthTokensFromLoginToken: { __typename?: 'AuthTokens', tokens: { __typename?: 'AuthTokenPair', accessToken: { __typename?: 'AuthToken', token: string, expiresAt: string }, refreshToken: { __typename?: 'AuthToken', token: string, expiresAt: string } } } };

export type GetAuthorizationUrlMutationVariables = Exact<{
  input: GetAuthorizationUrlInput;
}>;


export type GetAuthorizationUrlMutation = { __typename?: 'Mutation', getAuthorizationUrl: { __typename?: 'GetAuthorizationUrlOutput', id: string, type: string, authorizationURL: string } };

export type GetLoginTokenFromCredentialsMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  captchaToken?: InputMaybe<Scalars['String']>;
}>;


export type GetLoginTokenFromCredentialsMutation = { __typename?: 'Mutation', getLoginTokenFromCredentials: { __typename?: 'LoginToken', loginToken: { __typename?: 'AuthToken', token: string, expiresAt: string } } };

export type GetLoginTokenFromEmailVerificationTokenMutationVariables = Exact<{
  emailVerificationToken: Scalars['String'];
  captchaToken?: InputMaybe<Scalars['String']>;
}>;


export type GetLoginTokenFromEmailVerificationTokenMutation = { __typename?: 'Mutation', getLoginTokenFromEmailVerificationToken: { __typename?: 'LoginToken', loginToken: { __typename?: 'AuthToken', token: string, expiresAt: string } } };

export type ImpersonateMutationVariables = Exact<{
  userId: Scalars['String'];
  workspaceId: Scalars['String'];
}>;


export type ImpersonateMutation = { __typename?: 'Mutation', impersonate: { __typename?: 'ImpersonateOutput', workspace: { __typename?: 'WorkspaceUrlsAndId', id: string, workspaceUrls: { __typename?: 'workspaceUrls', subdomainUrl: string, customUrl?: string | null } }, loginToken: { __typename?: 'AuthToken', token: string, expiresAt: string } } };

export type RenewTokenMutationVariables = Exact<{
  appToken: Scalars['String'];
}>;


export type RenewTokenMutation = { __typename?: 'Mutation', renewToken: { __typename?: 'AuthTokens', tokens: { __typename?: 'AuthTokenPair', accessToken: { __typename?: 'AuthToken', token: string, expiresAt: string }, refreshToken: { __typename?: 'AuthToken', token: string, expiresAt: string } } } };

export type ResendEmailVerificationTokenMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResendEmailVerificationTokenMutation = { __typename?: 'Mutation', resendEmailVerificationToken: { __typename?: 'ResendEmailVerificationTokenOutput', success: boolean } };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  workspaceInviteHash?: InputMaybe<Scalars['String']>;
  workspacePersonalInviteToken?: InputMaybe<Scalars['String']>;
  captchaToken?: InputMaybe<Scalars['String']>;
  workspaceId?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpOutput', loginToken: { __typename?: 'AuthToken', token: string, expiresAt: string }, workspace: { __typename?: 'WorkspaceUrlsAndId', id: string, workspaceUrls: { __typename?: 'workspaceUrls', subdomainUrl: string, customUrl?: string | null } } } };

export type UpdatePasswordViaResetTokenMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type UpdatePasswordViaResetTokenMutation = { __typename?: 'Mutation', updatePasswordViaResetToken: { __typename?: 'InvalidatePassword', success: boolean } };

export type CheckUserExistsQueryVariables = Exact<{
  email: Scalars['String'];
  captchaToken?: InputMaybe<Scalars['String']>;
}>;


export type CheckUserExistsQuery = { __typename?: 'Query', checkUserExists: { __typename: 'UserExists', exists: boolean, isEmailVerified: boolean, availableWorkspaces: Array<{ __typename?: 'AvailableWorkspaceOutput', id: string, displayName?: string | null, logo?: string | null, workspaceUrls: { __typename?: 'workspaceUrls', subdomainUrl: string, customUrl?: string | null }, sso: Array<{ __typename?: 'SSOConnection', type: IdentityProviderType, id: string, issuer: string, name: string, status: SsoIdentityProviderStatus }> }> } | { __typename: 'UserNotExists', exists: boolean } };

export type GetPublicWorkspaceDataByDomainQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicWorkspaceDataByDomainQuery = { __typename?: 'Query', getPublicWorkspaceDataByDomain: { __typename?: 'PublicWorkspaceDataOutput', id: string, logo?: string | null, displayName?: string | null, workspaceUrls: { __typename?: 'workspaceUrls', subdomainUrl: string, customUrl?: string | null }, authProviders: { __typename?: 'AuthProviders', google: boolean, magicLink: boolean, password: boolean, microsoft: boolean, sso: Array<{ __typename?: 'SSOIdentityProvider', id: string, name: string, type: IdentityProviderType, status: SsoIdentityProviderStatus, issuer: string }> } } };

export type ValidatePasswordResetTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidatePasswordResetTokenQuery = { __typename?: 'Query', validatePasswordResetToken: { __typename?: 'ValidatePasswordResetToken', id: string, email: string } };

export type BillingPortalSessionQueryVariables = Exact<{
  returnUrlPath?: InputMaybe<Scalars['String']>;
}>;


export type BillingPortalSessionQuery = { __typename?: 'Query', billingPortalSession: { __typename?: 'BillingSessionOutput', url?: string | null } };

export type CheckoutSessionMutationVariables = Exact<{
  recurringInterval: SubscriptionInterval;
  successUrlPath?: InputMaybe<Scalars['String']>;
  plan: BillingPlanKey;
  requirePaymentMethod: Scalars['Boolean'];
}>;


export type CheckoutSessionMutation = { __typename?: 'Mutation', checkoutSession: { __typename?: 'BillingSessionOutput', url?: string | null } };

export type GetProductPricesQueryVariables = Exact<{
  product: Scalars['String'];
}>;


export type GetProductPricesQuery = { __typename?: 'Query', getProductPrices: { __typename?: 'BillingProductPricesOutput', productPrices: Array<{ __typename?: 'BillingProductPriceDTO', created: number, recurringInterval: SubscriptionInterval, stripePriceId: string, unitAmount: number }> } };

export type UpdateBillingSubscriptionMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateBillingSubscriptionMutation = { __typename?: 'Mutation', updateBillingSubscription: { __typename?: 'BillingUpdateOutput', success: boolean } };

export type GetClientConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientConfigQuery = { __typename?: 'Query', clientConfig: { __typename?: 'ClientConfig', signInPrefilled: boolean, isMultiWorkspaceEnabled: boolean, isEmailVerificationRequired: boolean, defaultSubdomain?: string | null, frontDomain: string, debugMode: boolean, analyticsEnabled: boolean, chromeExtensionId?: string | null, canManageFeatureFlags: boolean, isMicrosoftMessagingEnabled: boolean, isMicrosoftCalendarEnabled: boolean, isGoogleMessagingEnabled: boolean, isGoogleCalendarEnabled: boolean, billing: { __typename?: 'Billing', isBillingEnabled: boolean, billingUrl?: string | null, trialPeriods: Array<{ __typename?: 'BillingTrialPeriodDTO', duration: number, isCreditCardRequired: boolean }> }, authProviders: { __typename?: 'AuthProviders', google: boolean, password: boolean, microsoft: boolean, sso: Array<{ __typename?: 'SSOIdentityProvider', id: string, name: string, type: IdentityProviderType, status: SsoIdentityProviderStatus, issuer: string }> }, support: { __typename?: 'Support', supportDriver: string, supportFrontChatId?: string | null }, sentry: { __typename?: 'Sentry', dsn?: string | null, environment?: string | null, release?: string | null }, captcha: { __typename?: 'Captcha', provider?: CaptchaDriverType | null, siteKey?: string | null }, api: { __typename?: 'ApiConfig', mutationMaximumAffectedRecords: number }, publicFeatureFlags: Array<{ __typename?: 'PublicFeatureFlag', key: FeatureFlagKey, metadata: { __typename?: 'PublicFeatureFlagMetadata', label: string, description: string, imagePath: string } }> } };

export type SkipSyncEmailOnboardingStepMutationVariables = Exact<{ [key: string]: never; }>;


export type SkipSyncEmailOnboardingStepMutation = { __typename?: 'Mutation', skipSyncEmailOnboardingStep: { __typename?: 'OnboardingStepSuccess', success: boolean } };

export type UpdateWorkspaceFeatureFlagMutationVariables = Exact<{
  workspaceId: Scalars['String'];
  featureFlag: Scalars['String'];
  value: Scalars['Boolean'];
}>;


export type UpdateWorkspaceFeatureFlagMutation = { __typename?: 'Mutation', updateWorkspaceFeatureFlag: boolean };

export type UserLookupAdminPanelMutationVariables = Exact<{
  userIdentifier: Scalars['String'];
}>;


export type UserLookupAdminPanelMutation = { __typename?: 'Mutation', userLookupAdminPanel: { __typename?: 'UserLookup', user: { __typename?: 'UserInfo', id: string, email: string, firstName?: string | null, lastName?: string | null }, workspaces: Array<{ __typename?: 'WorkspaceInfo', id: string, name: string, logo?: string | null, totalUsers: number, allowImpersonation: boolean, users: Array<{ __typename?: 'UserInfo', id: string, email: string, firstName?: string | null, lastName?: string | null }>, featureFlags: Array<{ __typename?: 'FeatureFlag', key: FeatureFlagKey, value: boolean }> }> } };

export type GetEnvironmentVariablesGroupedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEnvironmentVariablesGroupedQuery = { __typename?: 'Query', getEnvironmentVariablesGrouped: { __typename?: 'EnvironmentVariablesOutput', groups: Array<{ __typename?: 'EnvironmentVariablesGroupData', name: EnvironmentVariablesGroup, description: string, isHiddenOnLoad: boolean, variables: Array<{ __typename?: 'EnvironmentVariable', name: string, description: string, value: string, sensitive: boolean }> }> } };

export type UpdateLabPublicFeatureFlagMutationVariables = Exact<{
  input: UpdateLabPublicFeatureFlagInput;
}>;


export type UpdateLabPublicFeatureFlagMutation = { __typename?: 'Mutation', updateLabPublicFeatureFlag: { __typename?: 'FeatureFlag', id: any, key: FeatureFlagKey, value: boolean } };

export type RoleFragmentFragment = { __typename?: 'Role', id: string, label: string, description?: string | null, canUpdateAllSettings: boolean, isEditable: boolean };

export type UpdateWorkspaceMemberRoleMutationVariables = Exact<{
  workspaceMemberId: Scalars['String'];
  roleId?: InputMaybe<Scalars['String']>;
}>;


export type UpdateWorkspaceMemberRoleMutation = { __typename?: 'Mutation', updateWorkspaceMemberRole: { __typename?: 'WorkspaceMember', id: any, colorScheme: string, avatarUrl?: string | null, locale?: string | null, userEmail: string, timeZone?: string | null, dateFormat?: WorkspaceMemberDateFormatEnum | null, timeFormat?: WorkspaceMemberTimeFormatEnum | null, roles?: Array<{ __typename?: 'Role', id: string, label: string, description?: string | null, canUpdateAllSettings: boolean, isEditable: boolean }> | null, name: { __typename?: 'FullName', firstName: string, lastName: string } } };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', getRoles: Array<{ __typename?: 'Role', id: string, label: string, description?: string | null, canUpdateAllSettings: boolean, isEditable: boolean, workspaceMembers: Array<{ __typename?: 'WorkspaceMember', id: any, colorScheme: string, avatarUrl?: string | null, locale?: string | null, userEmail: string, timeZone?: string | null, dateFormat?: WorkspaceMemberDateFormatEnum | null, timeFormat?: WorkspaceMemberTimeFormatEnum | null, name: { __typename?: 'FullName', firstName: string, lastName: string } }> }> };

export type CreateOidcIdentityProviderMutationVariables = Exact<{
  input: SetupOidcSsoInput;
}>;


export type CreateOidcIdentityProviderMutation = { __typename?: 'Mutation', createOIDCIdentityProvider: { __typename?: 'SetupSsoOutput', id: string, type: IdentityProviderType, issuer: string, name: string, status: SsoIdentityProviderStatus } };

export type CreateSamlIdentityProviderMutationVariables = Exact<{
  input: SetupSamlSsoInput;
}>;


export type CreateSamlIdentityProviderMutation = { __typename?: 'Mutation', createSAMLIdentityProvider: { __typename?: 'SetupSsoOutput', id: string, type: IdentityProviderType, issuer: string, name: string, status: SsoIdentityProviderStatus } };

export type DeleteSsoIdentityProviderMutationVariables = Exact<{
  input: DeleteSsoInput;
}>;


export type DeleteSsoIdentityProviderMutation = { __typename?: 'Mutation', deleteSSOIdentityProvider: { __typename?: 'DeleteSsoOutput', identityProviderId: string } };

export type EditSsoIdentityProviderMutationVariables = Exact<{
  input: EditSsoInput;
}>;


export type EditSsoIdentityProviderMutation = { __typename?: 'Mutation', editSSOIdentityProvider: { __typename?: 'EditSsoOutput', id: string, type: IdentityProviderType, issuer: string, name: string, status: SsoIdentityProviderStatus } };

export type ListSsoIdentityProvidersByWorkspaceIdQueryVariables = Exact<{ [key: string]: never; }>;


export type ListSsoIdentityProvidersByWorkspaceIdQuery = { __typename?: 'Query', listSSOIdentityProvidersByWorkspaceId: Array<{ __typename?: 'FindAvailableSSOIDPOutput', type: IdentityProviderType, id: string, name: string, issuer: string, status: SsoIdentityProviderStatus }> };

export type UserQueryFragmentFragment = { __typename?: 'User', id: any, firstName: string, lastName: string, email: string, canImpersonate: boolean, supportUserHash?: string | null, onboardingStatus?: OnboardingStatus | null, userVars: any, analyticsTinybirdJwts?: { __typename?: 'AnalyticsTinybirdJwtMap', getWebhookAnalytics: string, getPageviewsAnalytics: string, getUsersAnalytics: string, getServerlessFunctionDuration: string, getServerlessFunctionSuccessRate: string, getServerlessFunctionErrorCount: string } | null, workspaceMember?: { __typename?: 'WorkspaceMember', id: any, colorScheme: string, avatarUrl?: string | null, locale?: string | null, userEmail: string, timeZone?: string | null, dateFormat?: WorkspaceMemberDateFormatEnum | null, timeFormat?: WorkspaceMemberTimeFormatEnum | null, name: { __typename?: 'FullName', firstName: string, lastName: string } } | null, workspaceMembers?: Array<{ __typename?: 'WorkspaceMember', id: any, colorScheme: string, avatarUrl?: string | null, locale?: string | null, userEmail: string, timeZone?: string | null, dateFormat?: WorkspaceMemberDateFormatEnum | null, timeFormat?: WorkspaceMemberTimeFormatEnum | null, name: { __typename?: 'FullName', firstName: string, lastName: string } }> | null, currentUserWorkspace?: { __typename?: 'UserWorkspace', settingsPermissions?: Array<SettingsFeatures> | null } | null, currentWorkspace?: { __typename?: 'Workspace', id: any, displayName?: string | null, logo?: string | null, inviteHash?: string | null, allowImpersonation: boolean, activationStatus: WorkspaceActivationStatus, isPublicInviteLinkEnabled: boolean, isGoogleAuthEnabled: boolean, isMicrosoftAuthEnabled: boolean, isPasswordAuthEnabled: boolean, subdomain: string, hasValidEnterpriseKey: boolean, customDomain?: string | null, metadataVersion: number, workspaceMembersCount?: number | null, workspaceUrls: { __typename?: 'workspaceUrls', subdomainUrl: string, customUrl?: string | null }, featureFlags?: Array<{ __typename?: 'FeatureFlag', id: any, key: FeatureFlagKey, value: boolean, workspaceId: string }> | null, currentBillingSubscription?: { __typename?: 'BillingSubscription', id: any, status: SubscriptionStatus, interval?: SubscriptionInterval | null } | null, billingSubscriptions: Array<{ __typename?: 'BillingSubscription', id: any, status: SubscriptionStatus }> } | null, workspaces: Array<{ __typename?: 'UserWorkspace', workspace?: { __typename?: 'Workspace', id: any, logo?: string | null, displayName?: string | null, subdomain: string, customDomain?: string | null, workspaceUrls: { __typename?: 'workspaceUrls', subdomainUrl: string, customUrl?: string | null } } | null }> };

export type DeleteUserAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserAccountMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: any } };

export type UploadProfilePictureMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadProfilePictureMutation = { __typename?: 'Mutation', uploadProfilePicture: string };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: any, firstName: string, lastName: string, email: string, canImpersonate: boolean, supportUserHash?: string | null, onboardingStatus?: OnboardingStatus | null, userVars: any, analyticsTinybirdJwts?: { __typename?: 'AnalyticsTinybirdJwtMap', getWebhookAnalytics: string, getPageviewsAnalytics: string, getUsersAnalytics: string, getServerlessFunctionDuration: string, getServerlessFunctionSuccessRate: string, getServerlessFunctionErrorCount: string } | null, workspaceMember?: { __typename?: 'WorkspaceMember', id: any, colorScheme: string, avatarUrl?: string | null, locale?: string | null, userEmail: string, timeZone?: string | null, dateFormat?: WorkspaceMemberDateFormatEnum | null, timeFormat?: WorkspaceMemberTimeFormatEnum | null, name: { __typename?: 'FullName', firstName: string, lastName: string } } | null, workspaceMembers?: Array<{ __typename?: 'WorkspaceMember', id: any, colorScheme: string, avatarUrl?: string | null, locale?: string | null, userEmail: string, timeZone?: string | null, dateFormat?: WorkspaceMemberDateFormatEnum | null, timeFormat?: WorkspaceMemberTimeFormatEnum | null, name: { __typename?: 'FullName', firstName: string, lastName: string } }> | null, currentUserWorkspace?: { __typename?: 'UserWorkspace', settingsPermissions?: Array<SettingsFeatures> | null } | null, currentWorkspace?: { __typename?: 'Workspace', id: any, displayName?: string | null, logo?: string | null, inviteHash?: string | null, allowImpersonation: boolean, activationStatus: WorkspaceActivationStatus, isPublicInviteLinkEnabled: boolean, isGoogleAuthEnabled: boolean, isMicrosoftAuthEnabled: boolean, isPasswordAuthEnabled: boolean, subdomain: string, hasValidEnterpriseKey: boolean, customDomain?: string | null, metadataVersion: number, workspaceMembersCount?: number | null, workspaceUrls: { __typename?: 'workspaceUrls', subdomainUrl: string, customUrl?: string | null }, featureFlags?: Array<{ __typename?: 'FeatureFlag', id: any, key: FeatureFlagKey, value: boolean, workspaceId: string }> | null, currentBillingSubscription?: { __typename?: 'BillingSubscription', id: any, status: SubscriptionStatus, interval?: SubscriptionInterval | null } | null, billingSubscriptions: Array<{ __typename?: 'BillingSubscription', id: any, status: SubscriptionStatus }> } | null, workspaces: Array<{ __typename?: 'UserWorkspace', workspace?: { __typename?: 'Workspace', id: any, logo?: string | null, displayName?: string | null, subdomain: string, customDomain?: string | null, workspaceUrls: { __typename?: 'workspaceUrls', subdomainUrl: string, customUrl?: string | null } } | null }> } };

export type ActivateWorkflowVersionMutationVariables = Exact<{
  workflowVersionId: Scalars['String'];
}>;


export type ActivateWorkflowVersionMutation = { __typename?: 'Mutation', activateWorkflowVersion: boolean };

export type ComputeStepOutputSchemaMutationVariables = Exact<{
  input: ComputeStepOutputSchemaInput;
}>;


export type ComputeStepOutputSchemaMutation = { __typename?: 'Mutation', computeStepOutputSchema: any };

export type CreateDraftFromWorkflowVersionMutationVariables = Exact<{
  input: CreateDraftFromWorkflowVersionInput;
}>;


export type CreateDraftFromWorkflowVersionMutation = { __typename?: 'Mutation', createDraftFromWorkflowVersion: { __typename?: 'WorkflowVersion', id: any } };

export type CreateWorkflowVersionStepMutationVariables = Exact<{
  input: CreateWorkflowVersionStepInput;
}>;


export type CreateWorkflowVersionStepMutation = { __typename?: 'Mutation', createWorkflowVersionStep: { __typename?: 'WorkflowAction', id: any, name: string, type: string, settings: any, valid: boolean } };

export type DeactivateWorkflowVersionMutationVariables = Exact<{
  workflowVersionId: Scalars['String'];
}>;


export type DeactivateWorkflowVersionMutation = { __typename?: 'Mutation', deactivateWorkflowVersion: boolean };

export type DeleteWorkflowVersionStepMutationVariables = Exact<{
  input: DeleteWorkflowVersionStepInput;
}>;


export type DeleteWorkflowVersionStepMutation = { __typename?: 'Mutation', deleteWorkflowVersionStep: { __typename?: 'WorkflowAction', id: any, name: string, type: string, settings: any, valid: boolean } };

export type RunWorkflowVersionMutationVariables = Exact<{
  input: RunWorkflowVersionInput;
}>;


export type RunWorkflowVersionMutation = { __typename?: 'Mutation', runWorkflowVersion: { __typename?: 'WorkflowRun', workflowRunId: any } };

export type UpdateWorkflowVersionStepMutationVariables = Exact<{
  input: UpdateWorkflowVersionStepInput;
}>;


export type UpdateWorkflowVersionStepMutation = { __typename?: 'Mutation', updateWorkflowVersionStep: { __typename?: 'WorkflowAction', id: any, name: string, type: string, settings: any, valid: boolean } };

export type DeleteWorkspaceInvitationMutationVariables = Exact<{
  appTokenId: Scalars['String'];
}>;


export type DeleteWorkspaceInvitationMutation = { __typename?: 'Mutation', deleteWorkspaceInvitation: string };

export type ResendWorkspaceInvitationMutationVariables = Exact<{
  appTokenId: Scalars['String'];
}>;


export type ResendWorkspaceInvitationMutation = { __typename?: 'Mutation', resendWorkspaceInvitation: { __typename?: 'SendInvitationsOutput', success: boolean, errors: Array<string>, result: Array<{ __typename?: 'WorkspaceInvitation', id: any, email: string, expiresAt: string }> } };

export type SendInvitationsMutationVariables = Exact<{
  emails: Array<Scalars['String']> | Scalars['String'];
}>;


export type SendInvitationsMutation = { __typename?: 'Mutation', sendInvitations: { __typename?: 'SendInvitationsOutput', success: boolean, errors: Array<string>, result: Array<{ __typename?: 'WorkspaceInvitation', id: any, email: string, expiresAt: string }> } };

export type GetWorkspaceInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkspaceInvitationsQuery = { __typename?: 'Query', findWorkspaceInvitations: Array<{ __typename?: 'WorkspaceInvitation', id: any, email: string, expiresAt: string }> };

export type WorkspaceMemberQueryFragmentFragment = { __typename?: 'WorkspaceMember', id: any, colorScheme: string, avatarUrl?: string | null, locale?: string | null, userEmail: string, timeZone?: string | null, dateFormat?: WorkspaceMemberDateFormatEnum | null, timeFormat?: WorkspaceMemberTimeFormatEnum | null, name: { __typename?: 'FullName', firstName: string, lastName: string } };

export type ActivateWorkspaceMutationVariables = Exact<{
  input: ActivateWorkspaceInput;
}>;


export type ActivateWorkspaceMutation = { __typename?: 'Mutation', activateWorkspace: { __typename?: 'Workspace', id: any } };

export type DeleteCurrentWorkspaceMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteCurrentWorkspaceMutation = { __typename?: 'Mutation', deleteCurrentWorkspace: { __typename?: 'Workspace', id: any } };

export type UpdateWorkspaceMutationVariables = Exact<{
  input: UpdateWorkspaceInput;
}>;


export type UpdateWorkspaceMutation = { __typename?: 'Mutation', updateWorkspace: { __typename?: 'Workspace', id: any, customDomain?: string | null, subdomain: string, displayName?: string | null, logo?: string | null, allowImpersonation: boolean, isPublicInviteLinkEnabled: boolean, isGoogleAuthEnabled: boolean, isMicrosoftAuthEnabled: boolean, isPasswordAuthEnabled: boolean } };

export type UploadWorkspaceLogoMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadWorkspaceLogoMutation = { __typename?: 'Mutation', uploadWorkspaceLogo: string };

export type GetCustomDomainDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomDomainDetailsQuery = { __typename?: 'Query', getCustomDomainDetails?: { __typename?: 'CustomDomainDetails', customDomain: string, records: Array<{ __typename?: 'CustomDomainVerification', type: string, key: string, value: string, validationType: string, status: string }> } | null };

export type GetWorkspaceFromInviteHashQueryVariables = Exact<{
  inviteHash: Scalars['String'];
}>;


export type GetWorkspaceFromInviteHashQuery = { __typename?: 'Query', findWorkspaceFromInviteHash: { __typename?: 'Workspace', id: any, displayName?: string | null, logo?: string | null, allowImpersonation: boolean } };

export const TimelineCalendarEventParticipantFragmentFragmentDoc = gql`
    fragment TimelineCalendarEventParticipantFragment on TimelineCalendarEventParticipant {
  personId
  workspaceMemberId
  firstName
  lastName
  displayName
  avatarUrl
  handle
}
    `;
export const TimelineCalendarEventFragmentFragmentDoc = gql`
    fragment TimelineCalendarEventFragment on TimelineCalendarEvent {
  id
  title
  description
  location
  startsAt
  endsAt
  isFullDay
  visibility
  participants {
    ...TimelineCalendarEventParticipantFragment
  }
}
    ${TimelineCalendarEventParticipantFragmentFragmentDoc}`;
export const TimelineCalendarEventsWithTotalFragmentFragmentDoc = gql`
    fragment TimelineCalendarEventsWithTotalFragment on TimelineCalendarEventsWithTotal {
  totalNumberOfCalendarEvents
  timelineCalendarEvents {
    ...TimelineCalendarEventFragment
  }
}
    ${TimelineCalendarEventFragmentFragmentDoc}`;
export const ParticipantFragmentFragmentDoc = gql`
    fragment ParticipantFragment on TimelineThreadParticipant {
  personId
  workspaceMemberId
  firstName
  lastName
  displayName
  avatarUrl
  handle
}
    `;
export const TimelineThreadFragmentFragmentDoc = gql`
    fragment TimelineThreadFragment on TimelineThread {
  id
  read
  visibility
  firstParticipant {
    ...ParticipantFragment
  }
  lastTwoParticipants {
    ...ParticipantFragment
  }
  lastMessageReceivedAt
  lastMessageBody
  subject
  numberOfMessagesInThread
  participantCount
}
    ${ParticipantFragmentFragmentDoc}`;
export const TimelineThreadsWithTotalFragmentFragmentDoc = gql`
    fragment TimelineThreadsWithTotalFragment on TimelineThreadsWithTotal {
  totalNumberOfThreads
  timelineThreads {
    ...TimelineThreadFragment
  }
}
    ${TimelineThreadFragmentFragmentDoc}`;
export const AuthTokenFragmentFragmentDoc = gql`
    fragment AuthTokenFragment on AuthToken {
  token
  expiresAt
}
    `;
export const AuthTokensFragmentFragmentDoc = gql`
    fragment AuthTokensFragment on AuthTokenPair {
  accessToken {
    ...AuthTokenFragment
  }
  refreshToken {
    ...AuthTokenFragment
  }
}
    ${AuthTokenFragmentFragmentDoc}`;
export const AvailableSsoIdentityProvidersFragmentFragmentDoc = gql`
    fragment AvailableSSOIdentityProvidersFragment on FindAvailableSSOIDPOutput {
  id
  issuer
  name
  status
  workspace {
    id
    displayName
  }
}
    `;
export const RoleFragmentFragmentDoc = gql`
    fragment RoleFragment on Role {
  id
  label
  description
  canUpdateAllSettings
  isEditable
}
    `;
export const WorkspaceMemberQueryFragmentFragmentDoc = gql`
    fragment WorkspaceMemberQueryFragment on WorkspaceMember {
  id
  name {
    firstName
    lastName
  }
  colorScheme
  avatarUrl
  locale
  userEmail
  timeZone
  dateFormat
  timeFormat
}
    `;
export const UserQueryFragmentFragmentDoc = gql`
    fragment UserQueryFragment on User {
  id
  firstName
  lastName
  email
  canImpersonate
  supportUserHash
  analyticsTinybirdJwts {
    getWebhookAnalytics
    getPageviewsAnalytics
    getUsersAnalytics
    getServerlessFunctionDuration
    getServerlessFunctionSuccessRate
    getServerlessFunctionErrorCount
  }
  onboardingStatus
  workspaceMember {
    ...WorkspaceMemberQueryFragment
  }
  workspaceMembers {
    ...WorkspaceMemberQueryFragment
  }
  currentUserWorkspace {
    settingsPermissions
  }
  currentWorkspace {
    id
    displayName
    logo
    inviteHash
    allowImpersonation
    activationStatus
    isPublicInviteLinkEnabled
    isGoogleAuthEnabled
    isMicrosoftAuthEnabled
    isPasswordAuthEnabled
    subdomain
    hasValidEnterpriseKey
    customDomain
    workspaceUrls {
      subdomainUrl
      customUrl
    }
    featureFlags {
      id
      key
      value
      workspaceId
    }
    metadataVersion
    currentBillingSubscription {
      id
      status
      interval
    }
    billingSubscriptions {
      id
      status
    }
    workspaceMembersCount
  }
  workspaces {
    workspace {
      id
      logo
      displayName
      subdomain
      customDomain
      workspaceUrls {
        subdomainUrl
        customUrl
      }
    }
  }
  userVars
}
    ${WorkspaceMemberQueryFragmentFragmentDoc}`;
export const GetTimelineCalendarEventsFromCompanyIdDocument = gql`
    query GetTimelineCalendarEventsFromCompanyId($companyId: UUID!, $page: Int!, $pageSize: Int!) {
  getTimelineCalendarEventsFromCompanyId(
    companyId: $companyId
    page: $page
    pageSize: $pageSize
  ) {
    ...TimelineCalendarEventsWithTotalFragment
  }
}
    ${TimelineCalendarEventsWithTotalFragmentFragmentDoc}`;

/**
 * __useGetTimelineCalendarEventsFromCompanyIdQuery__
 *
 * To run a query within a React component, call `useGetTimelineCalendarEventsFromCompanyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimelineCalendarEventsFromCompanyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimelineCalendarEventsFromCompanyIdQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetTimelineCalendarEventsFromCompanyIdQuery(baseOptions: Apollo.QueryHookOptions<GetTimelineCalendarEventsFromCompanyIdQuery, GetTimelineCalendarEventsFromCompanyIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimelineCalendarEventsFromCompanyIdQuery, GetTimelineCalendarEventsFromCompanyIdQueryVariables>(GetTimelineCalendarEventsFromCompanyIdDocument, options);
      }
export function useGetTimelineCalendarEventsFromCompanyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimelineCalendarEventsFromCompanyIdQuery, GetTimelineCalendarEventsFromCompanyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimelineCalendarEventsFromCompanyIdQuery, GetTimelineCalendarEventsFromCompanyIdQueryVariables>(GetTimelineCalendarEventsFromCompanyIdDocument, options);
        }
export type GetTimelineCalendarEventsFromCompanyIdQueryHookResult = ReturnType<typeof useGetTimelineCalendarEventsFromCompanyIdQuery>;
export type GetTimelineCalendarEventsFromCompanyIdLazyQueryHookResult = ReturnType<typeof useGetTimelineCalendarEventsFromCompanyIdLazyQuery>;
export type GetTimelineCalendarEventsFromCompanyIdQueryResult = Apollo.QueryResult<GetTimelineCalendarEventsFromCompanyIdQuery, GetTimelineCalendarEventsFromCompanyIdQueryVariables>;
export const GetTimelineCalendarEventsFromPersonIdDocument = gql`
    query GetTimelineCalendarEventsFromPersonId($personId: UUID!, $page: Int!, $pageSize: Int!) {
  getTimelineCalendarEventsFromPersonId(
    personId: $personId
    page: $page
    pageSize: $pageSize
  ) {
    ...TimelineCalendarEventsWithTotalFragment
  }
}
    ${TimelineCalendarEventsWithTotalFragmentFragmentDoc}`;

/**
 * __useGetTimelineCalendarEventsFromPersonIdQuery__
 *
 * To run a query within a React component, call `useGetTimelineCalendarEventsFromPersonIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimelineCalendarEventsFromPersonIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimelineCalendarEventsFromPersonIdQuery({
 *   variables: {
 *      personId: // value for 'personId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetTimelineCalendarEventsFromPersonIdQuery(baseOptions: Apollo.QueryHookOptions<GetTimelineCalendarEventsFromPersonIdQuery, GetTimelineCalendarEventsFromPersonIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimelineCalendarEventsFromPersonIdQuery, GetTimelineCalendarEventsFromPersonIdQueryVariables>(GetTimelineCalendarEventsFromPersonIdDocument, options);
      }
export function useGetTimelineCalendarEventsFromPersonIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimelineCalendarEventsFromPersonIdQuery, GetTimelineCalendarEventsFromPersonIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimelineCalendarEventsFromPersonIdQuery, GetTimelineCalendarEventsFromPersonIdQueryVariables>(GetTimelineCalendarEventsFromPersonIdDocument, options);
        }
export type GetTimelineCalendarEventsFromPersonIdQueryHookResult = ReturnType<typeof useGetTimelineCalendarEventsFromPersonIdQuery>;
export type GetTimelineCalendarEventsFromPersonIdLazyQueryHookResult = ReturnType<typeof useGetTimelineCalendarEventsFromPersonIdLazyQuery>;
export type GetTimelineCalendarEventsFromPersonIdQueryResult = Apollo.QueryResult<GetTimelineCalendarEventsFromPersonIdQuery, GetTimelineCalendarEventsFromPersonIdQueryVariables>;
export const GetTimelineThreadsFromCompanyIdDocument = gql`
    query GetTimelineThreadsFromCompanyId($companyId: UUID!, $page: Int!, $pageSize: Int!) {
  getTimelineThreadsFromCompanyId(
    companyId: $companyId
    page: $page
    pageSize: $pageSize
  ) {
    ...TimelineThreadsWithTotalFragment
  }
}
    ${TimelineThreadsWithTotalFragmentFragmentDoc}`;

/**
 * __useGetTimelineThreadsFromCompanyIdQuery__
 *
 * To run a query within a React component, call `useGetTimelineThreadsFromCompanyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimelineThreadsFromCompanyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimelineThreadsFromCompanyIdQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetTimelineThreadsFromCompanyIdQuery(baseOptions: Apollo.QueryHookOptions<GetTimelineThreadsFromCompanyIdQuery, GetTimelineThreadsFromCompanyIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimelineThreadsFromCompanyIdQuery, GetTimelineThreadsFromCompanyIdQueryVariables>(GetTimelineThreadsFromCompanyIdDocument, options);
      }
export function useGetTimelineThreadsFromCompanyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimelineThreadsFromCompanyIdQuery, GetTimelineThreadsFromCompanyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimelineThreadsFromCompanyIdQuery, GetTimelineThreadsFromCompanyIdQueryVariables>(GetTimelineThreadsFromCompanyIdDocument, options);
        }
export type GetTimelineThreadsFromCompanyIdQueryHookResult = ReturnType<typeof useGetTimelineThreadsFromCompanyIdQuery>;
export type GetTimelineThreadsFromCompanyIdLazyQueryHookResult = ReturnType<typeof useGetTimelineThreadsFromCompanyIdLazyQuery>;
export type GetTimelineThreadsFromCompanyIdQueryResult = Apollo.QueryResult<GetTimelineThreadsFromCompanyIdQuery, GetTimelineThreadsFromCompanyIdQueryVariables>;
export const GetTimelineThreadsFromPersonIdDocument = gql`
    query GetTimelineThreadsFromPersonId($personId: UUID!, $page: Int!, $pageSize: Int!) {
  getTimelineThreadsFromPersonId(
    personId: $personId
    page: $page
    pageSize: $pageSize
  ) {
    ...TimelineThreadsWithTotalFragment
  }
}
    ${TimelineThreadsWithTotalFragmentFragmentDoc}`;

/**
 * __useGetTimelineThreadsFromPersonIdQuery__
 *
 * To run a query within a React component, call `useGetTimelineThreadsFromPersonIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimelineThreadsFromPersonIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimelineThreadsFromPersonIdQuery({
 *   variables: {
 *      personId: // value for 'personId'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetTimelineThreadsFromPersonIdQuery(baseOptions: Apollo.QueryHookOptions<GetTimelineThreadsFromPersonIdQuery, GetTimelineThreadsFromPersonIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimelineThreadsFromPersonIdQuery, GetTimelineThreadsFromPersonIdQueryVariables>(GetTimelineThreadsFromPersonIdDocument, options);
      }
export function useGetTimelineThreadsFromPersonIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimelineThreadsFromPersonIdQuery, GetTimelineThreadsFromPersonIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimelineThreadsFromPersonIdQuery, GetTimelineThreadsFromPersonIdQueryVariables>(GetTimelineThreadsFromPersonIdDocument, options);
        }
export type GetTimelineThreadsFromPersonIdQueryHookResult = ReturnType<typeof useGetTimelineThreadsFromPersonIdQuery>;
export type GetTimelineThreadsFromPersonIdLazyQueryHookResult = ReturnType<typeof useGetTimelineThreadsFromPersonIdLazyQuery>;
export type GetTimelineThreadsFromPersonIdQueryResult = Apollo.QueryResult<GetTimelineThreadsFromPersonIdQuery, GetTimelineThreadsFromPersonIdQueryVariables>;
export const TrackDocument = gql`
    mutation Track($action: String!, $payload: JSON!) {
  track(action: $action, payload: $payload) {
    success
  }
}
    `;
export type TrackMutationFn = Apollo.MutationFunction<TrackMutation, TrackMutationVariables>;

/**
 * __useTrackMutation__
 *
 * To run a mutation, you first call `useTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackMutation, { data, loading, error }] = useTrackMutation({
 *   variables: {
 *      action: // value for 'action'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useTrackMutation(baseOptions?: Apollo.MutationHookOptions<TrackMutation, TrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackMutation, TrackMutationVariables>(TrackDocument, options);
      }
export type TrackMutationHookResult = ReturnType<typeof useTrackMutation>;
export type TrackMutationResult = Apollo.MutationResult<TrackMutation>;
export type TrackMutationOptions = Apollo.BaseMutationOptions<TrackMutation, TrackMutationVariables>;
export const UploadFileDocument = gql`
    mutation uploadFile($file: Upload!, $fileFolder: FileFolder) {
  uploadFile(file: $file, fileFolder: $fileFolder)
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *      fileFolder: // value for 'fileFolder'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const UploadImageDocument = gql`
    mutation uploadImage($file: Upload!, $fileFolder: FileFolder) {
  uploadImage(file: $file, fileFolder: $fileFolder)
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *      fileFolder: // value for 'fileFolder'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const AuthorizeAppDocument = gql`
    mutation authorizeApp($clientId: String!, $codeChallenge: String!, $redirectUrl: String!) {
  authorizeApp(
    clientId: $clientId
    codeChallenge: $codeChallenge
    redirectUrl: $redirectUrl
  ) {
    redirectUrl
  }
}
    `;
export type AuthorizeAppMutationFn = Apollo.MutationFunction<AuthorizeAppMutation, AuthorizeAppMutationVariables>;

/**
 * __useAuthorizeAppMutation__
 *
 * To run a mutation, you first call `useAuthorizeAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthorizeAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authorizeAppMutation, { data, loading, error }] = useAuthorizeAppMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      codeChallenge: // value for 'codeChallenge'
 *      redirectUrl: // value for 'redirectUrl'
 *   },
 * });
 */
export function useAuthorizeAppMutation(baseOptions?: Apollo.MutationHookOptions<AuthorizeAppMutation, AuthorizeAppMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthorizeAppMutation, AuthorizeAppMutationVariables>(AuthorizeAppDocument, options);
      }
export type AuthorizeAppMutationHookResult = ReturnType<typeof useAuthorizeAppMutation>;
export type AuthorizeAppMutationResult = Apollo.MutationResult<AuthorizeAppMutation>;
export type AuthorizeAppMutationOptions = Apollo.BaseMutationOptions<AuthorizeAppMutation, AuthorizeAppMutationVariables>;
export const EmailPasswordResetLinkDocument = gql`
    mutation EmailPasswordResetLink($email: String!) {
  emailPasswordResetLink(email: $email) {
    success
  }
}
    `;
export type EmailPasswordResetLinkMutationFn = Apollo.MutationFunction<EmailPasswordResetLinkMutation, EmailPasswordResetLinkMutationVariables>;

/**
 * __useEmailPasswordResetLinkMutation__
 *
 * To run a mutation, you first call `useEmailPasswordResetLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailPasswordResetLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailPasswordResetLinkMutation, { data, loading, error }] = useEmailPasswordResetLinkMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useEmailPasswordResetLinkMutation(baseOptions?: Apollo.MutationHookOptions<EmailPasswordResetLinkMutation, EmailPasswordResetLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmailPasswordResetLinkMutation, EmailPasswordResetLinkMutationVariables>(EmailPasswordResetLinkDocument, options);
      }
export type EmailPasswordResetLinkMutationHookResult = ReturnType<typeof useEmailPasswordResetLinkMutation>;
export type EmailPasswordResetLinkMutationResult = Apollo.MutationResult<EmailPasswordResetLinkMutation>;
export type EmailPasswordResetLinkMutationOptions = Apollo.BaseMutationOptions<EmailPasswordResetLinkMutation, EmailPasswordResetLinkMutationVariables>;
export const GenerateApiKeyTokenDocument = gql`
    mutation GenerateApiKeyToken($apiKeyId: String!, $expiresAt: String!) {
  generateApiKeyToken(apiKeyId: $apiKeyId, expiresAt: $expiresAt) {
    token
  }
}
    `;
export type GenerateApiKeyTokenMutationFn = Apollo.MutationFunction<GenerateApiKeyTokenMutation, GenerateApiKeyTokenMutationVariables>;

/**
 * __useGenerateApiKeyTokenMutation__
 *
 * To run a mutation, you first call `useGenerateApiKeyTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateApiKeyTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateApiKeyTokenMutation, { data, loading, error }] = useGenerateApiKeyTokenMutation({
 *   variables: {
 *      apiKeyId: // value for 'apiKeyId'
 *      expiresAt: // value for 'expiresAt'
 *   },
 * });
 */
export function useGenerateApiKeyTokenMutation(baseOptions?: Apollo.MutationHookOptions<GenerateApiKeyTokenMutation, GenerateApiKeyTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateApiKeyTokenMutation, GenerateApiKeyTokenMutationVariables>(GenerateApiKeyTokenDocument, options);
      }
export type GenerateApiKeyTokenMutationHookResult = ReturnType<typeof useGenerateApiKeyTokenMutation>;
export type GenerateApiKeyTokenMutationResult = Apollo.MutationResult<GenerateApiKeyTokenMutation>;
export type GenerateApiKeyTokenMutationOptions = Apollo.BaseMutationOptions<GenerateApiKeyTokenMutation, GenerateApiKeyTokenMutationVariables>;
export const GenerateTransientTokenDocument = gql`
    mutation generateTransientToken {
  generateTransientToken {
    transientToken {
      token
    }
  }
}
    `;
export type GenerateTransientTokenMutationFn = Apollo.MutationFunction<GenerateTransientTokenMutation, GenerateTransientTokenMutationVariables>;

/**
 * __useGenerateTransientTokenMutation__
 *
 * To run a mutation, you first call `useGenerateTransientTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateTransientTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateTransientTokenMutation, { data, loading, error }] = useGenerateTransientTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateTransientTokenMutation(baseOptions?: Apollo.MutationHookOptions<GenerateTransientTokenMutation, GenerateTransientTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateTransientTokenMutation, GenerateTransientTokenMutationVariables>(GenerateTransientTokenDocument, options);
      }
export type GenerateTransientTokenMutationHookResult = ReturnType<typeof useGenerateTransientTokenMutation>;
export type GenerateTransientTokenMutationResult = Apollo.MutationResult<GenerateTransientTokenMutation>;
export type GenerateTransientTokenMutationOptions = Apollo.BaseMutationOptions<GenerateTransientTokenMutation, GenerateTransientTokenMutationVariables>;
export const GetAuthTokensFromLoginTokenDocument = gql`
    mutation GetAuthTokensFromLoginToken($loginToken: String!) {
  getAuthTokensFromLoginToken(loginToken: $loginToken) {
    tokens {
      ...AuthTokensFragment
    }
  }
}
    ${AuthTokensFragmentFragmentDoc}`;
export type GetAuthTokensFromLoginTokenMutationFn = Apollo.MutationFunction<GetAuthTokensFromLoginTokenMutation, GetAuthTokensFromLoginTokenMutationVariables>;

/**
 * __useGetAuthTokensFromLoginTokenMutation__
 *
 * To run a mutation, you first call `useGetAuthTokensFromLoginTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAuthTokensFromLoginTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAuthTokensFromLoginTokenMutation, { data, loading, error }] = useGetAuthTokensFromLoginTokenMutation({
 *   variables: {
 *      loginToken: // value for 'loginToken'
 *   },
 * });
 */
export function useGetAuthTokensFromLoginTokenMutation(baseOptions?: Apollo.MutationHookOptions<GetAuthTokensFromLoginTokenMutation, GetAuthTokensFromLoginTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetAuthTokensFromLoginTokenMutation, GetAuthTokensFromLoginTokenMutationVariables>(GetAuthTokensFromLoginTokenDocument, options);
      }
export type GetAuthTokensFromLoginTokenMutationHookResult = ReturnType<typeof useGetAuthTokensFromLoginTokenMutation>;
export type GetAuthTokensFromLoginTokenMutationResult = Apollo.MutationResult<GetAuthTokensFromLoginTokenMutation>;
export type GetAuthTokensFromLoginTokenMutationOptions = Apollo.BaseMutationOptions<GetAuthTokensFromLoginTokenMutation, GetAuthTokensFromLoginTokenMutationVariables>;
export const GetAuthorizationUrlDocument = gql`
    mutation GetAuthorizationUrl($input: GetAuthorizationUrlInput!) {
  getAuthorizationUrl(input: $input) {
    id
    type
    authorizationURL
  }
}
    `;
export type GetAuthorizationUrlMutationFn = Apollo.MutationFunction<GetAuthorizationUrlMutation, GetAuthorizationUrlMutationVariables>;

/**
 * __useGetAuthorizationUrlMutation__
 *
 * To run a mutation, you first call `useGetAuthorizationUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorizationUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAuthorizationUrlMutation, { data, loading, error }] = useGetAuthorizationUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAuthorizationUrlMutation(baseOptions?: Apollo.MutationHookOptions<GetAuthorizationUrlMutation, GetAuthorizationUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetAuthorizationUrlMutation, GetAuthorizationUrlMutationVariables>(GetAuthorizationUrlDocument, options);
      }
export type GetAuthorizationUrlMutationHookResult = ReturnType<typeof useGetAuthorizationUrlMutation>;
export type GetAuthorizationUrlMutationResult = Apollo.MutationResult<GetAuthorizationUrlMutation>;
export type GetAuthorizationUrlMutationOptions = Apollo.BaseMutationOptions<GetAuthorizationUrlMutation, GetAuthorizationUrlMutationVariables>;
export const GetLoginTokenFromCredentialsDocument = gql`
    mutation GetLoginTokenFromCredentials($email: String!, $password: String!, $captchaToken: String) {
  getLoginTokenFromCredentials(
    email: $email
    password: $password
    captchaToken: $captchaToken
  ) {
    loginToken {
      ...AuthTokenFragment
    }
  }
}
    ${AuthTokenFragmentFragmentDoc}`;
export type GetLoginTokenFromCredentialsMutationFn = Apollo.MutationFunction<GetLoginTokenFromCredentialsMutation, GetLoginTokenFromCredentialsMutationVariables>;

/**
 * __useGetLoginTokenFromCredentialsMutation__
 *
 * To run a mutation, you first call `useGetLoginTokenFromCredentialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetLoginTokenFromCredentialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getLoginTokenFromCredentialsMutation, { data, loading, error }] = useGetLoginTokenFromCredentialsMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      captchaToken: // value for 'captchaToken'
 *   },
 * });
 */
export function useGetLoginTokenFromCredentialsMutation(baseOptions?: Apollo.MutationHookOptions<GetLoginTokenFromCredentialsMutation, GetLoginTokenFromCredentialsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetLoginTokenFromCredentialsMutation, GetLoginTokenFromCredentialsMutationVariables>(GetLoginTokenFromCredentialsDocument, options);
      }
export type GetLoginTokenFromCredentialsMutationHookResult = ReturnType<typeof useGetLoginTokenFromCredentialsMutation>;
export type GetLoginTokenFromCredentialsMutationResult = Apollo.MutationResult<GetLoginTokenFromCredentialsMutation>;
export type GetLoginTokenFromCredentialsMutationOptions = Apollo.BaseMutationOptions<GetLoginTokenFromCredentialsMutation, GetLoginTokenFromCredentialsMutationVariables>;
export const GetLoginTokenFromEmailVerificationTokenDocument = gql`
    mutation GetLoginTokenFromEmailVerificationToken($emailVerificationToken: String!, $captchaToken: String) {
  getLoginTokenFromEmailVerificationToken(
    emailVerificationToken: $emailVerificationToken
    captchaToken: $captchaToken
  ) {
    loginToken {
      ...AuthTokenFragment
    }
  }
}
    ${AuthTokenFragmentFragmentDoc}`;
export type GetLoginTokenFromEmailVerificationTokenMutationFn = Apollo.MutationFunction<GetLoginTokenFromEmailVerificationTokenMutation, GetLoginTokenFromEmailVerificationTokenMutationVariables>;

/**
 * __useGetLoginTokenFromEmailVerificationTokenMutation__
 *
 * To run a mutation, you first call `useGetLoginTokenFromEmailVerificationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetLoginTokenFromEmailVerificationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getLoginTokenFromEmailVerificationTokenMutation, { data, loading, error }] = useGetLoginTokenFromEmailVerificationTokenMutation({
 *   variables: {
 *      emailVerificationToken: // value for 'emailVerificationToken'
 *      captchaToken: // value for 'captchaToken'
 *   },
 * });
 */
export function useGetLoginTokenFromEmailVerificationTokenMutation(baseOptions?: Apollo.MutationHookOptions<GetLoginTokenFromEmailVerificationTokenMutation, GetLoginTokenFromEmailVerificationTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetLoginTokenFromEmailVerificationTokenMutation, GetLoginTokenFromEmailVerificationTokenMutationVariables>(GetLoginTokenFromEmailVerificationTokenDocument, options);
      }
export type GetLoginTokenFromEmailVerificationTokenMutationHookResult = ReturnType<typeof useGetLoginTokenFromEmailVerificationTokenMutation>;
export type GetLoginTokenFromEmailVerificationTokenMutationResult = Apollo.MutationResult<GetLoginTokenFromEmailVerificationTokenMutation>;
export type GetLoginTokenFromEmailVerificationTokenMutationOptions = Apollo.BaseMutationOptions<GetLoginTokenFromEmailVerificationTokenMutation, GetLoginTokenFromEmailVerificationTokenMutationVariables>;
export const ImpersonateDocument = gql`
    mutation Impersonate($userId: String!, $workspaceId: String!) {
  impersonate(userId: $userId, workspaceId: $workspaceId) {
    workspace {
      workspaceUrls {
        subdomainUrl
        customUrl
      }
      id
    }
    loginToken {
      ...AuthTokenFragment
    }
  }
}
    ${AuthTokenFragmentFragmentDoc}`;
export type ImpersonateMutationFn = Apollo.MutationFunction<ImpersonateMutation, ImpersonateMutationVariables>;

/**
 * __useImpersonateMutation__
 *
 * To run a mutation, you first call `useImpersonateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImpersonateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [impersonateMutation, { data, loading, error }] = useImpersonateMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useImpersonateMutation(baseOptions?: Apollo.MutationHookOptions<ImpersonateMutation, ImpersonateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImpersonateMutation, ImpersonateMutationVariables>(ImpersonateDocument, options);
      }
export type ImpersonateMutationHookResult = ReturnType<typeof useImpersonateMutation>;
export type ImpersonateMutationResult = Apollo.MutationResult<ImpersonateMutation>;
export type ImpersonateMutationOptions = Apollo.BaseMutationOptions<ImpersonateMutation, ImpersonateMutationVariables>;
export const RenewTokenDocument = gql`
    mutation RenewToken($appToken: String!) {
  renewToken(appToken: $appToken) {
    tokens {
      ...AuthTokensFragment
    }
  }
}
    ${AuthTokensFragmentFragmentDoc}`;
export type RenewTokenMutationFn = Apollo.MutationFunction<RenewTokenMutation, RenewTokenMutationVariables>;

/**
 * __useRenewTokenMutation__
 *
 * To run a mutation, you first call `useRenewTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenewTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renewTokenMutation, { data, loading, error }] = useRenewTokenMutation({
 *   variables: {
 *      appToken: // value for 'appToken'
 *   },
 * });
 */
export function useRenewTokenMutation(baseOptions?: Apollo.MutationHookOptions<RenewTokenMutation, RenewTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenewTokenMutation, RenewTokenMutationVariables>(RenewTokenDocument, options);
      }
export type RenewTokenMutationHookResult = ReturnType<typeof useRenewTokenMutation>;
export type RenewTokenMutationResult = Apollo.MutationResult<RenewTokenMutation>;
export type RenewTokenMutationOptions = Apollo.BaseMutationOptions<RenewTokenMutation, RenewTokenMutationVariables>;
export const ResendEmailVerificationTokenDocument = gql`
    mutation ResendEmailVerificationToken($email: String!) {
  resendEmailVerificationToken(email: $email) {
    success
  }
}
    `;
export type ResendEmailVerificationTokenMutationFn = Apollo.MutationFunction<ResendEmailVerificationTokenMutation, ResendEmailVerificationTokenMutationVariables>;

/**
 * __useResendEmailVerificationTokenMutation__
 *
 * To run a mutation, you first call `useResendEmailVerificationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendEmailVerificationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendEmailVerificationTokenMutation, { data, loading, error }] = useResendEmailVerificationTokenMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendEmailVerificationTokenMutation(baseOptions?: Apollo.MutationHookOptions<ResendEmailVerificationTokenMutation, ResendEmailVerificationTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendEmailVerificationTokenMutation, ResendEmailVerificationTokenMutationVariables>(ResendEmailVerificationTokenDocument, options);
      }
export type ResendEmailVerificationTokenMutationHookResult = ReturnType<typeof useResendEmailVerificationTokenMutation>;
export type ResendEmailVerificationTokenMutationResult = Apollo.MutationResult<ResendEmailVerificationTokenMutation>;
export type ResendEmailVerificationTokenMutationOptions = Apollo.BaseMutationOptions<ResendEmailVerificationTokenMutation, ResendEmailVerificationTokenMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($email: String!, $password: String!, $workspaceInviteHash: String, $workspacePersonalInviteToken: String = null, $captchaToken: String, $workspaceId: String, $locale: String) {
  signUp(
    email: $email
    password: $password
    workspaceInviteHash: $workspaceInviteHash
    workspacePersonalInviteToken: $workspacePersonalInviteToken
    captchaToken: $captchaToken
    workspaceId: $workspaceId
    locale: $locale
  ) {
    loginToken {
      ...AuthTokenFragment
    }
    workspace {
      id
      workspaceUrls {
        subdomainUrl
        customUrl
      }
    }
  }
}
    ${AuthTokenFragmentFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      workspaceInviteHash: // value for 'workspaceInviteHash'
 *      workspacePersonalInviteToken: // value for 'workspacePersonalInviteToken'
 *      captchaToken: // value for 'captchaToken'
 *      workspaceId: // value for 'workspaceId'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdatePasswordViaResetTokenDocument = gql`
    mutation UpdatePasswordViaResetToken($token: String!, $newPassword: String!) {
  updatePasswordViaResetToken(
    passwordResetToken: $token
    newPassword: $newPassword
  ) {
    success
  }
}
    `;
export type UpdatePasswordViaResetTokenMutationFn = Apollo.MutationFunction<UpdatePasswordViaResetTokenMutation, UpdatePasswordViaResetTokenMutationVariables>;

/**
 * __useUpdatePasswordViaResetTokenMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordViaResetTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordViaResetTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordViaResetTokenMutation, { data, loading, error }] = useUpdatePasswordViaResetTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdatePasswordViaResetTokenMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordViaResetTokenMutation, UpdatePasswordViaResetTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordViaResetTokenMutation, UpdatePasswordViaResetTokenMutationVariables>(UpdatePasswordViaResetTokenDocument, options);
      }
export type UpdatePasswordViaResetTokenMutationHookResult = ReturnType<typeof useUpdatePasswordViaResetTokenMutation>;
export type UpdatePasswordViaResetTokenMutationResult = Apollo.MutationResult<UpdatePasswordViaResetTokenMutation>;
export type UpdatePasswordViaResetTokenMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordViaResetTokenMutation, UpdatePasswordViaResetTokenMutationVariables>;
export const CheckUserExistsDocument = gql`
    query CheckUserExists($email: String!, $captchaToken: String) {
  checkUserExists(email: $email, captchaToken: $captchaToken) {
    __typename
    ... on UserExists {
      exists
      availableWorkspaces {
        id
        displayName
        workspaceUrls {
          subdomainUrl
          customUrl
        }
        logo
        sso {
          type
          id
          issuer
          name
          status
        }
      }
      isEmailVerified
    }
    ... on UserNotExists {
      exists
    }
  }
}
    `;

/**
 * __useCheckUserExistsQuery__
 *
 * To run a query within a React component, call `useCheckUserExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUserExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUserExistsQuery({
 *   variables: {
 *      email: // value for 'email'
 *      captchaToken: // value for 'captchaToken'
 *   },
 * });
 */
export function useCheckUserExistsQuery(baseOptions: Apollo.QueryHookOptions<CheckUserExistsQuery, CheckUserExistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUserExistsQuery, CheckUserExistsQueryVariables>(CheckUserExistsDocument, options);
      }
export function useCheckUserExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUserExistsQuery, CheckUserExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUserExistsQuery, CheckUserExistsQueryVariables>(CheckUserExistsDocument, options);
        }
export type CheckUserExistsQueryHookResult = ReturnType<typeof useCheckUserExistsQuery>;
export type CheckUserExistsLazyQueryHookResult = ReturnType<typeof useCheckUserExistsLazyQuery>;
export type CheckUserExistsQueryResult = Apollo.QueryResult<CheckUserExistsQuery, CheckUserExistsQueryVariables>;
export const GetPublicWorkspaceDataByDomainDocument = gql`
    query GetPublicWorkspaceDataByDomain {
  getPublicWorkspaceDataByDomain {
    id
    logo
    displayName
    workspaceUrls {
      subdomainUrl
      customUrl
    }
    authProviders {
      sso {
        id
        name
        type
        status
        issuer
      }
      google
      magicLink
      password
      microsoft
    }
  }
}
    `;

/**
 * __useGetPublicWorkspaceDataByDomainQuery__
 *
 * To run a query within a React component, call `useGetPublicWorkspaceDataByDomainQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicWorkspaceDataByDomainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicWorkspaceDataByDomainQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPublicWorkspaceDataByDomainQuery(baseOptions?: Apollo.QueryHookOptions<GetPublicWorkspaceDataByDomainQuery, GetPublicWorkspaceDataByDomainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublicWorkspaceDataByDomainQuery, GetPublicWorkspaceDataByDomainQueryVariables>(GetPublicWorkspaceDataByDomainDocument, options);
      }
export function useGetPublicWorkspaceDataByDomainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicWorkspaceDataByDomainQuery, GetPublicWorkspaceDataByDomainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublicWorkspaceDataByDomainQuery, GetPublicWorkspaceDataByDomainQueryVariables>(GetPublicWorkspaceDataByDomainDocument, options);
        }
export type GetPublicWorkspaceDataByDomainQueryHookResult = ReturnType<typeof useGetPublicWorkspaceDataByDomainQuery>;
export type GetPublicWorkspaceDataByDomainLazyQueryHookResult = ReturnType<typeof useGetPublicWorkspaceDataByDomainLazyQuery>;
export type GetPublicWorkspaceDataByDomainQueryResult = Apollo.QueryResult<GetPublicWorkspaceDataByDomainQuery, GetPublicWorkspaceDataByDomainQueryVariables>;
export const ValidatePasswordResetTokenDocument = gql`
    query ValidatePasswordResetToken($token: String!) {
  validatePasswordResetToken(passwordResetToken: $token) {
    id
    email
  }
}
    `;

/**
 * __useValidatePasswordResetTokenQuery__
 *
 * To run a query within a React component, call `useValidatePasswordResetTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidatePasswordResetTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidatePasswordResetTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useValidatePasswordResetTokenQuery(baseOptions: Apollo.QueryHookOptions<ValidatePasswordResetTokenQuery, ValidatePasswordResetTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidatePasswordResetTokenQuery, ValidatePasswordResetTokenQueryVariables>(ValidatePasswordResetTokenDocument, options);
      }
export function useValidatePasswordResetTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidatePasswordResetTokenQuery, ValidatePasswordResetTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidatePasswordResetTokenQuery, ValidatePasswordResetTokenQueryVariables>(ValidatePasswordResetTokenDocument, options);
        }
export type ValidatePasswordResetTokenQueryHookResult = ReturnType<typeof useValidatePasswordResetTokenQuery>;
export type ValidatePasswordResetTokenLazyQueryHookResult = ReturnType<typeof useValidatePasswordResetTokenLazyQuery>;
export type ValidatePasswordResetTokenQueryResult = Apollo.QueryResult<ValidatePasswordResetTokenQuery, ValidatePasswordResetTokenQueryVariables>;
export const BillingPortalSessionDocument = gql`
    query BillingPortalSession($returnUrlPath: String) {
  billingPortalSession(returnUrlPath: $returnUrlPath) {
    url
  }
}
    `;

/**
 * __useBillingPortalSessionQuery__
 *
 * To run a query within a React component, call `useBillingPortalSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useBillingPortalSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBillingPortalSessionQuery({
 *   variables: {
 *      returnUrlPath: // value for 'returnUrlPath'
 *   },
 * });
 */
export function useBillingPortalSessionQuery(baseOptions?: Apollo.QueryHookOptions<BillingPortalSessionQuery, BillingPortalSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BillingPortalSessionQuery, BillingPortalSessionQueryVariables>(BillingPortalSessionDocument, options);
      }
export function useBillingPortalSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BillingPortalSessionQuery, BillingPortalSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BillingPortalSessionQuery, BillingPortalSessionQueryVariables>(BillingPortalSessionDocument, options);
        }
export type BillingPortalSessionQueryHookResult = ReturnType<typeof useBillingPortalSessionQuery>;
export type BillingPortalSessionLazyQueryHookResult = ReturnType<typeof useBillingPortalSessionLazyQuery>;
export type BillingPortalSessionQueryResult = Apollo.QueryResult<BillingPortalSessionQuery, BillingPortalSessionQueryVariables>;
export const CheckoutSessionDocument = gql`
    mutation CheckoutSession($recurringInterval: SubscriptionInterval!, $successUrlPath: String, $plan: BillingPlanKey!, $requirePaymentMethod: Boolean!) {
  checkoutSession(
    recurringInterval: $recurringInterval
    successUrlPath: $successUrlPath
    plan: $plan
    requirePaymentMethod: $requirePaymentMethod
  ) {
    url
  }
}
    `;
export type CheckoutSessionMutationFn = Apollo.MutationFunction<CheckoutSessionMutation, CheckoutSessionMutationVariables>;

/**
 * __useCheckoutSessionMutation__
 *
 * To run a mutation, you first call `useCheckoutSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutSessionMutation, { data, loading, error }] = useCheckoutSessionMutation({
 *   variables: {
 *      recurringInterval: // value for 'recurringInterval'
 *      successUrlPath: // value for 'successUrlPath'
 *      plan: // value for 'plan'
 *      requirePaymentMethod: // value for 'requirePaymentMethod'
 *   },
 * });
 */
export function useCheckoutSessionMutation(baseOptions?: Apollo.MutationHookOptions<CheckoutSessionMutation, CheckoutSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckoutSessionMutation, CheckoutSessionMutationVariables>(CheckoutSessionDocument, options);
      }
export type CheckoutSessionMutationHookResult = ReturnType<typeof useCheckoutSessionMutation>;
export type CheckoutSessionMutationResult = Apollo.MutationResult<CheckoutSessionMutation>;
export type CheckoutSessionMutationOptions = Apollo.BaseMutationOptions<CheckoutSessionMutation, CheckoutSessionMutationVariables>;
export const GetProductPricesDocument = gql`
    query GetProductPrices($product: String!) {
  getProductPrices(product: $product) {
    productPrices {
      created
      recurringInterval
      stripePriceId
      unitAmount
    }
  }
}
    `;

/**
 * __useGetProductPricesQuery__
 *
 * To run a query within a React component, call `useGetProductPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductPricesQuery({
 *   variables: {
 *      product: // value for 'product'
 *   },
 * });
 */
export function useGetProductPricesQuery(baseOptions: Apollo.QueryHookOptions<GetProductPricesQuery, GetProductPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductPricesQuery, GetProductPricesQueryVariables>(GetProductPricesDocument, options);
      }
export function useGetProductPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductPricesQuery, GetProductPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductPricesQuery, GetProductPricesQueryVariables>(GetProductPricesDocument, options);
        }
export type GetProductPricesQueryHookResult = ReturnType<typeof useGetProductPricesQuery>;
export type GetProductPricesLazyQueryHookResult = ReturnType<typeof useGetProductPricesLazyQuery>;
export type GetProductPricesQueryResult = Apollo.QueryResult<GetProductPricesQuery, GetProductPricesQueryVariables>;
export const UpdateBillingSubscriptionDocument = gql`
    mutation UpdateBillingSubscription {
  updateBillingSubscription {
    success
  }
}
    `;
export type UpdateBillingSubscriptionMutationFn = Apollo.MutationFunction<UpdateBillingSubscriptionMutation, UpdateBillingSubscriptionMutationVariables>;

/**
 * __useUpdateBillingSubscriptionMutation__
 *
 * To run a mutation, you first call `useUpdateBillingSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBillingSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBillingSubscriptionMutation, { data, loading, error }] = useUpdateBillingSubscriptionMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateBillingSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBillingSubscriptionMutation, UpdateBillingSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBillingSubscriptionMutation, UpdateBillingSubscriptionMutationVariables>(UpdateBillingSubscriptionDocument, options);
      }
export type UpdateBillingSubscriptionMutationHookResult = ReturnType<typeof useUpdateBillingSubscriptionMutation>;
export type UpdateBillingSubscriptionMutationResult = Apollo.MutationResult<UpdateBillingSubscriptionMutation>;
export type UpdateBillingSubscriptionMutationOptions = Apollo.BaseMutationOptions<UpdateBillingSubscriptionMutation, UpdateBillingSubscriptionMutationVariables>;
export const GetClientConfigDocument = gql`
    query GetClientConfig {
  clientConfig {
    billing {
      isBillingEnabled
      billingUrl
      trialPeriods {
        duration
        isCreditCardRequired
      }
    }
    authProviders {
      google
      password
      microsoft
      sso {
        id
        name
        type
        status
        issuer
      }
    }
    signInPrefilled
    isMultiWorkspaceEnabled
    isEmailVerificationRequired
    defaultSubdomain
    frontDomain
    debugMode
    analyticsEnabled
    support {
      supportDriver
      supportFrontChatId
    }
    sentry {
      dsn
      environment
      release
    }
    captcha {
      provider
      siteKey
    }
    api {
      mutationMaximumAffectedRecords
    }
    chromeExtensionId
    canManageFeatureFlags
    publicFeatureFlags {
      key
      metadata {
        label
        description
        imagePath
      }
    }
    isMicrosoftMessagingEnabled
    isMicrosoftCalendarEnabled
    isGoogleMessagingEnabled
    isGoogleCalendarEnabled
  }
}
    `;

/**
 * __useGetClientConfigQuery__
 *
 * To run a query within a React component, call `useGetClientConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClientConfigQuery(baseOptions?: Apollo.QueryHookOptions<GetClientConfigQuery, GetClientConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientConfigQuery, GetClientConfigQueryVariables>(GetClientConfigDocument, options);
      }
export function useGetClientConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientConfigQuery, GetClientConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientConfigQuery, GetClientConfigQueryVariables>(GetClientConfigDocument, options);
        }
export type GetClientConfigQueryHookResult = ReturnType<typeof useGetClientConfigQuery>;
export type GetClientConfigLazyQueryHookResult = ReturnType<typeof useGetClientConfigLazyQuery>;
export type GetClientConfigQueryResult = Apollo.QueryResult<GetClientConfigQuery, GetClientConfigQueryVariables>;
export const SkipSyncEmailOnboardingStepDocument = gql`
    mutation SkipSyncEmailOnboardingStep {
  skipSyncEmailOnboardingStep {
    success
  }
}
    `;
export type SkipSyncEmailOnboardingStepMutationFn = Apollo.MutationFunction<SkipSyncEmailOnboardingStepMutation, SkipSyncEmailOnboardingStepMutationVariables>;

/**
 * __useSkipSyncEmailOnboardingStepMutation__
 *
 * To run a mutation, you first call `useSkipSyncEmailOnboardingStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSkipSyncEmailOnboardingStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [skipSyncEmailOnboardingStepMutation, { data, loading, error }] = useSkipSyncEmailOnboardingStepMutation({
 *   variables: {
 *   },
 * });
 */
export function useSkipSyncEmailOnboardingStepMutation(baseOptions?: Apollo.MutationHookOptions<SkipSyncEmailOnboardingStepMutation, SkipSyncEmailOnboardingStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SkipSyncEmailOnboardingStepMutation, SkipSyncEmailOnboardingStepMutationVariables>(SkipSyncEmailOnboardingStepDocument, options);
      }
export type SkipSyncEmailOnboardingStepMutationHookResult = ReturnType<typeof useSkipSyncEmailOnboardingStepMutation>;
export type SkipSyncEmailOnboardingStepMutationResult = Apollo.MutationResult<SkipSyncEmailOnboardingStepMutation>;
export type SkipSyncEmailOnboardingStepMutationOptions = Apollo.BaseMutationOptions<SkipSyncEmailOnboardingStepMutation, SkipSyncEmailOnboardingStepMutationVariables>;
export const UpdateWorkspaceFeatureFlagDocument = gql`
    mutation UpdateWorkspaceFeatureFlag($workspaceId: String!, $featureFlag: String!, $value: Boolean!) {
  updateWorkspaceFeatureFlag(
    workspaceId: $workspaceId
    featureFlag: $featureFlag
    value: $value
  )
}
    `;
export type UpdateWorkspaceFeatureFlagMutationFn = Apollo.MutationFunction<UpdateWorkspaceFeatureFlagMutation, UpdateWorkspaceFeatureFlagMutationVariables>;

/**
 * __useUpdateWorkspaceFeatureFlagMutation__
 *
 * To run a mutation, you first call `useUpdateWorkspaceFeatureFlagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkspaceFeatureFlagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkspaceFeatureFlagMutation, { data, loading, error }] = useUpdateWorkspaceFeatureFlagMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      featureFlag: // value for 'featureFlag'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateWorkspaceFeatureFlagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkspaceFeatureFlagMutation, UpdateWorkspaceFeatureFlagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkspaceFeatureFlagMutation, UpdateWorkspaceFeatureFlagMutationVariables>(UpdateWorkspaceFeatureFlagDocument, options);
      }
export type UpdateWorkspaceFeatureFlagMutationHookResult = ReturnType<typeof useUpdateWorkspaceFeatureFlagMutation>;
export type UpdateWorkspaceFeatureFlagMutationResult = Apollo.MutationResult<UpdateWorkspaceFeatureFlagMutation>;
export type UpdateWorkspaceFeatureFlagMutationOptions = Apollo.BaseMutationOptions<UpdateWorkspaceFeatureFlagMutation, UpdateWorkspaceFeatureFlagMutationVariables>;
export const UserLookupAdminPanelDocument = gql`
    mutation UserLookupAdminPanel($userIdentifier: String!) {
  userLookupAdminPanel(userIdentifier: $userIdentifier) {
    user {
      id
      email
      firstName
      lastName
    }
    workspaces {
      id
      name
      logo
      totalUsers
      allowImpersonation
      users {
        id
        email
        firstName
        lastName
      }
      featureFlags {
        key
        value
      }
    }
  }
}
    `;
export type UserLookupAdminPanelMutationFn = Apollo.MutationFunction<UserLookupAdminPanelMutation, UserLookupAdminPanelMutationVariables>;

/**
 * __useUserLookupAdminPanelMutation__
 *
 * To run a mutation, you first call `useUserLookupAdminPanelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLookupAdminPanelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLookupAdminPanelMutation, { data, loading, error }] = useUserLookupAdminPanelMutation({
 *   variables: {
 *      userIdentifier: // value for 'userIdentifier'
 *   },
 * });
 */
export function useUserLookupAdminPanelMutation(baseOptions?: Apollo.MutationHookOptions<UserLookupAdminPanelMutation, UserLookupAdminPanelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLookupAdminPanelMutation, UserLookupAdminPanelMutationVariables>(UserLookupAdminPanelDocument, options);
      }
export type UserLookupAdminPanelMutationHookResult = ReturnType<typeof useUserLookupAdminPanelMutation>;
export type UserLookupAdminPanelMutationResult = Apollo.MutationResult<UserLookupAdminPanelMutation>;
export type UserLookupAdminPanelMutationOptions = Apollo.BaseMutationOptions<UserLookupAdminPanelMutation, UserLookupAdminPanelMutationVariables>;
export const GetEnvironmentVariablesGroupedDocument = gql`
    query GetEnvironmentVariablesGrouped {
  getEnvironmentVariablesGrouped {
    groups {
      name
      description
      isHiddenOnLoad
      variables {
        name
        description
        value
        sensitive
      }
    }
  }
}
    `;

/**
 * __useGetEnvironmentVariablesGroupedQuery__
 *
 * To run a query within a React component, call `useGetEnvironmentVariablesGroupedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnvironmentVariablesGroupedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnvironmentVariablesGroupedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEnvironmentVariablesGroupedQuery(baseOptions?: Apollo.QueryHookOptions<GetEnvironmentVariablesGroupedQuery, GetEnvironmentVariablesGroupedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEnvironmentVariablesGroupedQuery, GetEnvironmentVariablesGroupedQueryVariables>(GetEnvironmentVariablesGroupedDocument, options);
      }
export function useGetEnvironmentVariablesGroupedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEnvironmentVariablesGroupedQuery, GetEnvironmentVariablesGroupedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEnvironmentVariablesGroupedQuery, GetEnvironmentVariablesGroupedQueryVariables>(GetEnvironmentVariablesGroupedDocument, options);
        }
export type GetEnvironmentVariablesGroupedQueryHookResult = ReturnType<typeof useGetEnvironmentVariablesGroupedQuery>;
export type GetEnvironmentVariablesGroupedLazyQueryHookResult = ReturnType<typeof useGetEnvironmentVariablesGroupedLazyQuery>;
export type GetEnvironmentVariablesGroupedQueryResult = Apollo.QueryResult<GetEnvironmentVariablesGroupedQuery, GetEnvironmentVariablesGroupedQueryVariables>;
export const UpdateLabPublicFeatureFlagDocument = gql`
    mutation UpdateLabPublicFeatureFlag($input: UpdateLabPublicFeatureFlagInput!) {
  updateLabPublicFeatureFlag(input: $input) {
    id
    key
    value
  }
}
    `;
export type UpdateLabPublicFeatureFlagMutationFn = Apollo.MutationFunction<UpdateLabPublicFeatureFlagMutation, UpdateLabPublicFeatureFlagMutationVariables>;

/**
 * __useUpdateLabPublicFeatureFlagMutation__
 *
 * To run a mutation, you first call `useUpdateLabPublicFeatureFlagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLabPublicFeatureFlagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLabPublicFeatureFlagMutation, { data, loading, error }] = useUpdateLabPublicFeatureFlagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLabPublicFeatureFlagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLabPublicFeatureFlagMutation, UpdateLabPublicFeatureFlagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLabPublicFeatureFlagMutation, UpdateLabPublicFeatureFlagMutationVariables>(UpdateLabPublicFeatureFlagDocument, options);
      }
export type UpdateLabPublicFeatureFlagMutationHookResult = ReturnType<typeof useUpdateLabPublicFeatureFlagMutation>;
export type UpdateLabPublicFeatureFlagMutationResult = Apollo.MutationResult<UpdateLabPublicFeatureFlagMutation>;
export type UpdateLabPublicFeatureFlagMutationOptions = Apollo.BaseMutationOptions<UpdateLabPublicFeatureFlagMutation, UpdateLabPublicFeatureFlagMutationVariables>;
export const UpdateWorkspaceMemberRoleDocument = gql`
    mutation UpdateWorkspaceMemberRole($workspaceMemberId: String!, $roleId: String) {
  updateWorkspaceMemberRole(
    workspaceMemberId: $workspaceMemberId
    roleId: $roleId
  ) {
    ...WorkspaceMemberQueryFragment
    roles {
      ...RoleFragment
    }
  }
}
    ${WorkspaceMemberQueryFragmentFragmentDoc}
${RoleFragmentFragmentDoc}`;
export type UpdateWorkspaceMemberRoleMutationFn = Apollo.MutationFunction<UpdateWorkspaceMemberRoleMutation, UpdateWorkspaceMemberRoleMutationVariables>;

/**
 * __useUpdateWorkspaceMemberRoleMutation__
 *
 * To run a mutation, you first call `useUpdateWorkspaceMemberRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkspaceMemberRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkspaceMemberRoleMutation, { data, loading, error }] = useUpdateWorkspaceMemberRoleMutation({
 *   variables: {
 *      workspaceMemberId: // value for 'workspaceMemberId'
 *      roleId: // value for 'roleId'
 *   },
 * });
 */
export function useUpdateWorkspaceMemberRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkspaceMemberRoleMutation, UpdateWorkspaceMemberRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkspaceMemberRoleMutation, UpdateWorkspaceMemberRoleMutationVariables>(UpdateWorkspaceMemberRoleDocument, options);
      }
export type UpdateWorkspaceMemberRoleMutationHookResult = ReturnType<typeof useUpdateWorkspaceMemberRoleMutation>;
export type UpdateWorkspaceMemberRoleMutationResult = Apollo.MutationResult<UpdateWorkspaceMemberRoleMutation>;
export type UpdateWorkspaceMemberRoleMutationOptions = Apollo.BaseMutationOptions<UpdateWorkspaceMemberRoleMutation, UpdateWorkspaceMemberRoleMutationVariables>;
export const GetRolesDocument = gql`
    query GetRoles {
  getRoles {
    ...RoleFragment
    workspaceMembers {
      ...WorkspaceMemberQueryFragment
    }
  }
}
    ${RoleFragmentFragmentDoc}
${WorkspaceMemberQueryFragmentFragmentDoc}`;

/**
 * __useGetRolesQuery__
 *
 * To run a query within a React component, call `useGetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
      }
export function useGetRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
        }
export type GetRolesQueryHookResult = ReturnType<typeof useGetRolesQuery>;
export type GetRolesLazyQueryHookResult = ReturnType<typeof useGetRolesLazyQuery>;
export type GetRolesQueryResult = Apollo.QueryResult<GetRolesQuery, GetRolesQueryVariables>;
export const CreateOidcIdentityProviderDocument = gql`
    mutation CreateOIDCIdentityProvider($input: SetupOIDCSsoInput!) {
  createOIDCIdentityProvider(input: $input) {
    id
    type
    issuer
    name
    status
  }
}
    `;
export type CreateOidcIdentityProviderMutationFn = Apollo.MutationFunction<CreateOidcIdentityProviderMutation, CreateOidcIdentityProviderMutationVariables>;

/**
 * __useCreateOidcIdentityProviderMutation__
 *
 * To run a mutation, you first call `useCreateOidcIdentityProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOidcIdentityProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOidcIdentityProviderMutation, { data, loading, error }] = useCreateOidcIdentityProviderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOidcIdentityProviderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOidcIdentityProviderMutation, CreateOidcIdentityProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOidcIdentityProviderMutation, CreateOidcIdentityProviderMutationVariables>(CreateOidcIdentityProviderDocument, options);
      }
export type CreateOidcIdentityProviderMutationHookResult = ReturnType<typeof useCreateOidcIdentityProviderMutation>;
export type CreateOidcIdentityProviderMutationResult = Apollo.MutationResult<CreateOidcIdentityProviderMutation>;
export type CreateOidcIdentityProviderMutationOptions = Apollo.BaseMutationOptions<CreateOidcIdentityProviderMutation, CreateOidcIdentityProviderMutationVariables>;
export const CreateSamlIdentityProviderDocument = gql`
    mutation CreateSAMLIdentityProvider($input: SetupSAMLSsoInput!) {
  createSAMLIdentityProvider(input: $input) {
    id
    type
    issuer
    name
    status
  }
}
    `;
export type CreateSamlIdentityProviderMutationFn = Apollo.MutationFunction<CreateSamlIdentityProviderMutation, CreateSamlIdentityProviderMutationVariables>;

/**
 * __useCreateSamlIdentityProviderMutation__
 *
 * To run a mutation, you first call `useCreateSamlIdentityProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSamlIdentityProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSamlIdentityProviderMutation, { data, loading, error }] = useCreateSamlIdentityProviderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSamlIdentityProviderMutation(baseOptions?: Apollo.MutationHookOptions<CreateSamlIdentityProviderMutation, CreateSamlIdentityProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSamlIdentityProviderMutation, CreateSamlIdentityProviderMutationVariables>(CreateSamlIdentityProviderDocument, options);
      }
export type CreateSamlIdentityProviderMutationHookResult = ReturnType<typeof useCreateSamlIdentityProviderMutation>;
export type CreateSamlIdentityProviderMutationResult = Apollo.MutationResult<CreateSamlIdentityProviderMutation>;
export type CreateSamlIdentityProviderMutationOptions = Apollo.BaseMutationOptions<CreateSamlIdentityProviderMutation, CreateSamlIdentityProviderMutationVariables>;
export const DeleteSsoIdentityProviderDocument = gql`
    mutation DeleteSSOIdentityProvider($input: DeleteSsoInput!) {
  deleteSSOIdentityProvider(input: $input) {
    identityProviderId
  }
}
    `;
export type DeleteSsoIdentityProviderMutationFn = Apollo.MutationFunction<DeleteSsoIdentityProviderMutation, DeleteSsoIdentityProviderMutationVariables>;

/**
 * __useDeleteSsoIdentityProviderMutation__
 *
 * To run a mutation, you first call `useDeleteSsoIdentityProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSsoIdentityProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSsoIdentityProviderMutation, { data, loading, error }] = useDeleteSsoIdentityProviderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSsoIdentityProviderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSsoIdentityProviderMutation, DeleteSsoIdentityProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSsoIdentityProviderMutation, DeleteSsoIdentityProviderMutationVariables>(DeleteSsoIdentityProviderDocument, options);
      }
export type DeleteSsoIdentityProviderMutationHookResult = ReturnType<typeof useDeleteSsoIdentityProviderMutation>;
export type DeleteSsoIdentityProviderMutationResult = Apollo.MutationResult<DeleteSsoIdentityProviderMutation>;
export type DeleteSsoIdentityProviderMutationOptions = Apollo.BaseMutationOptions<DeleteSsoIdentityProviderMutation, DeleteSsoIdentityProviderMutationVariables>;
export const EditSsoIdentityProviderDocument = gql`
    mutation EditSSOIdentityProvider($input: EditSsoInput!) {
  editSSOIdentityProvider(input: $input) {
    id
    type
    issuer
    name
    status
  }
}
    `;
export type EditSsoIdentityProviderMutationFn = Apollo.MutationFunction<EditSsoIdentityProviderMutation, EditSsoIdentityProviderMutationVariables>;

/**
 * __useEditSsoIdentityProviderMutation__
 *
 * To run a mutation, you first call `useEditSsoIdentityProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSsoIdentityProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSsoIdentityProviderMutation, { data, loading, error }] = useEditSsoIdentityProviderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditSsoIdentityProviderMutation(baseOptions?: Apollo.MutationHookOptions<EditSsoIdentityProviderMutation, EditSsoIdentityProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditSsoIdentityProviderMutation, EditSsoIdentityProviderMutationVariables>(EditSsoIdentityProviderDocument, options);
      }
export type EditSsoIdentityProviderMutationHookResult = ReturnType<typeof useEditSsoIdentityProviderMutation>;
export type EditSsoIdentityProviderMutationResult = Apollo.MutationResult<EditSsoIdentityProviderMutation>;
export type EditSsoIdentityProviderMutationOptions = Apollo.BaseMutationOptions<EditSsoIdentityProviderMutation, EditSsoIdentityProviderMutationVariables>;
export const ListSsoIdentityProvidersByWorkspaceIdDocument = gql`
    query ListSSOIdentityProvidersByWorkspaceId {
  listSSOIdentityProvidersByWorkspaceId {
    type
    id
    name
    issuer
    status
  }
}
    `;

/**
 * __useListSsoIdentityProvidersByWorkspaceIdQuery__
 *
 * To run a query within a React component, call `useListSsoIdentityProvidersByWorkspaceIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSsoIdentityProvidersByWorkspaceIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSsoIdentityProvidersByWorkspaceIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useListSsoIdentityProvidersByWorkspaceIdQuery(baseOptions?: Apollo.QueryHookOptions<ListSsoIdentityProvidersByWorkspaceIdQuery, ListSsoIdentityProvidersByWorkspaceIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSsoIdentityProvidersByWorkspaceIdQuery, ListSsoIdentityProvidersByWorkspaceIdQueryVariables>(ListSsoIdentityProvidersByWorkspaceIdDocument, options);
      }
export function useListSsoIdentityProvidersByWorkspaceIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSsoIdentityProvidersByWorkspaceIdQuery, ListSsoIdentityProvidersByWorkspaceIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSsoIdentityProvidersByWorkspaceIdQuery, ListSsoIdentityProvidersByWorkspaceIdQueryVariables>(ListSsoIdentityProvidersByWorkspaceIdDocument, options);
        }
export type ListSsoIdentityProvidersByWorkspaceIdQueryHookResult = ReturnType<typeof useListSsoIdentityProvidersByWorkspaceIdQuery>;
export type ListSsoIdentityProvidersByWorkspaceIdLazyQueryHookResult = ReturnType<typeof useListSsoIdentityProvidersByWorkspaceIdLazyQuery>;
export type ListSsoIdentityProvidersByWorkspaceIdQueryResult = Apollo.QueryResult<ListSsoIdentityProvidersByWorkspaceIdQuery, ListSsoIdentityProvidersByWorkspaceIdQueryVariables>;
export const DeleteUserAccountDocument = gql`
    mutation DeleteUserAccount {
  deleteUser {
    id
  }
}
    `;
export type DeleteUserAccountMutationFn = Apollo.MutationFunction<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>;

/**
 * __useDeleteUserAccountMutation__
 *
 * To run a mutation, you first call `useDeleteUserAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserAccountMutation, { data, loading, error }] = useDeleteUserAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>(DeleteUserAccountDocument, options);
      }
export type DeleteUserAccountMutationHookResult = ReturnType<typeof useDeleteUserAccountMutation>;
export type DeleteUserAccountMutationResult = Apollo.MutationResult<DeleteUserAccountMutation>;
export type DeleteUserAccountMutationOptions = Apollo.BaseMutationOptions<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>;
export const UploadProfilePictureDocument = gql`
    mutation UploadProfilePicture($file: Upload!) {
  uploadProfilePicture(file: $file)
}
    `;
export type UploadProfilePictureMutationFn = Apollo.MutationFunction<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>;

/**
 * __useUploadProfilePictureMutation__
 *
 * To run a mutation, you first call `useUploadProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProfilePictureMutation, { data, loading, error }] = useUploadProfilePictureMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>(UploadProfilePictureDocument, options);
      }
export type UploadProfilePictureMutationHookResult = ReturnType<typeof useUploadProfilePictureMutation>;
export type UploadProfilePictureMutationResult = Apollo.MutationResult<UploadProfilePictureMutation>;
export type UploadProfilePictureMutationOptions = Apollo.BaseMutationOptions<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    ...UserQueryFragment
  }
}
    ${UserQueryFragmentFragmentDoc}`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const ActivateWorkflowVersionDocument = gql`
    mutation ActivateWorkflowVersion($workflowVersionId: String!) {
  activateWorkflowVersion(workflowVersionId: $workflowVersionId)
}
    `;
export type ActivateWorkflowVersionMutationFn = Apollo.MutationFunction<ActivateWorkflowVersionMutation, ActivateWorkflowVersionMutationVariables>;

/**
 * __useActivateWorkflowVersionMutation__
 *
 * To run a mutation, you first call `useActivateWorkflowVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateWorkflowVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateWorkflowVersionMutation, { data, loading, error }] = useActivateWorkflowVersionMutation({
 *   variables: {
 *      workflowVersionId: // value for 'workflowVersionId'
 *   },
 * });
 */
export function useActivateWorkflowVersionMutation(baseOptions?: Apollo.MutationHookOptions<ActivateWorkflowVersionMutation, ActivateWorkflowVersionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateWorkflowVersionMutation, ActivateWorkflowVersionMutationVariables>(ActivateWorkflowVersionDocument, options);
      }
export type ActivateWorkflowVersionMutationHookResult = ReturnType<typeof useActivateWorkflowVersionMutation>;
export type ActivateWorkflowVersionMutationResult = Apollo.MutationResult<ActivateWorkflowVersionMutation>;
export type ActivateWorkflowVersionMutationOptions = Apollo.BaseMutationOptions<ActivateWorkflowVersionMutation, ActivateWorkflowVersionMutationVariables>;
export const ComputeStepOutputSchemaDocument = gql`
    mutation ComputeStepOutputSchema($input: ComputeStepOutputSchemaInput!) {
  computeStepOutputSchema(input: $input)
}
    `;
export type ComputeStepOutputSchemaMutationFn = Apollo.MutationFunction<ComputeStepOutputSchemaMutation, ComputeStepOutputSchemaMutationVariables>;

/**
 * __useComputeStepOutputSchemaMutation__
 *
 * To run a mutation, you first call `useComputeStepOutputSchemaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useComputeStepOutputSchemaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [computeStepOutputSchemaMutation, { data, loading, error }] = useComputeStepOutputSchemaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useComputeStepOutputSchemaMutation(baseOptions?: Apollo.MutationHookOptions<ComputeStepOutputSchemaMutation, ComputeStepOutputSchemaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ComputeStepOutputSchemaMutation, ComputeStepOutputSchemaMutationVariables>(ComputeStepOutputSchemaDocument, options);
      }
export type ComputeStepOutputSchemaMutationHookResult = ReturnType<typeof useComputeStepOutputSchemaMutation>;
export type ComputeStepOutputSchemaMutationResult = Apollo.MutationResult<ComputeStepOutputSchemaMutation>;
export type ComputeStepOutputSchemaMutationOptions = Apollo.BaseMutationOptions<ComputeStepOutputSchemaMutation, ComputeStepOutputSchemaMutationVariables>;
export const CreateDraftFromWorkflowVersionDocument = gql`
    mutation CreateDraftFromWorkflowVersion($input: CreateDraftFromWorkflowVersionInput!) {
  createDraftFromWorkflowVersion(input: $input) {
    id
  }
}
    `;
export type CreateDraftFromWorkflowVersionMutationFn = Apollo.MutationFunction<CreateDraftFromWorkflowVersionMutation, CreateDraftFromWorkflowVersionMutationVariables>;

/**
 * __useCreateDraftFromWorkflowVersionMutation__
 *
 * To run a mutation, you first call `useCreateDraftFromWorkflowVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftFromWorkflowVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftFromWorkflowVersionMutation, { data, loading, error }] = useCreateDraftFromWorkflowVersionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDraftFromWorkflowVersionMutation(baseOptions?: Apollo.MutationHookOptions<CreateDraftFromWorkflowVersionMutation, CreateDraftFromWorkflowVersionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDraftFromWorkflowVersionMutation, CreateDraftFromWorkflowVersionMutationVariables>(CreateDraftFromWorkflowVersionDocument, options);
      }
export type CreateDraftFromWorkflowVersionMutationHookResult = ReturnType<typeof useCreateDraftFromWorkflowVersionMutation>;
export type CreateDraftFromWorkflowVersionMutationResult = Apollo.MutationResult<CreateDraftFromWorkflowVersionMutation>;
export type CreateDraftFromWorkflowVersionMutationOptions = Apollo.BaseMutationOptions<CreateDraftFromWorkflowVersionMutation, CreateDraftFromWorkflowVersionMutationVariables>;
export const CreateWorkflowVersionStepDocument = gql`
    mutation CreateWorkflowVersionStep($input: CreateWorkflowVersionStepInput!) {
  createWorkflowVersionStep(input: $input) {
    id
    name
    type
    settings
    valid
  }
}
    `;
export type CreateWorkflowVersionStepMutationFn = Apollo.MutationFunction<CreateWorkflowVersionStepMutation, CreateWorkflowVersionStepMutationVariables>;

/**
 * __useCreateWorkflowVersionStepMutation__
 *
 * To run a mutation, you first call `useCreateWorkflowVersionStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkflowVersionStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkflowVersionStepMutation, { data, loading, error }] = useCreateWorkflowVersionStepMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWorkflowVersionStepMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkflowVersionStepMutation, CreateWorkflowVersionStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkflowVersionStepMutation, CreateWorkflowVersionStepMutationVariables>(CreateWorkflowVersionStepDocument, options);
      }
export type CreateWorkflowVersionStepMutationHookResult = ReturnType<typeof useCreateWorkflowVersionStepMutation>;
export type CreateWorkflowVersionStepMutationResult = Apollo.MutationResult<CreateWorkflowVersionStepMutation>;
export type CreateWorkflowVersionStepMutationOptions = Apollo.BaseMutationOptions<CreateWorkflowVersionStepMutation, CreateWorkflowVersionStepMutationVariables>;
export const DeactivateWorkflowVersionDocument = gql`
    mutation DeactivateWorkflowVersion($workflowVersionId: String!) {
  deactivateWorkflowVersion(workflowVersionId: $workflowVersionId)
}
    `;
export type DeactivateWorkflowVersionMutationFn = Apollo.MutationFunction<DeactivateWorkflowVersionMutation, DeactivateWorkflowVersionMutationVariables>;

/**
 * __useDeactivateWorkflowVersionMutation__
 *
 * To run a mutation, you first call `useDeactivateWorkflowVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateWorkflowVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateWorkflowVersionMutation, { data, loading, error }] = useDeactivateWorkflowVersionMutation({
 *   variables: {
 *      workflowVersionId: // value for 'workflowVersionId'
 *   },
 * });
 */
export function useDeactivateWorkflowVersionMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateWorkflowVersionMutation, DeactivateWorkflowVersionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateWorkflowVersionMutation, DeactivateWorkflowVersionMutationVariables>(DeactivateWorkflowVersionDocument, options);
      }
export type DeactivateWorkflowVersionMutationHookResult = ReturnType<typeof useDeactivateWorkflowVersionMutation>;
export type DeactivateWorkflowVersionMutationResult = Apollo.MutationResult<DeactivateWorkflowVersionMutation>;
export type DeactivateWorkflowVersionMutationOptions = Apollo.BaseMutationOptions<DeactivateWorkflowVersionMutation, DeactivateWorkflowVersionMutationVariables>;
export const DeleteWorkflowVersionStepDocument = gql`
    mutation DeleteWorkflowVersionStep($input: DeleteWorkflowVersionStepInput!) {
  deleteWorkflowVersionStep(input: $input) {
    id
    name
    type
    settings
    valid
  }
}
    `;
export type DeleteWorkflowVersionStepMutationFn = Apollo.MutationFunction<DeleteWorkflowVersionStepMutation, DeleteWorkflowVersionStepMutationVariables>;

/**
 * __useDeleteWorkflowVersionStepMutation__
 *
 * To run a mutation, you first call `useDeleteWorkflowVersionStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkflowVersionStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkflowVersionStepMutation, { data, loading, error }] = useDeleteWorkflowVersionStepMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteWorkflowVersionStepMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkflowVersionStepMutation, DeleteWorkflowVersionStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkflowVersionStepMutation, DeleteWorkflowVersionStepMutationVariables>(DeleteWorkflowVersionStepDocument, options);
      }
export type DeleteWorkflowVersionStepMutationHookResult = ReturnType<typeof useDeleteWorkflowVersionStepMutation>;
export type DeleteWorkflowVersionStepMutationResult = Apollo.MutationResult<DeleteWorkflowVersionStepMutation>;
export type DeleteWorkflowVersionStepMutationOptions = Apollo.BaseMutationOptions<DeleteWorkflowVersionStepMutation, DeleteWorkflowVersionStepMutationVariables>;
export const RunWorkflowVersionDocument = gql`
    mutation RunWorkflowVersion($input: RunWorkflowVersionInput!) {
  runWorkflowVersion(input: $input) {
    workflowRunId
  }
}
    `;
export type RunWorkflowVersionMutationFn = Apollo.MutationFunction<RunWorkflowVersionMutation, RunWorkflowVersionMutationVariables>;

/**
 * __useRunWorkflowVersionMutation__
 *
 * To run a mutation, you first call `useRunWorkflowVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRunWorkflowVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [runWorkflowVersionMutation, { data, loading, error }] = useRunWorkflowVersionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRunWorkflowVersionMutation(baseOptions?: Apollo.MutationHookOptions<RunWorkflowVersionMutation, RunWorkflowVersionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RunWorkflowVersionMutation, RunWorkflowVersionMutationVariables>(RunWorkflowVersionDocument, options);
      }
export type RunWorkflowVersionMutationHookResult = ReturnType<typeof useRunWorkflowVersionMutation>;
export type RunWorkflowVersionMutationResult = Apollo.MutationResult<RunWorkflowVersionMutation>;
export type RunWorkflowVersionMutationOptions = Apollo.BaseMutationOptions<RunWorkflowVersionMutation, RunWorkflowVersionMutationVariables>;
export const UpdateWorkflowVersionStepDocument = gql`
    mutation UpdateWorkflowVersionStep($input: UpdateWorkflowVersionStepInput!) {
  updateWorkflowVersionStep(input: $input) {
    id
    name
    type
    settings
    valid
  }
}
    `;
export type UpdateWorkflowVersionStepMutationFn = Apollo.MutationFunction<UpdateWorkflowVersionStepMutation, UpdateWorkflowVersionStepMutationVariables>;

/**
 * __useUpdateWorkflowVersionStepMutation__
 *
 * To run a mutation, you first call `useUpdateWorkflowVersionStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkflowVersionStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkflowVersionStepMutation, { data, loading, error }] = useUpdateWorkflowVersionStepMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWorkflowVersionStepMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkflowVersionStepMutation, UpdateWorkflowVersionStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkflowVersionStepMutation, UpdateWorkflowVersionStepMutationVariables>(UpdateWorkflowVersionStepDocument, options);
      }
export type UpdateWorkflowVersionStepMutationHookResult = ReturnType<typeof useUpdateWorkflowVersionStepMutation>;
export type UpdateWorkflowVersionStepMutationResult = Apollo.MutationResult<UpdateWorkflowVersionStepMutation>;
export type UpdateWorkflowVersionStepMutationOptions = Apollo.BaseMutationOptions<UpdateWorkflowVersionStepMutation, UpdateWorkflowVersionStepMutationVariables>;
export const DeleteWorkspaceInvitationDocument = gql`
    mutation DeleteWorkspaceInvitation($appTokenId: String!) {
  deleteWorkspaceInvitation(appTokenId: $appTokenId)
}
    `;
export type DeleteWorkspaceInvitationMutationFn = Apollo.MutationFunction<DeleteWorkspaceInvitationMutation, DeleteWorkspaceInvitationMutationVariables>;

/**
 * __useDeleteWorkspaceInvitationMutation__
 *
 * To run a mutation, you first call `useDeleteWorkspaceInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkspaceInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkspaceInvitationMutation, { data, loading, error }] = useDeleteWorkspaceInvitationMutation({
 *   variables: {
 *      appTokenId: // value for 'appTokenId'
 *   },
 * });
 */
export function useDeleteWorkspaceInvitationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkspaceInvitationMutation, DeleteWorkspaceInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkspaceInvitationMutation, DeleteWorkspaceInvitationMutationVariables>(DeleteWorkspaceInvitationDocument, options);
      }
export type DeleteWorkspaceInvitationMutationHookResult = ReturnType<typeof useDeleteWorkspaceInvitationMutation>;
export type DeleteWorkspaceInvitationMutationResult = Apollo.MutationResult<DeleteWorkspaceInvitationMutation>;
export type DeleteWorkspaceInvitationMutationOptions = Apollo.BaseMutationOptions<DeleteWorkspaceInvitationMutation, DeleteWorkspaceInvitationMutationVariables>;
export const ResendWorkspaceInvitationDocument = gql`
    mutation ResendWorkspaceInvitation($appTokenId: String!) {
  resendWorkspaceInvitation(appTokenId: $appTokenId) {
    success
    errors
    result {
      ... on WorkspaceInvitation {
        id
        email
        expiresAt
      }
    }
  }
}
    `;
export type ResendWorkspaceInvitationMutationFn = Apollo.MutationFunction<ResendWorkspaceInvitationMutation, ResendWorkspaceInvitationMutationVariables>;

/**
 * __useResendWorkspaceInvitationMutation__
 *
 * To run a mutation, you first call `useResendWorkspaceInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendWorkspaceInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendWorkspaceInvitationMutation, { data, loading, error }] = useResendWorkspaceInvitationMutation({
 *   variables: {
 *      appTokenId: // value for 'appTokenId'
 *   },
 * });
 */
export function useResendWorkspaceInvitationMutation(baseOptions?: Apollo.MutationHookOptions<ResendWorkspaceInvitationMutation, ResendWorkspaceInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendWorkspaceInvitationMutation, ResendWorkspaceInvitationMutationVariables>(ResendWorkspaceInvitationDocument, options);
      }
export type ResendWorkspaceInvitationMutationHookResult = ReturnType<typeof useResendWorkspaceInvitationMutation>;
export type ResendWorkspaceInvitationMutationResult = Apollo.MutationResult<ResendWorkspaceInvitationMutation>;
export type ResendWorkspaceInvitationMutationOptions = Apollo.BaseMutationOptions<ResendWorkspaceInvitationMutation, ResendWorkspaceInvitationMutationVariables>;
export const SendInvitationsDocument = gql`
    mutation SendInvitations($emails: [String!]!) {
  sendInvitations(emails: $emails) {
    success
    errors
    result {
      ... on WorkspaceInvitation {
        id
        email
        expiresAt
      }
    }
  }
}
    `;
export type SendInvitationsMutationFn = Apollo.MutationFunction<SendInvitationsMutation, SendInvitationsMutationVariables>;

/**
 * __useSendInvitationsMutation__
 *
 * To run a mutation, you first call `useSendInvitationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendInvitationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendInvitationsMutation, { data, loading, error }] = useSendInvitationsMutation({
 *   variables: {
 *      emails: // value for 'emails'
 *   },
 * });
 */
export function useSendInvitationsMutation(baseOptions?: Apollo.MutationHookOptions<SendInvitationsMutation, SendInvitationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendInvitationsMutation, SendInvitationsMutationVariables>(SendInvitationsDocument, options);
      }
export type SendInvitationsMutationHookResult = ReturnType<typeof useSendInvitationsMutation>;
export type SendInvitationsMutationResult = Apollo.MutationResult<SendInvitationsMutation>;
export type SendInvitationsMutationOptions = Apollo.BaseMutationOptions<SendInvitationsMutation, SendInvitationsMutationVariables>;
export const GetWorkspaceInvitationsDocument = gql`
    query GetWorkspaceInvitations {
  findWorkspaceInvitations {
    id
    email
    expiresAt
  }
}
    `;

/**
 * __useGetWorkspaceInvitationsQuery__
 *
 * To run a query within a React component, call `useGetWorkspaceInvitationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspaceInvitationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspaceInvitationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWorkspaceInvitationsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkspaceInvitationsQuery, GetWorkspaceInvitationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkspaceInvitationsQuery, GetWorkspaceInvitationsQueryVariables>(GetWorkspaceInvitationsDocument, options);
      }
export function useGetWorkspaceInvitationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspaceInvitationsQuery, GetWorkspaceInvitationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkspaceInvitationsQuery, GetWorkspaceInvitationsQueryVariables>(GetWorkspaceInvitationsDocument, options);
        }
export type GetWorkspaceInvitationsQueryHookResult = ReturnType<typeof useGetWorkspaceInvitationsQuery>;
export type GetWorkspaceInvitationsLazyQueryHookResult = ReturnType<typeof useGetWorkspaceInvitationsLazyQuery>;
export type GetWorkspaceInvitationsQueryResult = Apollo.QueryResult<GetWorkspaceInvitationsQuery, GetWorkspaceInvitationsQueryVariables>;
export const ActivateWorkspaceDocument = gql`
    mutation ActivateWorkspace($input: ActivateWorkspaceInput!) {
  activateWorkspace(data: $input) {
    id
  }
}
    `;
export type ActivateWorkspaceMutationFn = Apollo.MutationFunction<ActivateWorkspaceMutation, ActivateWorkspaceMutationVariables>;

/**
 * __useActivateWorkspaceMutation__
 *
 * To run a mutation, you first call `useActivateWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateWorkspaceMutation, { data, loading, error }] = useActivateWorkspaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivateWorkspaceMutation(baseOptions?: Apollo.MutationHookOptions<ActivateWorkspaceMutation, ActivateWorkspaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateWorkspaceMutation, ActivateWorkspaceMutationVariables>(ActivateWorkspaceDocument, options);
      }
export type ActivateWorkspaceMutationHookResult = ReturnType<typeof useActivateWorkspaceMutation>;
export type ActivateWorkspaceMutationResult = Apollo.MutationResult<ActivateWorkspaceMutation>;
export type ActivateWorkspaceMutationOptions = Apollo.BaseMutationOptions<ActivateWorkspaceMutation, ActivateWorkspaceMutationVariables>;
export const DeleteCurrentWorkspaceDocument = gql`
    mutation DeleteCurrentWorkspace {
  deleteCurrentWorkspace {
    id
  }
}
    `;
export type DeleteCurrentWorkspaceMutationFn = Apollo.MutationFunction<DeleteCurrentWorkspaceMutation, DeleteCurrentWorkspaceMutationVariables>;

/**
 * __useDeleteCurrentWorkspaceMutation__
 *
 * To run a mutation, you first call `useDeleteCurrentWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCurrentWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCurrentWorkspaceMutation, { data, loading, error }] = useDeleteCurrentWorkspaceMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteCurrentWorkspaceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCurrentWorkspaceMutation, DeleteCurrentWorkspaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCurrentWorkspaceMutation, DeleteCurrentWorkspaceMutationVariables>(DeleteCurrentWorkspaceDocument, options);
      }
export type DeleteCurrentWorkspaceMutationHookResult = ReturnType<typeof useDeleteCurrentWorkspaceMutation>;
export type DeleteCurrentWorkspaceMutationResult = Apollo.MutationResult<DeleteCurrentWorkspaceMutation>;
export type DeleteCurrentWorkspaceMutationOptions = Apollo.BaseMutationOptions<DeleteCurrentWorkspaceMutation, DeleteCurrentWorkspaceMutationVariables>;
export const UpdateWorkspaceDocument = gql`
    mutation UpdateWorkspace($input: UpdateWorkspaceInput!) {
  updateWorkspace(data: $input) {
    id
    customDomain
    subdomain
    displayName
    logo
    allowImpersonation
    isPublicInviteLinkEnabled
    isGoogleAuthEnabled
    isMicrosoftAuthEnabled
    isPasswordAuthEnabled
  }
}
    `;
export type UpdateWorkspaceMutationFn = Apollo.MutationFunction<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>;

/**
 * __useUpdateWorkspaceMutation__
 *
 * To run a mutation, you first call `useUpdateWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkspaceMutation, { data, loading, error }] = useUpdateWorkspaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWorkspaceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(UpdateWorkspaceDocument, options);
      }
export type UpdateWorkspaceMutationHookResult = ReturnType<typeof useUpdateWorkspaceMutation>;
export type UpdateWorkspaceMutationResult = Apollo.MutationResult<UpdateWorkspaceMutation>;
export type UpdateWorkspaceMutationOptions = Apollo.BaseMutationOptions<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>;
export const UploadWorkspaceLogoDocument = gql`
    mutation UploadWorkspaceLogo($file: Upload!) {
  uploadWorkspaceLogo(file: $file)
}
    `;
export type UploadWorkspaceLogoMutationFn = Apollo.MutationFunction<UploadWorkspaceLogoMutation, UploadWorkspaceLogoMutationVariables>;

/**
 * __useUploadWorkspaceLogoMutation__
 *
 * To run a mutation, you first call `useUploadWorkspaceLogoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadWorkspaceLogoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadWorkspaceLogoMutation, { data, loading, error }] = useUploadWorkspaceLogoMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadWorkspaceLogoMutation(baseOptions?: Apollo.MutationHookOptions<UploadWorkspaceLogoMutation, UploadWorkspaceLogoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadWorkspaceLogoMutation, UploadWorkspaceLogoMutationVariables>(UploadWorkspaceLogoDocument, options);
      }
export type UploadWorkspaceLogoMutationHookResult = ReturnType<typeof useUploadWorkspaceLogoMutation>;
export type UploadWorkspaceLogoMutationResult = Apollo.MutationResult<UploadWorkspaceLogoMutation>;
export type UploadWorkspaceLogoMutationOptions = Apollo.BaseMutationOptions<UploadWorkspaceLogoMutation, UploadWorkspaceLogoMutationVariables>;
export const GetCustomDomainDetailsDocument = gql`
    query GetCustomDomainDetails {
  getCustomDomainDetails {
    customDomain
    records {
      type
      key
      value
      validationType
      status
    }
  }
}
    `;

/**
 * __useGetCustomDomainDetailsQuery__
 *
 * To run a query within a React component, call `useGetCustomDomainDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomDomainDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomDomainDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomDomainDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomDomainDetailsQuery, GetCustomDomainDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomDomainDetailsQuery, GetCustomDomainDetailsQueryVariables>(GetCustomDomainDetailsDocument, options);
      }
export function useGetCustomDomainDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomDomainDetailsQuery, GetCustomDomainDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomDomainDetailsQuery, GetCustomDomainDetailsQueryVariables>(GetCustomDomainDetailsDocument, options);
        }
export type GetCustomDomainDetailsQueryHookResult = ReturnType<typeof useGetCustomDomainDetailsQuery>;
export type GetCustomDomainDetailsLazyQueryHookResult = ReturnType<typeof useGetCustomDomainDetailsLazyQuery>;
export type GetCustomDomainDetailsQueryResult = Apollo.QueryResult<GetCustomDomainDetailsQuery, GetCustomDomainDetailsQueryVariables>;
export const GetWorkspaceFromInviteHashDocument = gql`
    query GetWorkspaceFromInviteHash($inviteHash: String!) {
  findWorkspaceFromInviteHash(inviteHash: $inviteHash) {
    id
    displayName
    logo
    allowImpersonation
  }
}
    `;

/**
 * __useGetWorkspaceFromInviteHashQuery__
 *
 * To run a query within a React component, call `useGetWorkspaceFromInviteHashQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkspaceFromInviteHashQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkspaceFromInviteHashQuery({
 *   variables: {
 *      inviteHash: // value for 'inviteHash'
 *   },
 * });
 */
export function useGetWorkspaceFromInviteHashQuery(baseOptions: Apollo.QueryHookOptions<GetWorkspaceFromInviteHashQuery, GetWorkspaceFromInviteHashQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkspaceFromInviteHashQuery, GetWorkspaceFromInviteHashQueryVariables>(GetWorkspaceFromInviteHashDocument, options);
      }
export function useGetWorkspaceFromInviteHashLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkspaceFromInviteHashQuery, GetWorkspaceFromInviteHashQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkspaceFromInviteHashQuery, GetWorkspaceFromInviteHashQueryVariables>(GetWorkspaceFromInviteHashDocument, options);
        }
export type GetWorkspaceFromInviteHashQueryHookResult = ReturnType<typeof useGetWorkspaceFromInviteHashQuery>;
export type GetWorkspaceFromInviteHashLazyQueryHookResult = ReturnType<typeof useGetWorkspaceFromInviteHashLazyQuery>;
export type GetWorkspaceFromInviteHashQueryResult = Apollo.QueryResult<GetWorkspaceFromInviteHashQuery, GetWorkspaceFromInviteHashQueryVariables>;