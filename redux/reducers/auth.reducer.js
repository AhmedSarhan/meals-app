import { ACTION_TYPES } from './../actions/auth.actions';
import { getData } from './../../utils/localStorage';

const getUser = async () => {
	const user = await getData('loginTok');
	return user;
};
const initialState = {
	user: null,
	userLoading: false,
	userErrors: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.REGISTER_PENDING:
			return {
				...state,
				userLoading: true,
				userErrors: null,
			};
		case ACTION_TYPES.REGISTER_FULFILLED:
			return {
				...state,
				userLoading: false,
				user: action.payload,
			};
		case ACTION_TYPES.REGISTER_REJECTED:
			return {
				...state,
				userLoading: false,
				userErrors: action.payload,
			};
		case ACTION_TYPES.LOGIN_PENDING:
			return {
				...state,
				userLoading: true,
				userErrors: null,
			};
		case ACTION_TYPES.LOGIN_FULFILLED:
			return {
				...state,
				userLoading: false,
				user: action.payload,
			};
		case ACTION_TYPES.LOGIN_REJECTED:
			return {
				...state,
				userLoading: false,
				userErrors: action.payload,
			};
		case ACTION_TYPES.LOG_OUT:
			return { ...initialState };
		default:
			return state;
	}
};

export default authReducer;
