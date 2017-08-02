var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('portfolio', ['users']);
var ObjectId = mongojs.ObjectId;

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
            console.log("--------successfully found user--------");
            console.log(user);
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    db.users.findOne({_id: ObjectId(id)}, function(err, user) {
        done(err, user);
    });
});

router.post("/",
    passport.authenticate('local', {successRedirect:'/database', failureRedirect:'/auth'}),
    function(req, res, next){
        res.redirect('/');
});
module.exports = router;