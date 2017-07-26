var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('auth', { title: 'Wenfeng Jiang' });
});

router.post("/login", function(req, res, next){
    console.log("Form submitted for auth");
    var user = {
        username: req.body.logUserName,
        password: req.body.logPassword
    }
    console.log(user.username);
    console.log(user.password);
    res.json(user);
});
module.exports = router;