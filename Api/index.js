import axios from 'axios';

export default axios.create({
	baseURL: 'https://sarhan-food-menu.firebaseio.com/foodApp',
});
