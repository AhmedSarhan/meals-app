import React, { useLayoutEffect } from 'react';
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

const CategoryMeals = (props) => {
	const categoryId = props.route?.params?.categoryId;
	const selectedCat = useSelector((state) =>
		state.meals.categories.find((cat) => cat.id === categoryId)
	);

	const displayedMeals = useSelector((state) =>
		state.meals.filteredMeals.filter((meal) =>
			meal.categoryIds.includes(categoryId)
		)
	);
	useLayoutEffect(() => {
		props.navigation.setOptions({
			headerTitle: selectedCat?.title,
		});
	}, []);
	return (
		<MealList navigation={props.navigation} displayedMeals={displayedMeals} />
	);
};

export const catMealsNavOptions = (navigationData) => {};
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
