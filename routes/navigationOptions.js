import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../components/navigation/HeaderButton';
import colors from '../constants/colors';

export const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? colors.primaryColor : '',
	},
	headerTintColor: Platform.OS === 'android' ? '#fff' : colors.accentColor,
};
const navigationOptions = (navData) => ({
	...defaultNavOptions,
	headerLeft: () => {
		// console.log('navData', navData);
		return (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Menu"
					onPress={() => navData.navigation.toggleDrawer()}
					iconName="ios-menu"
					iconSize={25}
					color="white"
				/>
			</HeaderButtons>
		);
	},
});

export default navigationOptions;
