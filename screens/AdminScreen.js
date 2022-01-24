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

const AdminScreen = (props) => {
	const { localId: userId } = useSelector((state) => {
		return state.auth.user;
	});
	const displayedMeals = useSelector((state) =>
		state.meals.filteredMeals.filter((meal) => meal.ownerId === userId)
	);
	console.log(
		'display: ',
		displayedMeals.length,
		displayedMeals[0]?.ownerId,
		userId
	);

	if (displayedMeals.length === 0) {
		return (
			<View style={styles.screen}>
				<Text style={{ marginBottom: 20 }}>
					No Meals created by this user yet
				</Text>
				<Button
					title="Go Back Home"
					color={colors.primaryColor}
					onPress={() => props.navigation.navigate('Categories')}
				/>
			</View>
		);
	}
	return (
		<MealList
			isAdmin
			navigation={props.navigation}
			displayedMeals={displayedMeals}
		/>
	);
};

export default AdminScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	mealContainer: {
		backgroundColor: colors.accentColor,
		marginVertical: 20,
		padding: 20,
	},
	mealTitle: {
		color: '#fff',
	},
});
