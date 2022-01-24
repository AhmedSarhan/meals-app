export const ACTION_TYPES = {
	LOGIN_PENDING: 'LOGIN_PENDING',
	LOGIN_FULFILLED: 'LOGIN_FULFILLED',
	LOGIN_REJECTED: 'LOGIN_REJECTED',
	REGISTER_PENDING: 'REGISTER_PENDING',
	REGISTER_FULFILLED: 'REGISTER_FULFILLED',
	REGISTER_REJECTED: 'REGISTER_REJECTED',
	LOG_OUT: 'LOG_OUT',
};

export const loginStart = () => {
	return {
		type: ACTION_TYPES.LOGIN_PENDING,
	};
};
export const loginSuccess = (authData) => {
	return {
		type: ACTION_TYPES.LOGIN_FULFILLED,
		payload: authData,
	};
};
export const loginFailure = (errors) => {
	return {
		type: ACTION_TYPES.LOGIN_REJECTED,
		payload: errors,
	};
};

export const registerStart = () => {
	return {
		type: ACTION_TYPES.REGISTER_PENDING,
	};
};
export const registerSuccess = (authData) => {
	return {
		type: ACTION_TYPES.REGISTER_FULFILLED,
		payload: authData,
	};
};
export const registerFailure = (errors) => {
	return {
		type: ACTION_TYPES.REGISTER_REJECTED,
		payload: errors,
	};
};

export const logOut = () => {
	return {
		type: ACTION_TYPES.LOG_OUT,
	};
};
