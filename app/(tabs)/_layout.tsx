import NavigationBar from '@/components/NavigationBar';
import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ header: ({ options }) => <NavigationBar title={options.title} /> }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size}/>
          ),
          header: () => <></>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size}/>
          ),
        }}
      />
    </Tabs>
  );
}