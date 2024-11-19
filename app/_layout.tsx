import NavigationBar from '@/components/NavigationBar';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';


export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ header: ({ options }) => <NavigationBar title={options.title} /> }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="+not-found"/>
      </Stack>
    </PaperProvider>
  );
}
