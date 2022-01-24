import { createStore, combineReducers, applyMiddleware } from 'redux';
import mealReducer from './reducers/meals.reducer';
import authReducer from './reducers/auth.reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
	meals: mealReducer,
	auth: authReducer,
});
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
