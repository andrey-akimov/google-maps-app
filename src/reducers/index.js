const initialState = [
	{
		id: 1,
		login: 'dodo19',
		markers: [
			{
				id: 1,
				position: {
					lat: 46.469,
					lng: 30.74
				},
				label: 'just string'
			},
			{
				id: 2,
				position: {
					lat: 46.439,
					lng: 30.72
				},
				label: 'just string - 2'
			}
		]
	},
	{
		id: 2,
		login: 'coco11',
		markers: [
			{
				id: 3,
				position: {
					lat: 46.409,
					lng: 30.7
				},
				label: 'just string - 3'
			},
			{
				id: 4,
				position: {
					lat: 46.55,
					lng: 30.74
				},
				label: 'just string - 4'
			}
		]
	}
];

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// case 'GET_USERS':
		// 	alert('zzzz');
		// 	return state;

		case 'ADD_LOCATION':
			console.log(action);
			return [...state, action.payload];

		default:
			return state;
	}
};

export default reducer;
