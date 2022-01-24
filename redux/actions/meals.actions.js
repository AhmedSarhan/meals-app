export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';
export const MEALS_LOADING = 'MEALS_LOADING';
export const MEALS_LOADED = 'MEALS_LOADED';
export const MEALS_ERROR = 'MEALS_ERROR';
export const MEAL_ADDED = 'MEAL_ADDED';
export const MEAL_UPDATED = 'MEAL_UPDATED';
export const ADDITION_TOGGLE = 'ADDITION_TOGGLE';
export const setFilters = (filters) => {
	return {
		type: SET_FILTERS,
		payload: filters,
	};
};

export const toggleFavorite = (id) => {
	return {
		type: TOGGLE_FAVORITE,
		payload: id,
	};
};

export const mealsLoadedFulfilled = (meals) => {
	return {
		type: MEALS_LOADED,
		payload: meals,
	};
};
export const mealsLoadedPending = () => {
	return {
		type: MEALS_LOADING,
	};
};
export const mealsLoadedRejected = (error) => {
	return {
		type: MEALS_ERROR,
		payload: error,
	};
};

export const addMealFulfilled = (meal) => {
	return {
		type: MEAL_ADDED,
		payload: meal,
	};
};

export const updateMealFulfilled = (meal) => {
	return {
		type: MEAL_UPDATED,
		payload: meal,
	};
};

export const toggleAdditionState = (state) => {
	return {
		type: ADDITION_TOGGLE,
		payload: state,
	};
};
