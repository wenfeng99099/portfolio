var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('auth');
});

router.post("/", function(req, res, next){
    console.log("Form submitted for auth");
    var user = {
        username: req.body.logUserName,
        password: req.body.logPassword
    }
    req.checkBody('logUserName', 'UserName not filled').notEmpty();
    req.checkBody('logPassword', 'Password not filled').notEmpty();

    req.getValidationResult().then(function(result){
        if(!result.isEmpty()){
            console.log("Validation Error for login");
            res.render('auth', {
                errors: result.array()
            });
        }else{
            res.redirect('/');
        }
    });
});
module.exports = router;