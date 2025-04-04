import { AppRouter } from '@/app/components/AppRouter';
import { ApolloDevLogEffect } from '@/debug/components/ApolloDevLogEffect';
import { RecoilDebugObserverEffect } from '@/debug/components/RecoilDebugObserver';
import { AppErrorBoundary } from '@/error-handler/components/AppErrorBoundary';
import { AppRootErrorFallback } from '@/error-handler/components/AppRootErrorFallback';
import { ExceptionHandlerProvider } from '@/error-handler/components/ExceptionHandlerProvider';
import { SnackBarProviderScope } from '@/ui/feedback/snack-bar-manager/scopes/SnackBarProviderScope';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import { RecoilURLSyncJSON } from 'recoil-sync';
import { initialI18nActivate } from '~/utils/i18n/initialI18nActivate';
import { IconsProvider } from 'twenty-ui/display';

initialI18nActivate();

export const App = () => {
  return (
    <RecoilRoot>
      <RecoilURLSyncJSON location={{ part: 'queryParams' }}>
        <AppErrorBoundary
          resetOnLocationChange={false}
          FallbackComponent={AppRootErrorFallback}
        >
          <I18nProvider i18n={i18n}>
            <RecoilDebugObserverEffect />
            <ApolloDevLogEffect />
            <SnackBarProviderScope snackBarManagerScopeId="snack-bar-manager">
              <IconsProvider>
                <ExceptionHandlerProvider>
                  <HelmetProvider>
                    <AppRouter />
                  </HelmetProvider>
                </ExceptionHandlerProvider>
              </IconsProvider>
            </SnackBarProviderScope>
          </I18nProvider>
        </AppErrorBoundary>
      </RecoilURLSyncJSON>
    </RecoilRoot>
  );
};
