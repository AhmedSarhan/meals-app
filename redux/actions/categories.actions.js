export const CATEGORIES_LOADING = 'CATEGORIES_LOADING';
export const CATEGORIES_LOADED = 'CATEGORIES_LOADED';
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR';

export const categoriesLoadedFulfilled = (categories) => {
	return {
		type: CATEGORIES_LOADED,
		payload: categories,
	};
};

export const categoriesLoadedPending = () => {
	return {
		type: CATEGORIES_LOADING,
	};
};

export const categoriesLoadedRejected = () => {
	return {
		type: CATEGORIES_LOADING,
	};
};
