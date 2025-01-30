import { Stack } from 'expo-router';
import { configureFonts, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from '@/store';
import { Platform, useWindowDimensions } from 'react-native';
import { loadSettings } from '@/store/slices/settings';


export const LARGE_WIDTH = 700;


export default function RootLayout() {
  const { width } = useWindowDimensions();

  const defaultFontConfig = {
    bodyLarge: {
      fontSize: 16,
      letterSpacing: 0.15,
      lineHeight: Platform.select({
        web: 22,
        default: 24,
      }),
    },
    bodyMedium: {
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: 20,
    },
  };

  const largeFontConfig = {
    bodyLarge: {
      fontSize: 18,
      lineHeight: 26,
    },
    bodyMedium: {
      fontSize: 16,
      lineHeight: 24,
    }
  }

  const fontConfig = width < LARGE_WIDTH ? defaultFontConfig : largeFontConfig;


  const theme = {
    ...MD3DarkTheme,
    fonts: configureFonts({ config: fontConfig }),
  }

  store.dispatch(loadSettings());


  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)"/>
          <Stack.Screen name="+not-found"/>
        </Stack>
      </PaperProvider>
    </Provider>
  );
}
