import axios from 'axios';

export const addLocation = data => {
	return {
		type: 'ADD_LOCATION',
		payload: data
	};
};

// export const getUsers = () => dispatch =>
// 	axios
// 		.get('http://localhost:8000/')
// 		.then(res => {
// 			dispatch({
// 				type: 'GET_USERS',
// 				payload: res.data
// 			});
// 		})
// 		.catch(err => {
// 			dispatch({
// 				type: 'GET_USERS_REJECTED',
// 				payload: 'Request error'
// 			});
// 		});
