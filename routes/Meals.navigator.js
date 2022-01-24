import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Categories, { catNavOptions } from './../screens/Categories';
import MealData, { mealDataNavOptions } from './../screens/MealData';
import NewMeal from './../screens/NewMeal';
import CategoryMeals, { catMealsNavOptions } from './../screens/CategoryMeals';
import colors from '../constants/colors';
import navigationOptions from './navigationOptions';

const MealsStackNavigator = createStackNavigator();
const MealsNavigator = () => {
	return (
		<MealsStackNavigator.Navigator screenOptions={navigationOptions}>
			<MealsStackNavigator.Screen
				name="Categories"
				component={Categories}
				options={catNavOptions}
			/>
			<MealsStackNavigator.Screen
				name="CategoryMeals"
				component={CategoryMeals}
				options={catMealsNavOptions}
			/>
			<MealsStackNavigator.Screen
				name="MealDetail"
				component={MealData}
				options={mealDataNavOptions}
			/>
			<MealsStackNavigator.Screen name="NewMeal" component={NewMeal} />
		</MealsStackNavigator.Navigator>
	);
};

export default MealsNavigator;
