import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, Text } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';
const Select = (props) => {
	const {
		label,
		isMulti = false,
		name,
		rules,
		options,
		selectedItems,
		control,
		setValue,
		validationError,
	} = props;
	const [selectedItem, setSelectedItem] = useState(() => selectedItems);
	// console.log('options', selectedItems);

	return (
		<>
			<Controller
				control={control}
				render={({ onChange, value }) => (
					<SectionedMultiSelect
						items={options}
						uniqueKey="id"
						selectText={label}
						// showDropDowns=
						single={!isMulti}
						onSelectedItemsChange={(newValue) => {
							console.log('newVal', newValue);
							setSelectedItem(newValue);
							setValue(name, newValue, {
								shouldValidate: true,
								shouldDirty: true,
							});
						}}
						styles={{ selectToggle: styles.selectToggle }}
						selectedItems={selectedItem}
						IconRenderer={MaterialIcons}
						alwaysShowSelectText
						modalAnimationType="slide"
					/>
				)}
				name={name}
				rules={{ ...rules }}
			/>
			{validationError && (
				<Text style={styles.errorText}>{validationError.message}</Text>
			)}
		</>
	);
};

export default Select;

const styles = StyleSheet.create({
	selectToggle: {
		width: '100%',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginVertical: 20,
		padding: 5,
	},
	errorText: {
		color: '#e74c3c',
		textAlign: 'center',
		marginVertical: 10,
	},
});
