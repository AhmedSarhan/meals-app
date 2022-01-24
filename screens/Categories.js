import React, { useEffect, useState, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	TouchableOpacity,
	Platform,
	ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../constants/colors';
import CategoryTile from '../components/categories/CategoryTile';
import { toggleAdditionState } from '../redux/actions/meals.actions';
import { getCategoriesAction } from './../redux/services/categories';
import { getMealsAction } from './../redux/services/meals';

const Categories = (props) => {
	const { categories, categoriesLoading, categoriesErr } = useSelector(
		(state) => state.meals
	);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const dispatch = useDispatch();
	const firstRender = useRef(true);
	useEffect(() => {
		dispatch(toggleAdditionState(false));
	}, [dispatch]);
	const renderGridItem = (itemData) => {
		return (
			<CategoryTile
				category={itemData?.item}
				onSelect={() => {
					props.navigation.navigate('CategoryMeals', {
						categoryId: itemData?.item?.id,
					});
				}}
			/>
		);
	};

	useEffect(() => {
		if (categoriesLoading || firstRender.current) {
			firstRender.current = false;
			return;
		}
		setIsRefreshing(false);
	}, [categoriesLoading]);
	const loadCategories = () => {
		setIsRefreshing(true);
		dispatch(getCategoriesAction());
		dispatch(getMealsAction());
	};
	if (categoriesLoading && firstRender.current) {
		return (
			<View style={styles.screen}>
				<ActivityIndicator size="large" color={colors.primaryColor} />
			</View>
		);
	}
	return (
		<FlatList
			onRefresh={loadCategories}
			renderItem={renderGridItem}
			data={categories}
			numColumns={2}
			refreshing={isRefreshing}
		/>
	);
};

export default Categories;

export const catNavOptions = {
	headerTitle: 'Meal Categories',
	// headerStyle: {
	// 	backgroundColor: Platform.OS === 'android' ? colors.primaryColor : '',
	// },
	// headerTintColor: Platform.OS === 'android' ? '#fff' : colors.accentColor,
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		marginBottom: 10,
	},
});
