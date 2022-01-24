import {
	SET_FILTERS,
	TOGGLE_FAVORITE,
	MEALS_ERROR,
	MEALS_LOADED,
	MEALS_LOADING,
	MEAL_ADDED,
	MEAL_UPDATED,
	ADDITION_TOGGLE,
} from '../actions/meals.actions';
import {
	CATEGORIES_ERROR,
	CATEGORIES_LOADED,
	CATEGORIES_LOADING,
} from '../actions/categories.actions';

let initialState = {
	meals: [],
	filteredMeals: [],
	favMeals: [],
	mealsLoading: false,
	mealsErr: null,
	categories: [],
	categoriesLoading: false,
	categoriesErr: null,
	additionSuccess: false,
};

const mealReducer = (state = initialState, action) => {
	switch (action.type) {
		case CATEGORIES_LOADING:
			return {
				...state,
				categoriesLoading: true,
				categoriesErr: null,
			};
		case CATEGORIES_LOADED:
			return {
				...state,
				categories: action.payload,
				categoriesErr: null,
				categoriesLoading: false,
			};
		case CATEGORIES_ERROR:
			return {
				...state,
				categoriesLoading: false,
				categoriesErr: action.payload,
			};
		case MEALS_LOADED:
			return {
				...state,
				meals: action.payload,
				filteredMeals: action.payload,
				mealsErr: null,
				mealsLoading: false,
			};
		case MEALS_LOADING:
			return {
				...state,
				mealsLoading: true,
				mealsErr: null,
			};
		case MEALS_ERROR:
			return {
				...state,
				mealsLoading: false,
				mealsErr: action.payload,
			};
		case MEAL_ADDED:
			return {
				...state,
				mealsLoading: false,
				mealsErr: null,
				meals: [...state.meals, action.payload],
				filteredMeals: [...state.meals, action.payload],
				additionSuccess: true,
			};
		case MEAL_UPDATED: {
			let updatedMeal = action.payload;
			let mealsState = [...state.meals];
			let upMealIndex = mealsState.find((meal) => meal.id === updatedMeal.id);
			mealsState.splice(upMealIndex, 1, updatedMeal);

			return {
				...state,
				mealsLoading: false,
				mealsErr: null,
				meals: mealsState,
				filteredMeals: mealsState,
				additionSuccess: true,
			};
		}

		case ADDITION_TOGGLE:
			return {
				...state,
				additionSuccess: action.payload,
			};
		case TOGGLE_FAVORITE:
			let isFavorite = Boolean(
				state.favMeals.findIndex((meal) => meal.id === action.payload) > -1
			);
			let newFavs = [];
			let oldFavs = [...state.favMeals];
			if (isFavorite) {
				newFavs = oldFavs.filter((meal) => meal.id !== action.payload);
			} else {
				newFavs = [
					...oldFavs,
					{ ...state.meals.find((meal) => meal.id === action.payload) },
				];
			}
			return {
				...state,
				favMeals: newFavs,
			};

		case SET_FILTERS:
			const filters = action.payload;
			const filteredMeals = state.meals.filter((meal) => {
				if (filters.isGlutenFree && !meal.isGlutenFree) {
					return false;
				}
				if (filters.isLactoseFree && !meal.isLactoseFree) {
					return false;
				}
				if (filters.isVegan && !meal.isVegan) {
					return false;
				}
				return true;
			});
			return {
				...state,
				filteredMeals,
			};
		default:
			return state;
	}
};

export default mealReducer;
