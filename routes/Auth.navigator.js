import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/Auth';
import { defaultNavOptions } from './navigationOptions';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
	return (
		<AuthStack.Navigator
			screenOptions={{ ...defaultNavOptions, headerLeft: () => null }}
		>
			<AuthStack.Screen name="Login" component={AuthScreen} />
		</AuthStack.Navigator>
	);
};

export default AuthNavigator;
