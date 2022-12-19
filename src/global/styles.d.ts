/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';
import theme from './styles/theme';

declare module 'styled-components' {
  type MyThemeType = typeof theme;

  export interface DefaultTheme extends MyThemeType { }
}
