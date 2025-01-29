import NavigationBar from '@/components/NavigationBar';
import Index from '.';
import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Settings from './settings';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ header: ({ options }) => <NavigationBar title={options.title} /> }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size}/>
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size}/>
          )
        }}
      />
    </Tabs>
  );
}