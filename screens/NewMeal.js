import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Button,
	Alert,
	Platform,
	TouchableOpacity,
	TouchableNativeFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from './../components/navigation/HeaderButton';
import colors from '../constants/colors';
import { useForm } from 'react-hook-form';
import MainButton from './../components/Custom/Button';
import Input from '../components/Custom/Input';
import Switch from '../components/Custom/Switch';
import Select from '../components/Custom/Select';
import { addNewMeal } from '../redux/services/meals';

const affordabilityOptions = [
	{
		name: 'Affordable',
		id: 'affordable',
	},
	{
		name: 'Pricey',
		id: 'pricey',
	},
	{
		name: 'Luxurious',
		id: 'luxurious',
	},
];
const complexityOptions = [
	{
		name: 'Simple',
		id: 'simple',
	},
	{
		name: 'Challenging',
		id: 'challenging',
	},
	{
		name: 'Hard',
		id: 'hard',
	},
];

const NewMeal = ({ navigation }) => {
	const dispatch = useDispatch();
	const {
		categories: categoriesState,
		additionSuccess,
		meals,
		mealsErr,
	} = useSelector((state) => state.meals);
	const categories = categoriesState.map((cat) => {
		return { name: cat.title, id: cat.id };
	});

	const {
		register,
		reset,
		handleSubmit,
		control,
		errors,
		setValue,
		getValues,
	} = useForm({
		mode: 'onTouched',
		reValidateMode: 'onBlur',
		defaultValues: {
			title: '',
			duration: '',
			imageUrl: '',
			isGlutenFree: false,
			isLactoseFree: false,
			isVegan: false,
			steps: [''],
			ingredients: [''],
			affordability: [],
			complexity: [],
			categories: [],
		},
	});

	const [steps, setSteps] = useState(['']);
	const [ingredients, setIngredients] = useState(['']);
	const [stepsErr, setStepsErr] = useState(null);
	const [ingredientsErr, setIngredientsErr] = useState(null);

	const newIngredientInputHandler = () => {
		let ingredientIndex = steps.length - 1;
		if (getValues(`ingredients.${ingredientIndex}`) === '') {
			setIngredientsErr('Please Enter an ingredient here first');
			return;
		}
		if (ingredients.length === 10) {
			Alert.alert('Limit Reached', 'You can only add 10 ingredients for now', [
				{ text: 'Close' },
			]);
			return;
		}
		setIngredientsErr(null);
		setIngredients((prev) => {
			return [...prev, ''];
		});
	};
	const newStepsInputHandler = () => {
		let stepIndex = steps.length - 1;
		if (getValues(`steps.${stepIndex}`) === '') {
			setStepsErr('Please Enter an ingredient here first');
			return;
		}
		if (steps.length === 5) {
			Alert.alert('Limit Reached', 'You can only add 10 steps for now', [
				{ text: 'Close' },
			]);
			return;
		}
		setStepsErr(null);
		setSteps((prev) => {
			return [...prev, ''];
		});
	};

	useEffect(() => {
		if (!additionSuccess) return;

		navigation.push('Categories');
	}, [additionSuccess]);
	const saveMealHandler = useCallback((data) => {
		const {
			title,
			affordability,
			categories,
			complexity,
			duration,
			imageUrl,
			ingredients,
			isGlutenFree,
			isLactoseFree,
			isVegan,
			steps,
		} = data;
		const newMeal = {
			title,
			imageUrl,
			duration: parseFloat(duration),
			isGlutenFree,
			isLactoseFree,
			isVegan,
			categoryIds: categories,
			complexity: complexity[0],
			affordability: affordability[0],
			ingredients,
			steps,
		};
		// console.log('newMeal', newMeal);
		dispatch(addNewMeal(newMeal));
	}, []);

	// useEffect(() => {
	// 	props.navigation.setParams({ saveMeal: saveMealHandler });
	// }, [saveMealHandler]);

	useEffect(() => {
		if (!mealsErr) return;
		Alert.alert('An Error Occurred', mealsErr, [
			{
				text: 'Okay',
				style: 'cancel',
			},
		]);
	}, [mealsErr]);
	return (
		<KeyboardAwareScrollView
			extraHeight={10}
			extraScrollHeight={10}
			contentContainerStyle={styles.screen}
			enableOnAndroid
			nestedScrollEnabled
		>
			<View style={styles.container}>
				<Text>Add a new meal</Text>
				<Input
					containerStyles={styles.formGroup}
					label="Title"
					control={control}
					name="title"
					defaultValue={''}
					rules={{
						required: 'Please Enter a meal title First',
						maxLength: {
							value: 25,
							message: "Meal title can't be more than 25 characters",
						},
					}}
					validationError={errors.title}
				/>
				<Input
					containerStyles={styles.formGroup}
					label="Image Url"
					control={control}
					name="imageUrl"
					defaultValue={''}
					rules={{
						required: 'Please Enter an image url for your meal First',
					}}
					validationError={errors.imageUrl}
					keyboardType="url"
				/>
				<Input
					containerStyles={styles.formGroup}
					label="Duration"
					control={control}
					name="duration"
					maxLength={3}
					defaultValue={''}
					keyboardType="number-pad"
					rules={{
						required: 'Please Enter a duration for your meal First',
						max: {
							value: 100,
							message:
								'Your meal duration can not be longer than 100 minutes long',
						},
					}}
					validationError={errors.duration}
				/>
			</View>
			<View style={styles.switchesContainer}>
				<Switch
					control={control}
					defaultValue={false}
					name="isLactoseFree"
					containerStyles={styles.filterSwitch}
					label="Gluten Free"
				/>
				<Switch
					control={control}
					defaultValue={false}
					name="isGlutenFree"
					containerStyles={styles.filterSwitch}
					label="Lactose Free"
				/>
				<Switch
					control={control}
					defaultValue={false}
					name="isVegan"
					containerStyles={styles.filterSwitch}
					label="Vegan"
				/>
			</View>
			<View style={{ marginVertical: 10, width: '80%' }}>
				<Text>Ingredients</Text>
				{ingredients.map((ingredient, index) => (
					<React.Fragment key={index}>
						<Input
							inputStyles={{
								marginVertical: 5,
								borderColor:
									ingredientsErr && ingredient === '' ? 'red' : 'black',
								borderWidth: ingredientsErr && ingredient === '' ? 2 : 1,
							}}
							control={control}
							defaultValue={''}
							name={`ingredients.${index}`}
							rules={{
								required: 'Please Enter an ingredient first',
							}}
							validationError={
								errors?.ingredients && errors?.ingredients[index]
							}
						/>

						{ingredientsErr && ingredient === '' && (
							<Text style={styles.errText}>{ingredientsErr}</Text>
						)}
					</React.Fragment>
				))}
				<Button
					color={colors.primaryColor}
					title="New Ingredient"
					onPress={newIngredientInputHandler}
				/>
			</View>
			<View style={{ marginVertical: 10, width: '80%' }}>
				<Text>Steps</Text>
				{steps.map((step, index) => (
					<React.Fragment key={index}>
						<Input
							validationError={errors.steps && errors?.steps[index]}
							multiline
							numberOfLines={3}
							inputStyles={{
								marginVertical: 5,
								borderColor:
									stepsErr && getValues(`steps.${index}`) === ''
										? 'red'
										: 'black',
								borderWidth: 2,
							}}
							control={control}
							defaultValue={''}
							name={`steps.${index}`}
							rules={{
								required: 'Please Enter a step first',
							}}
						/>

						{stepsErr && step === '' && (
							<Text style={styles.errText}>{stepsErr}</Text>
						)}
					</React.Fragment>
				))}
				<Button
					color={colors.primaryColor}
					title="New Step"
					onPress={newStepsInputHandler}
				/>
			</View>
			<View style={styles.selectsContainer}>
				<Select
					label={'Meal Affordability'}
					control={control}
					name={'affordability'}
					selectedItems={getValues('affordability')}
					rules={{
						required: 'please select meal affordability first',
						validate: {
							notEmpty: (value) =>
								(value && value.length > 0) ||
								'please select meal affordability first',
						},
					}}
					options={affordabilityOptions}
					validationError={errors.affordability}
					setValue={setValue}
				/>
				<Select
					label={'Meal Complexity'}
					control={control}
					name={'complexity'}
					selectedItems={getValues('complexity')}
					rules={{
						required: 'please select meal complexity',
						validate: {
							notEmpty: (value) => {
								console.log('value', value);
								return (
									(value && value.length > 0) ||
									'please select meal complexity first'
								);
							},
						},
					}}
					options={complexityOptions}
					validationError={errors.complexity}
					setValue={setValue}
				/>
				<Select
					label={'Meal Categories'}
					control={control}
					isMulti
					setValue={setValue}
					selectedItems={getValues('categories')}
					name={'categories'}
					rules={{
						required: 'please select meal categories',
						validate: {
							notEmpty: (value) =>
								(value && value.length > 0) ||
								'please select meal categories first',
						},
					}}
					validationError={errors.categories}
					options={categories}
				/>
			</View>

			<MainButton
				title="New Meal"
				iconName="ios-add"
				iconColor="white"
				textColor="white"
				iconSize={20}
				style={styles.submitBtn}
				onPress={handleSubmit(saveMealHandler)}
			/>
		</KeyboardAwareScrollView>
	);
};

export default NewMeal;

// NewMeal.navigationOptions = (navData) => {
// 	return {
// 		headerRight: () => (
// 			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
// 				<Item
// 					onPress={navData.navigation.getParam('saveMeal')}
// 					iconName="ios-checkmark"
// 					iconSize={25}
// 					title="New Meal"
// 				/>
// 			</HeaderButtons>
// 		),
// 	};
// };
const styles = StyleSheet.create({
	screen: {
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#fff',
	},
	container: {
		width: '100%',
		alignItems: 'center',
		marginBottom: 20,
	},
	formGroup: {
		width: '80%',
	},

	switchesContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
	},
	selectsContainer: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	filterSwitch: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '30%',
	},
	errText: {
		marginVertical: 10,
		color: 'red',
	},
	submitBtn: {
		marginVertical: 20,
		backgroundColor: colors.accentColor,
		width: '80%',
	},
});
