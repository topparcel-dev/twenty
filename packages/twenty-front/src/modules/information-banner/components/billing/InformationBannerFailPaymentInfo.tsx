import { InformationBanner } from '@/information-banner/components/InformationBanner';
import { SettingsPath } from '@/types/SettingsPath';
import { isDefined } from 'twenty-ui';
import { useBillingPortalSessionQuery } from '~/generated/graphql';
import { getSettingsPath } from '~/utils/navigation/getSettingsPath';
import { useRedirect } from '@/domain-manager/hooks/useRedirect';

export const InformationBannerFailPaymentInfo = () => {
  const { redirect } = useRedirect();

  const { data, loading } = useBillingPortalSessionQuery({
    variables: {
      returnUrlPath: getSettingsPath(SettingsPath.Billing),
    },
  });

  const openBillingPortal = () => {
    if (isDefined(data) && isDefined(data.billingPortalSession.url)) {
      redirect(data.billingPortalSession.url);
    }
  };

  return (
    <InformationBanner
      variant="danger"
      message={'Last payment failed. Please update your billing details.'}
      buttonTitle="Update"
      buttonOnClick={() => openBillingPortal()}
      isButtonDisabled={loading || !isDefined(data)}
    />
  );
};
