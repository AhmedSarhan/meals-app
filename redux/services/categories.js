import Axios from '../../Api';
import {
	categoriesLoadedFulfilled,
	categoriesLoadedPending,
	categoriesLoadedRejected,
} from '../actions/categories.actions';

export const getCategoriesAction = () => async (dispatch) => {
	dispatch(categoriesLoadedPending());
	await Axios.get('/categories.json')
		.then((response) => {
			const apiRes = response?.data;
			const categories = Object.values(apiRes);
			dispatch(categoriesLoadedFulfilled(categories));
		})
		.catch((err) => {
			console.log('err', err);
			categoriesLoadedRejected(err?.response?.data);
		});
};
