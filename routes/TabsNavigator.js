import React from 'react';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MealsNavigator from './Meals.navigator';
import FavoritesStack from './Favorites.navigator';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const AndroidTabs = createMaterialBottomTabNavigator();
const IosTabs = createBottomTabNavigator();

let PlatformStack = Platform.OS === 'android' ? AndroidTabs : IosTabs;
const BottomTabsNavigator = () => {
	const androidNavOptions = {
		activeColor: colors.accentColor,
		shifting: true,
		barStyle: {
			backgroundColor: 'red',
		},
	};
	const IosNavOptions = {
		tabBarActiveTintColor: colors.accentColor,
		tabBarStyle: { backgroundColor: '#fff' },
	};
	return (
		<PlatformStack.Navigator
			screenOptions={
				Platform.OS === 'android' ? androidNavOptions : IosNavOptions
			}
			activeColor={colors.accentColor}
			barStyle={{ backgroundColor: '#fff' }}
		>
			<PlatformStack.Screen
				name="MealsStack"
				component={MealsNavigator}
				options={{
					tabBarLabel: 'Meals',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="ios-star" color={color} size={size} />
					),
					headerShown: false,
				}}
			/>
			<PlatformStack.Screen
				name="FavoritesStack"
				component={FavoritesStack}
				options={{
					tabBarLabel: 'Favorites',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="ios-restaurant" color={color} size={size} />
					),
					headerShown: false,
				}}
			/>
		</PlatformStack.Navigator>
	);
};

export default BottomTabsNavigator;
