import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import colors from '../constants/colors';
import Filters from '../screens/Filters';
import AdminNavigator from './Admin.navigator';
import BottomTabsNavigator from './TabsNavigator';
import { SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const DrawerNav = createDrawerNavigator();
const Stack = createStackNavigator();

function CustomDrawerContent(props) {
	const dispatch = useDispatch();
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItem
				label="Home"
				onPress={() => props.navigation.navigate('Home')}
			/>
			<DrawerItem
				label="Filters"
				onPress={() => props.navigation.navigate('Filters')}
			/>
			<DrawerItem
				label="Admin"
				onPress={() => props.navigation.navigate('Admin')}
			/>
			<View style={{ width: '80%', alignSelf: 'center' }}>
				<Button
					title="logout"
					color="red"
					onPress={() => dispatch(logoutAction())}
				/>
			</View>
		</DrawerContentScrollView>
	);
}

// function getHeaderTitle(route) {
// 	return getFocusedRouteNameFromRoute(route) ?? 'Home';
// }

const StackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={BottomTabsNavigator} />
			<Stack.Screen name="Filters" component={Filters} />
			<Stack.Screen
				options={{ headerShown: false }}
				name="Admin"
				component={AdminNavigator}
			/>
		</Stack.Navigator>
	);
};

const DrawerNavigator = () => {
	return (
		<DrawerNav.Navigator
			initialRouteName="Home"
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				drawerActiveTintColor: colors.accentColor,
				drawerLabelStyle: {
					textAlign: 'center',
					fontSize: 14,
					fontFamily: 'open-sans-bold',
				},
			}}
		>
			<DrawerNav.Screen name="Stack" component={StackNavigator} />
		</DrawerNav.Navigator>
	);
};

// const DrawerNavigator = () => {
//

// 	return (
// 		<DrawerNav.Navigator
// 			drawerContent={(props) => {
// 				return (
// 					<View style={{ flex: 1, paddingVertical: 20 }}>
// 						<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
// 							<DrawerItemList {...props} />
// 							<View style={{ width: '80%', alignSelf: 'center' }}>
// 								<Button
// 									title="logout"
// 									color="red"
// 									onPress={() => dispatch(logoutAction())}
// 								/>
// 							</View>
// 						</SafeAreaView>
// 					</View>
// 				);
// 			}}
// 			screenOptions={{
// 				drawerActiveTintColor: colors.accentColor,
// 				drawerLabelStyle: {
// 					textAlign: 'center',
// 					fontSize: 14,
// 					fontFamily: 'open-sans-bold',
// 				},
// 			}}
// 		>
// 			<DrawerNav.Screen
// 				options={{ headerShown: false }}
// 				name="Home"
// 				component={BottomTabsNavigator}
// 			/>
// 			<DrawerNav.Screen name="Filters" component={Filters} />
// 			<DrawerNav.Screen
// 				options={{ headerShown: false }}
// 				name="Admin"
// 				component={AdminNavigator}
// 			/>
// 		</DrawerNav.Navigator>
// 	);
// };

export default DrawerNavigator;
