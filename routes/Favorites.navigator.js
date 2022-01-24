import {} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Favorites from './../screens/Favorites';
import MealData, { mealDataNavOptions } from './../screens/MealData';
import navigationOptions from './navigationOptions';

const FavoritesStack = createStackNavigator();

const FavoritesNavigator = () => {
	return (
		<FavoritesStack.Navigator screenOptions={navigationOptions}>
			<FavoritesStack.Screen name="Favorites" component={Favorites} />
			<FavoritesStack.Screen
				name="MealDetail"
				component={MealData}
				options={mealDataNavOptions}
			/>
		</FavoritesStack.Navigator>
	);
};

export default FavoritesNavigator;
