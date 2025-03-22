import { AppRouter } from '@/app/components/AppRouter';
import { ApolloDevLogEffect } from '@/debug/components/ApolloDevLogEffect';
import { RecoilDebugObserverEffect } from '@/debug/components/RecoilDebugObserver';
import { AppErrorBoundary } from '@/error-handler/components/AppErrorBoundary';
import { AppErrorFallback } from '@/error-handler/components/AppErrorFallback';
import { ExceptionHandlerProvider } from '@/error-handler/components/ExceptionHandlerProvider';
import { SnackBarProviderScope } from '@/ui/feedback/snack-bar-manager/scopes/SnackBarProviderScope';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import { RecoilURLSyncJSON } from 'recoil-sync';
import { IconsProvider } from 'twenty-ui';
import { initialI18nActivate } from '~/utils/i18n/initialI18nActivate';

initialI18nActivate();

export const App = () => {
  return (
    <RecoilRoot>
      <RecoilURLSyncJSON location={{ part: 'queryParams' }}>
        <AppErrorBoundary FallbackComponent={AppErrorFallback}>
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
