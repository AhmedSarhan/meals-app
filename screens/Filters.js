import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../constants/colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from './../components/navigation/HeaderButton';
import { setFilters } from '../redux/actions/meals.actions';

export const FilterSwitch = ({ label, value, setNewValue, customStyles }) => {
	return (
		<View style={{ ...styles.filterContainer, ...customStyles }}>
			<Text>{label}</Text>
			<Switch
				trackColor={{ true: colors.primaryColor, false: '' }}
				thumbColor={Platform?.OS === 'android' ? colors.primaryColor : ''}
				value={value}
				onValueChange={(newVal) => setNewValue(newVal)}
			/>
		</View>
	);
};

const Filters = ({ navigation }) => {
	const dispatch = useDispatch();
	const [isGlutenFree, setIsGlutenFree] = useState(false);
	const [isVegan, setIsVegan] = useState(false);
	const [isLactoseFree, setIsLactoseFree] = useState(false);

	const saveFilters = useCallback(() => {
		const appliedFilters = {
			isGlutenFree,
			isLactoseFree,
			isVegan,
		};
		dispatch(setFilters(appliedFilters));
		navigation.push('Categories');
	}, [isGlutenFree, isLactoseFree, isVegan]);

	useEffect(() => {
		navigation.setParams({ saveFilters: saveFilters });
	}, [saveFilters]);
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			<FilterSwitch
				label="Gluten Free"
				value={isGlutenFree}
				setNewValue={setIsGlutenFree}
			/>
			<FilterSwitch label="Vegan" value={isVegan} setNewValue={setIsVegan} />
			<FilterSwitch
				label="Lactose Free"
				value={isLactoseFree}
				setNewValue={setIsLactoseFree}
			/>
		</View>
	);
};

export default Filters;

Filters.navigationOptions = (navData) => {
	return {
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Save"
					iconName="ios-save"
					onPress={navData.navigation.getParam('saveFilters')}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		margin: 20,
		textAlign: 'center',
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 10,
	},
});
