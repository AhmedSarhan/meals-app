import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from '../screens/AdminScreen';
import navigationOptions from './navigationOptions';

const AdminStack = createStackNavigator();

const AdminNavigator = () => {
	return (
		<AdminStack.Navigator screenOptions={navigationOptions}>
			<AdminStack.Screen name="My Meals" component={AdminScreen} />
		</AdminStack.Navigator>
	);
};

export default AdminNavigator;
