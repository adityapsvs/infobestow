var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res) {
	let { firstName, lastName, email, password } = req.body;
	bcrypt.hash(password, 10, function(err, hash) {
		if(err) res.send({ error: 'Something went wrong!' });
		User.find({ email: email }, function(err, docs) {
			if(docs.length !== 0) res.send({ error: 'User with that email already exists!' });
			else {
				let user = new User({
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: hash
				});
				user.save(function(err) {
					if(err) res.send({ error: 'Something went wrong!' });
					else res.send({ success: 'You\'ve been successfully registered!' });
				});
			}
		});
	});
});

router.post('/login', function(req, res) {
	console.log(req.body)
	let { email, password } = req.body;
	User.find({ email: email }, function(err, docs) {
		if(err) res.send({ error: 'Something went wrong!' });
		else if(docs.length === 0) res.send({ error:  'There\'s no user with that email address!' });
		else {
			var hash = docs[0].password;
			console.log(docs[0])
			console.log(Object.keys(docs[0]))
			bcrypt.compare(password, hash, function(err, match) {
				if(err) res.send({ error: 'Something went wrong!' });
				else if(match === false) res.send({ error: 'Incorrect password!' });
				else if(match === true) res.send({ success: 'Success' });
			});
		}
	});
});

module.exports = router;
