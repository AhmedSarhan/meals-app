import React from 'react';
import {
	Platform,
	Text,
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const MainButton = ({
	onPress,
	style,
	iconName,
	iconSize,
	iconColor,
	textColor,
	title,
	loading,
}) => {
	let TouchableCmp = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}
	return (
		<TouchableCmp onPress={onPress}>
			<View style={{ ...styles.button, ...style }}>
				{iconName && (
					<Ionicons name={iconName} size={iconSize} color={iconColor} />
				)}
				<Text style={{ color: textColor }}>{title}</Text>
				{loading && (
					<View>
						<ActivityIndicator
							style={styles.loader}
							color={textColor}
							size="small"
						/>
					</View>
				)}
			</View>
		</TouchableCmp>
	);
};

export default MainButton;

export const styles = StyleSheet.create({
	button: {
		backgroundColor: '#01A3A4',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	loader: {
		marginHorizontal: 5,
	},
});
