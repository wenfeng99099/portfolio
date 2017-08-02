var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('portfolio', ['users']);
//use passport js for local authentication
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('auth');
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        db.users.findOne({ username: username }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log("wrong username");
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!bcrypt.compareSync(password, user.password)){
                console.log("wrong password");
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log("success");
            console.log(user);
            console.log(user._id);
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    db.users.findOne({_id: id}, function(err, user) {
        done(err, user);
    });
});

router.post("/",
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/register'}),
    function(req, res, next){
    //console.log("Form submitted for auth");
    //res.redirect('/');
    /*var user = {
        username: req.body.logUserName,
        password: req.body.logPassword
    }

    // form validation for user login
    req.checkBody('logUserName', 'UserName not filled').notEmpty();
    req.checkBody('logPassword', 'Password not filled').notEmpty();

    req.getValidationResult().then(function(result){
        if(!result.isEmpty()){
            console.log("Validation Error for login");
            res.render('auth', {
                errors: result.array()
            });
        }else{
            // authenticate user
                res.redirect('/');
        }
    }); */
});
module.exports = router;