import NavigationBar from '@/components/NavigationBar';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';


export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="+not-found"/>
      </Stack>
    </PaperProvider>
  );
}
