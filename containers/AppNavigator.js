import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './../routes/Drawer.navigator';
import AuthNavigator from '../routes/Auth.navigator';
export default function AppNavigator(props) {
	const { user } = useSelector((state) => state.auth);
	console.log('user', user);
	return (
		<NavigationContainer>
			{user ? <DrawerNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({});
