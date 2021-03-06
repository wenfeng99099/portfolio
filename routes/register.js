var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('portfolio', ['users']);
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', {user: req.user});
});

router.post('/', function(req, res, next){
	console.log("FORM SUBMITTED!")

    //form validations
	req.checkBody('regName', 'Name not filled').notEmpty();
    req.checkBody('regUserName', 'UserName not filled').notEmpty();
    req.checkBody('regPassword', 'Password not filled').notEmpty();
    req.checkBody('regPassword2', 'Password is not the same').equals(req.body.regPassword);
    req.checkBody('regEmail', 'Email format incorrect').isEmail();

    req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			console.log("Validation Error for register");
            res.render('register', {
				errors: result.array()
            });
		}else{
			//hash password
			var hashPass = bcrypt.hashSync(req.body.regPassword, salt);
			// Create new user info
            var newUser = {
                name: req.body.regName,
                username: req.body.regUserName,
                password: hashPass,
                email: req.body.regEmail,
                posts: {}
            };
            db.users.insert(newUser, function(err, result){
                console.log(newUser);
                if (err){
                    console.log('error with registering new user');
                }
                res.redirect('auth');
            });
		};
	});
});

module.exports = router;