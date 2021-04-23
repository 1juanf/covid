const {Router} = require('express');
const router = Router();
const passport = require('passport');

router.get('/login',(req, res)=>{
  console.log('entro');
    res.render('login/login');
});

router.post('/login', (req, res, next) => {
    // console.log(req.body);
    const {op} =req.body;

    if(op==1){
      passport.authenticate('local-login',{
        successRedirect : '/center',
        failureRedirect : '/login',
        failureFlash : true
      })(req, res, next);
    }
    if(op==0){
      passport.authenticate('local-login',{
        successRedirect : '/port/port',
        failureRedirect : '/login',
        failureFlash : true
      })(req, res, next);
    } 
});

module.exports = router;