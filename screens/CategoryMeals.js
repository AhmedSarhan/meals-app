import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Platform,
	Button,
} from 'react-native';
import { useSelector } from 'react-redux';
import MealList from '../components/meals/MealList';
import colors from '../constants/colors';
import { CATEGORIES, MEALS } from './../data/dummy-data';

const fetchCat = (navData) => {
	// console.log('navData', navData);
	console.log(navData.route);
	let selectedCat = null;
	const categoryId = navData.route?.params?.categoryId;
	selectedCat = CATEGORIES.find((cat) => cat.id === categoryId);
	return { selectedCat };
};
const CategoryMeals = (props) => {
	// const { categoryId } = props.navigation.state.params;

	// const displayedMeals = useSelector((state) =>
	// 	state.meals.filteredMeals.filter((meal) =>
	// 		meal.categoryIds.includes(categoryId)
	// 	)
	// );
	const displayedMeals = [];
	// console.log(displayedMeals);
	return (
		<MealList navigation={props.navigation} displayedMeals={displayedMeals} />
	);
};

export const catMealsNavOptions = (navigationData) => {
	const { selectedCat } = fetchCat(navigationData);

	return {
		headerTitle: selectedCat?.title,
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? colors.primaryColor : '',
		},
		headerTintColor: Platform.OS === 'android' ? '#fff' : colors.accentColor,
	};
};
export default CategoryMeals;

const styles = StyleSheet.create({
	mealContainer: {
		backgroundColor: colors.accentColor,
		marginVertical: 20,
		padding: 20,
	},
	mealTitle: {
		color: '#fff',
	},
});
