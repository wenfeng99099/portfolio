var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('portfolio', ['users']);

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/submit', function(req, res, next){
	console.log("FORM SUBMITTED!")
	var newUser = {
		username: req.body.regUserName,
		password: req.body.regPassword,
		email: req.body.regEmail
	};
	console.log(newUser);
    db.users.insert(newUser, function(err, result){
    	if (err){
    		console.log('error with registering new user');
		}
		res.redirect('/');
	});
});

module.exports = router;