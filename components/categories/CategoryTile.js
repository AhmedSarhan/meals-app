import React from 'react';
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableNativeFeedback,

} from 'react-native';
const CategoryTile = ({ category, onSelect }) => {
	let TouchableCmp = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}

	return (
		<View style={styles.categoryContainer}>
			<TouchableCmp style={styles.categoryContainer} onPress={onSelect}>
				<View style={{ ...styles.container, backgroundColor: category.color }}>
					<Text numberOfLines={2} style={styles.title}>
						{category?.title}
					</Text>
				</View>
			</TouchableCmp>
		</View>
	);
};

export default CategoryTile;

const styles = StyleSheet.create({
	categoryContainer: {
		margin: 15,
		flex: 1,
		height: 150,
		borderRadius: 10,
		overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible' ,
		elevation: 5,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 0.6,
		shadowOffset: { width: 2, height: -2 },
		shadowRadius: 25,
	},
	title: {
		color: '#000',
		fontSize: 22,
		fontFamily: 'open-sans-bold',
	},
});
