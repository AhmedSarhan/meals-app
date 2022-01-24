import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { MEALS } from '../data/dummy-data';
import MealList from './../components/meals/MealList';
const Favorites = (props) => {
	const favoriteMeals = useSelector((state) => state.meals.favMeals);

	if (favoriteMeals.length === 0) {
		return (
			<View style={styles.fallback}>
				<Text style={styles.fallbackText}>No Favorites yet</Text>
			</View>
		);
	}
	return (
		<MealList navigation={props.navigation} displayedMeals={favoriteMeals} />
	);
};

export default Favorites;

const styles = StyleSheet.create({
	fallback: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	fallbackText: {
		fontSize: 20,
		fontFamily: 'open-sans-bold',
	},
});
