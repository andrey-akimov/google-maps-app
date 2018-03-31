const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
	NewUser.find({}, '_id login markers', (err, docs) => {
		if (err) {
			return res.send(err);
		}
		return res.send(docs);
	});
});

app.get('/map', verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			return res.json({ res: 'err' });
		}

		NewUser.findById(authData._id, 'markers', (err, docs) => {
			if (!!docs) {
				return res.json({ docs, res: 'ok' });
			} else {
				return res.json({ res: 'err' });
			}
		});
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

			newUser.save((err, product) => {
				if (err) {
					return console.log(err);
				}
				// JWT
				jwt.sign({ _id: product._id }, 'secretkey', (err, token) => {
					if (err) {
						return console.log(err);
					}
					return res.json({
						res: 'saved',
						authorization: 'Bearer ' + token,
						login: product.login
					});
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
					jwt.sign({ _id: docs._id }, 'secretkey', (err, token) => {
						if (err) {
							return console.log(err);
						}
						return res.json({
							res: 'ok',
							authorization: 'Bearer ' + token,
							login: docs.login
						});
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

app.post('/map', verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			return res.json({ res: 'err' });
		}

		NewUser.findById(authData._id, (err, docs) => {
			if (!!docs) {
				docs.markers.push(req.body.marker);
				docs.save();
				return res.json({ docs, res: 'ok' });
			} else {
				return res.json({ res: 'err' });
			}
		});
	});
});

// verifyToken
function verifyToken(req, res, next) {
	const bearerStr = req.body.token || req.query.token;
	if (typeof bearerStr !== 'undefined') {
		const bearer = bearerStr.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}
