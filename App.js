import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './redux';
import { getCategoriesAction } from './redux/services/categories';
import { getMealsAction } from './redux/services/meals';
import AppNavigator from './containers/AppNavigator';
enableScreens();

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);
	useEffect(() => {
		store.dispatch(getMealsAction());
		store.dispatch(getCategoriesAction());
	}, []);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={() => console.log('loading failed')}
			/>
		);
	}

	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {},
});
