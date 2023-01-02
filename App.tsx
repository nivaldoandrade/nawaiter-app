import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import theme from './src/global/styles/theme';
import { Main } from './src/Main';
import { CartProvider } from './src/context/useCart';

export default function App() {
  const [fonstLoaded] = useFonts({
    'GeneralSans-400': require('./assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./assets/fonts/GeneralSans-Bold.otf')
  });

  if (!fonstLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Main />

        <StatusBar style="dark" />
      </CartProvider>
    </ThemeProvider>
  );
}
