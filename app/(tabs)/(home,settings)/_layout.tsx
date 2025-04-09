// From https://github.com/astrojarred/tabs-v-stacks/blob/main/app/(tabs)/(home%2Cexplore)/_layout.tsx

import NavigationBar from "@/components/NavigationBar";
import { Stack } from "expo-router";
import { useMemo } from "react";


export default function Layout({ segment }: { segment: string}) {
  let rootScreen = useMemo(() => {
    switch (segment) {
      default:
      case '(home)':
        return <Stack.Screen
          name="index"
          options={{
            title: 'Home'
          }}
        />;
      case '(settings)':
        return <Stack.Screen
          name="settings"
          options={{
            title: 'Settings'
          }}
        />;
    }
    }, [segment]
  );

  return (
    <Stack
      screenOptions={{ header: ({ options }) => <NavigationBar title={options.title} /> }}
    >
      {rootScreen}
      <Stack.Screen
        name="comments/[id]"
        options={{
          title: 'Comments'
        }}
      />
    </Stack>
  );
}