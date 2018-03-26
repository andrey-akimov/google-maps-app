const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
			minlength: 3,
			trim: true
		},
		markers: [
			{
				position: {
					lat: {
						type: Number,
						required: true
					},
					lng: {
						type: Number,
						required: true
					}
				},
				label: {
					type: String,
					required: true,
					trim: true
				}
			}
		]
	},
	{
		versionKey: false,
		collection: 'users'
	}
);

const User = mongoose.model('user', userSchema);

module.exports = User;

// const newUser = {
// 	id: 1,
// 	login: 'coco19',
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
// };

// const user = new User(newUser);
// user
// 	.save()
// 	.then(doc => {
// 		console.log(JSON.stringify(doc, undefined, 2));
// 		mongoose.disconnect();
// 	})
// 	.catch(err => {
// 		console.log('Unable to save', err);
// 		mongoose.disconnect();
// 	});
