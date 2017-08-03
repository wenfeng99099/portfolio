var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('portfolio', ['users']);

/* GET database page. */
router.get('/', function(req, res, next) {
    res.render('database', {user: req.user});
});

router.post('/', ensureAuthenticated, function(req, res, next){
   //form validation
    console.log(req.body.newpost);
    req.checkBody('newpost', 'New post is empty').notEmpty();

    req.getValidationResult().then(function(result){
        if(!result.isEmpty()){
            console.log("Validation Error for register");
            res.render('database', {
                errors: result.array()
            });
        }else{
            db.users.update({username: req.user.username}, {$push:{posts:req.body.newpost}},function(err, user){
                if(err){
                    console.log("Error while updating");
                    return err;
                }else{
                    res.redirect('database');
                }
            });
        };
    });

});
// reserve for later use
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else{
        res.redirect('/auth')
    }
}

module.exports = router;