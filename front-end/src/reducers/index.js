const initialState = [
	// {
	// 	id: 1,
	// 	login: 'dodo19',
	// 	markers: [
	// 		{
	// 			id: 1,
	// 			position: {
	// 				lat: 46.469,
	// 				lng: 30.74
	// 			},
	// 			label: 'just string'
	// 		},
	// 		{
	// 			id: 2,
	// 			position: {
	// 				lat: 46.439,
	// 				lng: 30.72
	// 			},
	// 			label: 'just string - 2'
	// 		}
	// 	]
	// },
	// {
	// 	id: 2,
	// 	login: 'coco11',
	// 	markers: [
	// 		{
	// 			id: 3,
	// 			position: {
	// 				lat: 46.409,
	// 				lng: 30.7
	// 			},
	// 			label: 'just string - 3'
	// 		},
	// 		{
	// 			id: 4,
	// 			position: {
	// 				lat: 46.55,
	// 				lng: 30.74
	// 			},
	// 			label: 'just string - 4'
	// 		}
	// 	]
	// }
];

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_LOCATION':
			const isInState = state.find(user => user.id === action.payload.id);
			if (!isInState) {
				return [...state, action.payload];
			}
			return state.map(user => {
				if (action.payload.id === user.id) {
					return {
						...user,
						markers: [
							...user.markers,
							action.payload.markers[action.payload.markers.length - 1]
						]
					};
				} else {
					return user;
				}
			});

		case 'GET_USERS':
			return action.payload;

		default:
			return state;
	}
};

export default reducer;
