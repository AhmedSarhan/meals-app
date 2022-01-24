import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './Drawer.navigator';
import BottomTabsNavigator from './TabsNavigator';

const MainStack = createStackNavigator();

const MainNavigator = () => {
	return (
		<MainStack.Navigator>
			<MainStack.Screen
				name="Drawer"
				component={DrawerNavigator}
				options={{ headerShown: false }}
			/>
			<MainStack.Screen
				name="BottomTabsNavigator"
				component={BottomTabsNavigator}
				options={{ headerShown: false }}
			/>
		</MainStack.Navigator>
	);
};

export default MainNavigator;
