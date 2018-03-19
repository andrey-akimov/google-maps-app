const initialState = [
	{
		id: 1,
		login: 'dodo19',
		markers: [
			{
				id: 1,
				location: {
					lat: 11,
					lng: 22
				},
				label: 'just string'
			},
			{
				id: 2,
				location: {
					lat: 12,
					lng: 23
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
				location: {
					lat: 21,
					lng: 32
				},
				label: 'just string - 3'
			},
			{
				id: 4,
				location: {
					lat: -12,
					lng: -23
				},
				label: 'just string - 4'
			}
		]
	}
];

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_USERS':
			return state;

		default:
			return state;
	}
};

export default reducer;
