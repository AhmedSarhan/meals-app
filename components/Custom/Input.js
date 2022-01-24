import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
const Input = (props) => {
	const {
		control,
		name,
		rules,
		containerStyles,
		labelStyles,
		inputStyles,
		label,
		validationError,
		defaultValue,
		// keyboardType = 'default',
		// maxLength = 100,
	} = props;

	return (
		<View style={{ ...styles.formGroup, ...containerStyles }}>
			<Text style={{ ...styles.label, ...labelStyles }}>{label}</Text>
			<Controller
				control={control}
				defaultValue={defaultValue}
				render={({ onChange, onBlur, value }) => (
					<TextInput
						{...props}
						style={{ ...styles.input, ...inputStyles }}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						autoCapitalize="none"
						blurOnSubmit
						autoCorrect={false}
					/>
				)}
				name={name}
				rules={{ ...rules }}
			/>
			{validationError && (
				<Text style={styles.errorText}>{validationError.message}</Text>
			)}
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	formGroup: {
		marginVertical: 10,
		width: '100%',
	},
	label: {
		margin: 0,
		padding: 0,
	},
	input: {
		width: '100%',
		padding: 2,
		marginTop: 0,
		marginBottom: 2,
		borderWidth: 1,
		borderColor: '#c4c4c4',
		borderRadius: 5,
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: -2 },
		shadowRadius: 10,
	},
	errorText: {
		color: '#e74c3c',
		textAlign: 'center',
		marginVertical: 10,
	},
});
