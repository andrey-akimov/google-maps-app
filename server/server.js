const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/user');
const NewUser = require('./models/newUser');
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

app.get('/map', verifyToken, (req, res) => {
	jwt.verify(req.token, 'seckretkey', (err, authData) => {
		if (err) {
			console.log(err);
		}
		res.json({ authData });
	});
});

// POST
app.post('/registration', (req, res) => {
	NewUser.findOne({ login: req.body.login }, (err, docs) => {
		if (err) {
			return res.send(err);
		}

		if (!!docs) {
			return res.json({ res: 'exist' });
		}

		// Hashing a password
		bcrypt.hash(req.body.password, 2).then(function(hash) {
			const newUser = new NewUser({
				login: req.body.login,
				password: hash,
				markers: []
			});

			newUser.save(err => {
				if (err) {
					return console.log(err);
				}
				// JWT
				jwt.sign({ login: req.body.login }, 'secretkey', (err, token) => {
					if (err) {
						return console.log(err);
					}
					console.log(token);
					res.header({ Authorization: 'Bearer ' + token });
					return res.json({ res: 'saved' });
				});
			});
		});
	});
});

app.post('/login', (req, res) => {
	NewUser.findOne({ login: req.body.login }, (err, docs) => {
		if (err) {
			return res.send(err);
		}

		if (!!docs) {
			// Hashing a password
			bcrypt.compare(req.body.password, docs.password).then(function(result) {
				if (result) {
					// JWT
					jwt.sign({ login: req.body.login }, 'secretkey', (err, token) => {
						if (err) {
							return console.log(err);
						}
						console.log(token);
						res.header({ Authorization: 'Bearer ' + token });
						return res.json({ res: 'ok' });
					});
				} else {
					return res.json({ res: 'err' });
				}
			});
		} else {
			return res.json({ res: 'err' });
		}
	});
});

// verifyToken
function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined
	if (typeof bearerHeader !== 'undefined') {
		// Split at the space
		const bearer = bearerHeader.split(' ');
		// Get token from array
		const bearerToken = bearer[1];
		// Set token
		req.token = bearerToken;
		// Next middleware
		next();
	} else {
		// Forbidden
		res.sendStatus(403);
	}
}
