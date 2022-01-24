import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { getData } from './../utils/localStorage';
import colors from '../constants/colors';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions/auth.actions';
import { setLogoutTime } from '../redux/services/auth';
export default function StartupScreen(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		tryLogin();
	}, []);
	const tryLogin = async () => {
		const userData = await getData('loginTok');
		if (!userData) {
			props.navigation.navigate('Auth');
			return;
		}
		console.log(userData);
		const { expiresIn, email, idToken, localId } = userData;
		let expiryDate = new Date(expiresIn);
		if (expiryDate <= new Date() || !idToken || !localId) {
			props.navigation.navigate('Auth');
			return;
		}
		console.log(
			expiryDate - new Date(),
			expiryDate.getTime() - new Date().getTime()
		);
		dispatch(loginSuccess(userData));
		dispatch(setLogoutTime(expiryDate - new Date()));

		props.navigation.navigate('Application');
	};
	return (
		<View style={styles.screen}>
			<ActivityIndicator color={colors.primaryColor} size="large" />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
