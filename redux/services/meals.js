import Axios from '../../Api';
import {
	mealsLoadedFulfilled,
	mealsLoadedPending,
	mealsLoadedRejected,
	addMealFulfilled,
	updateMealFulfilled,
	toggleAdditionState,
} from '../actions/meals.actions';

export const getMealsAction = () => async (dispatch) => {
	dispatch(mealsLoadedPending());
	await Axios.get('/meals.json')
		.then((response) => {
			const mealsRes = response?.data;

			const meals = Object.entries(mealsRes).map(([key, value]) => {
				return {
					...value,
					id: key,
				};
			});
			dispatch(mealsLoadedFulfilled(meals));
		})
		.catch((err) => {
			dispatch(
				mealsLoadedRejected('something went wrong please try again later')
			);
		});
};

export const addNewMeal = (meal) => async (dispatch, getState) => {
	const token = getState().auth.user.idToken;
	console.log('token', token);
	dispatch(mealsLoadedPending());
	await Axios.post(`/meals.json?auth=${token}`, meal)
		.then((res) => {
			dispatch(addMealFulfilled({ ...meal, id: res.data.name }));
			dispatch(toggleAdditionState(true));
		})
		.catch((err) => {
			const error = err.response.data.error;
			console.log('error', error);
			dispatch(mealsLoadedRejected(error));
		});
};

export const updateMeal = (meal) => async (dispatch, getState) => {
	dispatch(mealsLoadedPending());
	const token = getState().auth.user.idToken;
	await Axios.put(`/meals/${meal.id}.json?auth=${token}`, meal)
		.then((res) => {
			console.log(res.data);
			dispatch(updateMealFulfilled(meal));
		})
		.catch((err) => {
			dispatch(mealsLoadedRejected(err.response.data));
		});
};
