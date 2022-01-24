import { DrawerItemList } from '@react-navigation/drawer';
import colors from '../constants/colors';
import Filters from '../screens/Filters';
import AdminNavigator from './Admin.navigator';
import BottomTabsNavigator from './TabsNavigator';
import { SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

const DrawerNavigator = () => {
	const dispatch = useDispatch();
	return (
		<DrawerNav.Navigator
			drawerContent={(props) => {
				return (
					<View style={{ flex: 1, paddingVertical: 20 }}>
						<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
							<DrawerItemList {...props} />
							<View style={{ width: '80%', alignSelf: 'center' }}>
								<Button
									title="logout"
									color="red"
									onPress={() => dispatch(logoutAction())}
								/>
							</View>
						</SafeAreaView>
					</View>
				);
			}}
			screenOptions={{
				drawerActiveTintColor: colors.accentColor,
				drawerLabelStyle: {
					textAlign: 'center',
					fontSize: 14,
					fontFamily: 'open-sans-bold',
				},
			}}
		>
			<DrawerNav.Screen
				options={{ headerShown: false }}
				name="Home"
				component={BottomTabsNavigator}
			/>
			<DrawerNav.Screen name="Filters" component={Filters} />
			<DrawerNav.Screen
				options={{ headerShown: false }}
				name="Admin"
				component={AdminNavigator}
			/>
		</DrawerNav.Navigator>
	);
};

export default DrawerNavigator;
