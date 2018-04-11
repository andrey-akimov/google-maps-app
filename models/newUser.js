const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
			minlength: 3,
			trim: true
		},
		password: {
			type: String,
			required: true
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

const NewUser = mongoose.model('newUser', userSchema);

module.exports = NewUser;
