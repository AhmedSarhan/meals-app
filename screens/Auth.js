import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../components/Custom/Input';
import Button from '../components/Custom/Button';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';
import { emailPattern } from '../utils/regExHelpers';
import Card from './../components/Custom/Card';
import { loginAction, registerAction } from './../redux/services/auth';
import { useDispatch, useSelector } from 'react-redux';

const Auth = ({ navigation }) => {
	const { user, userErrors, userLoading } = useSelector((state) => state.auth);
	const [isRegister, setIsRegister] = useState(true);
	const {
		register,
		reset,
		handleSubmit,
		control,
		errors,
		setValue,
		getValues,
	} = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
		defaultValues: {
			// name: '',
			email: '',
			password: '',
		},
	});
	const dispatch = useDispatch();
	const registerHandler = (data) => {
		if (isRegister) {
			dispatch(registerAction(data));
			return;
		}
		dispatch(loginAction(data));
	};

	useEffect(() => {
		if (!user) return;
		console.log('will navigate now');
		navigation.navigate('Application');
	}, [user]);
	if (userErrors) {
		userErrors.map((error) => {
			Alert.alert(error.reason, error.message, [
				{
					text: 'Okay',
					style: 'cancel',
				},
			]);
		});
	}
	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={50}
			// behavior="padding"
			style={styles.screen}
		>
			<LinearGradient style={styles.gradient} colors={['#ffedff', '#ffe3ff']}>
				<Card style={styles.authContainer}>
					<ScrollView>
						{/* <Input
						label="Name"
						inputStyles={styles.input}
						control={control}
						name="name"
						rules={{
							required: 'Please Enter your name First',
							maxLength: {
								value: 25,
								message: "User Name can't be longer than 25 characters",
							},
						}}
						validationError={errors.name}
					/> */}
						<Input
							label="Email"
							control={control}
							inputStyles={styles.input}
							name="email"
							keyboard-type="email-address"
							rules={{
								required: 'Please Enter your email First',
								pattern: {
									value: emailPattern,
									message: 'Please Enter a valid email',
								},
							}}
							validationError={errors.email}
						/>
						<Input
							label="Password"
							control={control}
							name="password"
							inputStyles={styles.input}
							secureTextEntry
							rules={{
								required: 'Please Enter your password First',
								minLength: {
									value: 5,
									message: "passwords shouldn't be shorter than 5 characters",
								},
							}}
							validationError={errors.password}
						/>
						<Button
							style={{
								...styles.button,
								backgroundColor:
									Platform.OS === 'ios' ? 'transparent' : colors.primaryColor,
							}}
							title={isRegister ? 'Sign Up' : 'login'}
							loading={userLoading}
							textColor={Platform.OS === 'ios' ? colors.primaryColor : '#ffff'}
							onPress={handleSubmit(registerHandler)}
						/>
						<Button
							style={{
								...styles.button,
								backgroundColor:
									Platform.OS === 'ios' ? 'transparent' : colors.accentColor,
							}}
							title={
								isRegister
									? 'Already Have an account! Login!'
									: 'Create a new Account!'
							}
							textColor={Platform.OS === 'ios' ? colors.accentColor : '#ffff'}
							onPress={() => setIsRegister((prev) => !prev)}
						/>
					</ScrollView>
				</Card>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};

export default Auth;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		// height: '50%',
		maxHeight: 400,
	},
	button: {
		marginVertical: 10,
	},
	gradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		borderWidth: 0,
		borderBottomWidth: 2,
		borderRadius: 0,
		shadowOpacity: 0,
		elevation: 0,
	},
});
