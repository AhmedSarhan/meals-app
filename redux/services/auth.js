import axios from 'axios';
import { storeData, deleteData } from '../../utils/localStorage';
import { logOut } from '../actions/auth.actions';
import {
	loginFailure,
	loginStart,
	loginSuccess,
	registerFailure,
	registerStart,
	registerSuccess,
} from '../actions/auth.actions';
const API_KEY = 'AIzaSyDSGsfJ_1W2zKxGZqKZxoDEzdyCMZahHbk';
let timer;
export const registerAction = ({ email, password }) => async (dispatch) => {
	dispatch(registerStart());
	try {
		const response = await axios.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}
`,
			{
				email,
				password,
				returnSecureToken: true,
			}
		);
		dispatch(registerSuccess(response.data));
		storeData('loginTok', {
			...response.data,
			expiresIn: new Date(
				new Date().getTime() + parseInt(response.data.expiresIn) * 1000
			).toISOString(),
		});
		dispatch(setLogoutTime(parseInt(response.data.expiresIn) * 1000));
	} catch (error) {
		const errors = error.response.data.error.errors;
		dispatch(registerFailure(errors));
	}
};

export const loginAction = ({ email, password }) => async (dispatch) => {
	dispatch(loginStart());
	try {
		const response = await axios.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
			{
				email,
				password,
				returnSecureToken: true,
			}
		);
		dispatch(loginSuccess(response.data));
		storeData('loginTok', {
			...response.data,
			expiresIn: new Date(
				new Date().getTime() + parseInt(response.data.expiresIn) * 1000
			).toISOString(),
		});
		dispatch(setLogoutTime(parseInt(response.data.expiresIn) * 1000));
	} catch (error) {
		const errors = error.response.data.error.errors;
		dispatch(loginFailure(errors));
	}
};

export const logoutAction = () => async (dispatch) => {
	await deleteData('loginTok').then((res) => {
		dispatch(logOut());
		clearTimer();
	});
};

export const setLogoutTime = (time) => (dispatch) => {
	timer = setTimeout(() => {
		dispatch(logoutAction());
	}, time);
};

const clearTimer = () => {
	clearTimeout(timer);
};
