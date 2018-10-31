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
		if(err) res.status(100).send({ error: '1' });
		let user = new User({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hash
		});
		user.save(function(err) {
			if(err) res.status(300).send({ error: '2' });
			else res.status(200).send({ error: '3' });
		});
	});
});

module.exports = router;
