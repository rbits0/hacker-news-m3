import NavigationBar from '@/components/NavigationBar';
import Index from '.';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '@/components/TabBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{ header: ({ options }) => <NavigationBar title={options.title} /> }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size}/>
          )
        }}
        component={Index}
      />
      <Tab.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size}/>
          )
        }}
        component={Index}
      />
    </Tab.Navigator>
  );
}