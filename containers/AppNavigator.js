import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	Platform,
	ActivityIndicator,
	View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './../routes/Drawer.navigator';
import AuthNavigator from '../routes/Auth.navigator';
import { getData } from './../utils/localStorage';
import colors from '../constants/colors';
import { loginSuccess } from './../redux/actions/auth.actions';
import { setLogoutTime } from '../redux/services/auth';
export default function AppNavigator(props) {
	const { user } = useSelector((state) => state.auth);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		tryLogin();
	}, []);
	const tryLogin = async () => {
		const userData = await getData('loginTok');
		if (!userData) {
			setIsLoading(false);
			return;
		}
		const { expiresIn, email, idToken, localId } = userData;
		let expiryDate = new Date(expiresIn);
		if (expiryDate <= new Date() || !idToken || !localId) {
			setIsLoading(false);
			return;
		}
		dispatch(loginSuccess(userData));
		dispatch(setLogoutTime(expiryDate - new Date()));
		setIsLoading(false);
	};

	if (isLoading) {
		return (
			<View style={styles.screen}>
				<ActivityIndicator color={colors.primaryColor} size="large" />
			</View>
		);
	}
	return (
		<NavigationContainer>
			{user ? <DrawerNavigator /> : <AuthNavigator />}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
