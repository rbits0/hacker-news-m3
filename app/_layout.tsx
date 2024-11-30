import { Stack } from 'expo-router';
import { configureFonts, DefaultTheme, MD3DarkTheme, MD3Theme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from '@/store';


const fontConfig = {
  // bodyLarge: {
  //   fontSize: 20,
  //   lineHeight: 28,
  //   // letterSpacing: 0
  // },
  // bodyMedium: {
  //   fontSize: 16,
  //   lineHeight: 24,
  //   letterSpacing: 0,
  // }
};


const theme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig }),
}


export default function RootLayout() {
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
