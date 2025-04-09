// From https://github.com/expo/router/discussions/380#discussioncomment-11428125

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