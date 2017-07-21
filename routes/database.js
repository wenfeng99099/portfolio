var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('portfolio', ['users']);

/* GET database page. */
router.get('/', function(req, res, next) {
    // find everything
    db.users.find(function (err, docs) {
        // docs is an array of all the documents in mycollection
        console.log(docs);
    });
    res.render('database', { title: 'Database' });
});

module.exports = router;