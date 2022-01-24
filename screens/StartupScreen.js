import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { getData } from './../utils/localStorage';
import colors from '../constants/colors';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/actions/auth.actions';
import { setLogoutTime } from '../redux/services/auth';
export default function StartupScreen(props) {
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
