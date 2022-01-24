import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
	ImageBackground,
} from 'react-native';
import colors from '../../constants/colors';
import Button from '../Custom/Button';

const MealItem = ({ meal, onSelectMeal, isAdmin }) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}
	return (
		<View style={styles.mealContainer}>
			<TouchableCmp style={styles.touchable} onPress={onSelectMeal}>
				<View>
					<View style={[styles.mealRow, styles.mealHeader]}>
						<ImageBackground
							source={{ uri: meal?.imageUrl }}
							style={styles.mealImage}
						>
							<Text numberOfLines={1} style={styles.mealTitle}>
								{meal?.title}
							</Text>
						</ImageBackground>
					</View>
					<View style={[styles.mealRow, styles.mealDetail]}>
						<Text>{meal?.duration}m</Text>
						<Text>{meal?.affordability.toUpperCase()}</Text>
						<Text>{meal?.complexity.toUpperCase()}</Text>
					</View>
					<View style={[styles.mealRow, styles.mealDetail]}>
						<Button
							style={{
								backgroundColor:
									Platform.OS === 'android'
										? colors.primaryColor
										: 'transparent',
								paddingHorizontal: 30,
							}}
							textColor={
								Platform.OS === 'android' ? 'white' : colors.primaryColor
							}
							title="edit"
						/>
						<Button
							title="delete"
							textColor={Platform.OS === 'android' ? 'white' : 'red'}
							style={{
								backgroundColor:
									Platform.OS === 'android' ? 'red' : 'transparent',
								paddingHorizontal: 30,
							}}
						/>
					</View>
				</View>
			</TouchableCmp>
		</View>
	);
};

export default MealItem;

const styles = StyleSheet.create({
	mealContainer: {
		backgroundColor: '#f3f3f3',
		marginVertical: 20,
		height: 400,
		width: '100%',
		borderRadius: 10,
		overflow: 'hidden',
		// borderColor: 'black',
		// borderWidth: 1,
	},
	touchable: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
		overflow: 'hidden',
	},
	mealRow: {
		flexDirection: 'row',
	},
	mealHeader: {
		justifyContent: 'center',
		height: '80%',
		padding: 0,
		margin: 0,
	},
	mealImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
	},
	mealDetail: {
		paddingTop: 10,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	mealTitle: {
		fontFamily: 'open-sans-bold',
		color: '#fff',
		textAlign: 'center',
		fontSize: 22,
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingVertical: 5,
	},
});
