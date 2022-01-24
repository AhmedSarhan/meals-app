import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
	createDrawerNavigator,
	DrawerItems,
	DrawerNavigatorItems,
} from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import Categories from '../screens/Categories';
import CategoryMeals from '../screens/CategoryMeals';
import MealData from '../screens/MealData';
import colors from '../constants/colors';
import Favorites from '../screens/Favorites';
import { Ionicons } from '@expo/vector-icons';
import Filters from '../screens/Filters';
import CustomHeaderButton from '../components/navigation/HeaderButton';
import NewMeal from '../screens/NewMeal';
import AuthScreen from '../screens/Auth';
import AdminScreen from '../screens/AdminScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/services/auth';
const navigationOptions = (navData) => ({
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? colors.primaryColor : '',
	},
	headerTintColor: Platform.OS === 'android' ? '#fff' : colors.accentColor,
	headerLeft: () => {
		return (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Menu"
					onPress={() => navData.navigation.toggleDrawer()}
					iconName="ios-menu"
					iconSize={25}
					color="white"
				/>
			</HeaderButtons>
		);
	},
});

const defaultStackNavOptions = {
	defaultNavigationOptions: navigationOptions,
	mode: 'modal',
};
const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: Categories,
			navigationOptions: (navData) => ({
				headerTitle: 'Meal Categories Page',
				headerRight: () => (
					<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
						<Item
							title="New Meal"
							iconName="ios-add"
							iconSize={25}
							color="white"
							onPress={() => navData.navigation.push('NewMeal')}
						/>
					</HeaderButtons>
				),
			}),
		},
		CategoryMeals: {
			screen: CategoryMeals,
		},
		MealDetail: {
			screen: MealData,
		},
		NewMeal: {
			screen: NewMeal,
			navigationOptions: {
				headerTitle: 'Add a New Meal',
			},
		},
	},
	defaultStackNavOptions
);

const FavoritesNavigator = createStackNavigator(
	{
		Favorites,
		MealDetail: MealData,
	},
	defaultStackNavOptions
);

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		// navigationOptions: {
		// 	tabBarIcon: (tabInfo) => {
		// 		return <Ionicons icon="ios-restaurant" size={25} color={'blue'} />;
		// 	},
		// },
	},
	Favorites: {
		screen: FavoritesNavigator,
		// navigationOptions: {
		// 	tabBarIcon: (tabInfo) => {
		// 		return <Ionicons icon="ios-star" size={25} color={'blue'} />;
		// 	},
		// },
	},
};
const tabScreenNavOptions = {
	tabBarOptions: {
		activeTintColor: colors.accentColor,
		showIcon: true,
	},
	defaultNavigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused, horizontal, tintColor }) => {
			const { routeName } = navigation.state;
			let IconComponent = Ionicons;
			let iconName;
			if (routeName === 'Favorites') {
				iconName = 'ios-star';
			} else {
				iconName = 'ios-restaurant';
			}

			// You can return any component that you like here!
			return <IconComponent name={iconName} size={25} color={tintColor} />;
		},
	}),
};
const MealsFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: colors.accentColor,
				shifting: true,
				barStyle: {
					backgroundColor: '#fff',
				},
				defaultNavigationOptions: tabScreenNavOptions.defaultNavigationOptions,
		  })
		: createBottomTabNavigator(tabScreenConfig, tabScreenNavOptions);

const FiltersNavigator = createStackNavigator(
	{
		Filters,
	},
	defaultStackNavOptions
);

const AdminNavigator = createStackNavigator(
	{
		Admin: {
			screen: AdminScreen,
		},
	},
	defaultStackNavOptions
);
const DrawerNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealsFavTabNavigator,
			navigationOptions: {
				drawerLabel: 'Meals',
			},
		},
		Filters: {
			screen: FiltersNavigator,
			navigationOptions: {
				headerTitle: 'Filter Meals',
			},
		},
		Admin: {
			screen: AdminNavigator,
			navigationOptions: {
				headerTitle: 'User Meals Dashboard',
			},
		},
	},
	{
		contentOptions: {
			activeTintColor: colors.accentColor,
			labelStyle: {
				textAlign: 'center',
				fontSize: 18,
				fontFamily: 'open-sans-bold',
			},
		},
		contentComponent: (props) => {
			const dispatch = useDispatch();
			return (
				<View style={{ flex: 1, paddingVertical: 20 }}>
					<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
						<DrawerNavigatorItems {...props} />
						<View style={{ width: '80%', paddingHorizontal: 10 }}>
							<Button
								title="logout"
								color="red"
								onPress={() => dispatch(logoutAction())}
							/>
						</View>
					</SafeAreaView>
				</View>
			);
		},
	}
);
const AuthNavigator = createStackNavigator(
	{
		Auth: {
			screen: AuthScreen,
			navigationOptions: {
				headerTitle: 'Login',
			},
		},
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === 'android' ? colors.primaryColor : '',
			},
			headerTintColor: Platform.OS === 'android' ? '#fff' : colors.accentColor,
			headerLeft: () => null,
		},
		mode: 'modal',
	}
);
const MainNavigator = createSwitchNavigator({
	Start: StartupScreen,
	Auth: AuthNavigator,
	Application: DrawerNavigator,
});

export default createAppContainer(MainNavigator);
