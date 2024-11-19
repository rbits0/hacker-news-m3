import NavigationBar from '@/components/NavigationBar';
import Index from '.';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '@/components/TabBar';

const Tab = createBottomTabNavigator();


export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{ header: ({ options }) => <NavigationBar title={options.title} /> }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="index" options={{ title: 'Home' }} component={Index} />
    </Tab.Navigator>
  );
}