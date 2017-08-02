var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('portfolio', ['users']);

/* GET database page. */
router.get('/', ensureAuthenticated, function(req, res, next) {

});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        res.render('database',{user: req.user});
    else{
        res.redirect('/auth')
    }
}

module.exports = router;