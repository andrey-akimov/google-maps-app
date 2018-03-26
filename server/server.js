const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const User = require('./models/user');
const mongoose = require('./db/mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allow CORS requests
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

app.listen(8000, () => {
	console.log('Server started on port 8000');
});

// GET
app.get('/', (req, res) => {
	User.find({}, (err, docs) => {
		if (err) {
			return res.send(err);
		}
		return res.send(docs);
	});
});
