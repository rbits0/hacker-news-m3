// Partly from https://github.com/astrojarred/tabs-v-stacks/blob/main/app/(tabs)/(home%2Cexplore)/_layout.tsx

import NavigationBar from "@/components/NavigationBar";
import { Stack } from "expo-router";


export default function Layout({ segment }: { segment: string}) {
  let rootTitle = (() => {
    switch (segment) {
      case '(home)':
        return 'Home';
      case '(settings)':
        return 'Settings';
      default:
        return 'Unknown';
    }
  })();

  return (
    <Stack
      screenOptions={{ header: ({ options }) => <NavigationBar title={options.title} /> }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: rootTitle,
        }}
      />
      <Stack.Screen
        name="comments/[id]"
        options={{
          title: 'Comments'
        }}
      />
    </Stack>
  );
}