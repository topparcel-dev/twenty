import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ReactNode } from 'react';

import { ThemeContextProvider } from '@ui/theme/provider/ThemeContextProvider';
import { ThemeType } from '@ui/theme/types/ThemeType';


type ThemeProviderProps = {
  theme: ThemeType;
  children: ReactNode;
};

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeContextProvider theme={theme}>{children}</ThemeContextProvider>
    </EmotionThemeProvider>
  );
};