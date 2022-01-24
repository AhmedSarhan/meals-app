import React from 'react';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';
import colors from '../../constants/colors';
import { Controller } from 'react-hook-form';

const CustomSwitch = ({
	label,
	containerStyles,
	labelStyles,
	control,
	defaultValue,
	name,
	rules,
}) => {
	return (
		<View style={{ ...styles.switchContainer, ...containerStyles }}>
			<Text style={{ ...labelStyles }}>{label}</Text>
			<Controller
				control={control}
				defaultValue={defaultValue}
				render={({ onChange, value }) => (
					<Switch
						trackColor={{ true: colors.primaryColor, false: '' }}
						thumbColor={Platform?.OS === 'android' ? colors.primaryColor : ''}
						value={value}
						onValueChange={(value) => onChange(value)}
					/>
				)}
				name={name}
				rules={{ ...rules }}
			/>
		</View>
	);
};

export default CustomSwitch;

const styles = StyleSheet.create({
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 10,
	},
});
