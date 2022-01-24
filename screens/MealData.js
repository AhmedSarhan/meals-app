import React, { useEffect, useCallback } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ImageBackground,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/actions/meals.actions';
import CustomHeaderButton from './../components/navigation/HeaderButton';

const MealData = ({ navigation }) => {
	const mealId = navigation.getParam('mealId');
	const dispatch = useDispatch();
	const meal = useSelector((state) =>
		state.meals.meals.find((meal) => meal.id === mealId)
	);
	const isMealFav = useSelector((state) =>
		state.meals.favMeals.some((meal) => meal.id === mealId)
	);

	const toggleFavoriteFunction = useCallback(() => {
		dispatch(toggleFavorite(mealId));
	}, [dispatch, mealId]);

	useEffect(() => {
		navigation.setParams({
			mealTitle: meal?.title,
			toggleFav: toggleFavoriteFunction,
			isMealFav,
		});
	}, [meal, isMealFav]);

	return (
		<View style={styles.screen}>
			<View style={[styles.mealRow, styles.mealHeader]}>
				<ImageBackground
					source={{ uri: meal?.imageUrl }}
					style={styles.mealImg}
				>
					<Text numberOfLines={1} style={styles.mealTitle}>
						{meal?.title}
					</Text>
				</ImageBackground>
			</View>
			<View style={[styles.mealRow, styles.mealDetail]}>
				<Text>{meal?.duration}m</Text>
				<Text>{meal?.affordability.toUpperCase()}</Text>
				<Text>{meal?.complexity.toUpperCase()}</Text>
			</View>
			<ScrollView>
				<Text style={styles.title}>Ingredients</Text>
				{meal.ingredients.map((ingredient) => (
					<View key={ingredient} style={styles.listItem}>
						<Text>{ingredient}</Text>
					</View>
				))}
				<Text style={styles.title}>Steps</Text>
				{meal.steps.map((step) => (
					<View key={step} style={styles.listItem}>
						<Text>{step}</Text>
					</View>
				))}
				<View></View>
			</ScrollView>
		</View>
	);
};

export default MealData;

export const mealDataNavOptions = (navigationData) => {
	const {
		isMealFav,
		mealTitle,
		toggleFav,
	} = navigationData.navigation.state.params;
	return {
		headerTitle: mealTitle,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Favorite"
					iconName={isMealFav ? 'ios-star' : 'ios-star-outline'}
					onPress={toggleFav}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	mealHeader: {
		justifyContent: 'center',
		height: 200,
		padding: 0,
		margin: 0,
	},
	mealRow: {
		flexDirection: 'row',
		width: '100%',
	},
	mealImg: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
	},
	title: {
		fontFamily: 'open-sans-bold',
		textAlign: 'center',
	},
	mealTitle: {
		fontFamily: 'open-sans-bold',
		color: '#fff',
		textAlign: 'center',
		fontSize: 22,
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingVertical: 5,
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10,
	},
	mealDetail: {
		padding: 15,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
});
