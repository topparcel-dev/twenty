import { SettingsAccountsRadioSettingsCard } from '@/settings/accounts/components/SettingsAccountsRadioSettingsCard';
import { SettingsAccountsVisibilityIcon } from '@/settings/accounts/components/SettingsAccountsVisibilityIcon';
import { MessageChannelVisibility } from '~/generated/graphql';

type SettingsAccountsMessageVisibilityCardProps = {
  onChange: (nextValue: MessageChannelVisibility) => void;
  value?: MessageChannelVisibility;
};

const inboxSettingsVisibilityOptions = [
  {
    title: 'Everything',
    description: 'Subject, body and attachments will be shared with your team.',
    value: MessageChannelVisibility.SHARE_EVERYTHING,
    cardMedia: (
      <SettingsAccountsVisibilityIcon
        metadata="active"
        subject="active"
        body="active"
      />
    ),
  },
  {
    title: 'Subject and metadata',
    description: 'Subject and metadata will be shared with your team.',
    value: MessageChannelVisibility.SUBJECT,
    cardMedia: (
      <SettingsAccountsVisibilityIcon
        metadata="active"
        subject="active"
        body="inactive"
      />
    ),
  },
  {
    title: 'Metadata',
    description: 'Timestamp and participants will be shared with your team.',
    value: MessageChannelVisibility.METADATA,
    cardMedia: (
      <SettingsAccountsVisibilityIcon
        metadata="active"
        subject="inactive"
        body="inactive"
      />
    ),
  },
];

export const SettingsAccountsMessageVisibilityCard = ({
  onChange,
  value = MessageChannelVisibility.SHARE_EVERYTHING,
}: SettingsAccountsMessageVisibilityCardProps) => (
  <SettingsAccountsRadioSettingsCard
    name="message-visibility"
    options={inboxSettingsVisibilityOptions}
    value={value}
    onChange={onChange}
  />
);
