import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMealsAction } from '../../redux/services/meals';
import MealItem from './MealItem';
const MealList = ({ displayedMeals, navigation, isAdmin }) => {
	const dispatch = useDispatch();
	const { mealsLoading } = useSelector((state) => state.meals);
	const selectMealHandler = (mealId) => {
		navigation.navigate({ routeName: 'MealDetail', params: { mealId } });
	};
	const loadMeals = () => {
		dispatch(getMealsAction());
	};
	useEffect(() => {
		console.log('mealsLoading', mealsLoading);
	}, [mealsLoading]);
	const renderMeal = (itemData) => {
		return (
			<MealItem
				meal={itemData?.item}
				isAdmin={isAdmin}
				onSelectMeal={() => selectMealHandler(itemData?.item?.id)}
			/>
		);
	};
	return (
		<View style={styles.screen}>
			<FlatList
				onRefresh={loadMeals}
				refreshing={mealsLoading}
				data={displayedMeals}
				renderItem={renderMeal}
				style={{ width: '95%' }}
			/>
		</View>
	);
};

export default MealList;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
});
