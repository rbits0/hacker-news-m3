import NavigationBar from "@/components/NavigationBar";
import { Stack } from "expo-router";


export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{ header: ({ options }) => <NavigationBar title={options.title} /> }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
    </Stack>
  )
}