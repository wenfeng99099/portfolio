var express = require('express');
var router = express.Router();

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
	res.json(newUser);
});

module.exports = router;