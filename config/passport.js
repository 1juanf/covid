const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {getuserc} = require('../database');

passport.use('local-login',new LocalStrategy({
  usernameField : 'iduser',
  passwordField : 'password',
  passReqToCallback: true
  }, async (req,iduser,password,done)=>{
    const {op}=(req.body);
     users = await getuserc(iduser);
    //  console.log(users);
    if (!users) {
      console.log('Not user found.');
      return done(null,false,req.flash('message','No se encuentra el usuario.'));
    }else {
      if (password==users.pass) {
        // if(parseInt(op) == users.entity){
            // console.log('ok');
            done(null, users,req.flash('success','Bienvenido'+ users.nickname));
        // }else{
        //     done(null,false,req.flash('message','incorrect emtity'));
        //     console.log('incorrect emtity');
        // }
      }else {
        console.log('incorrect password');
        return done(null,false,req.flash('message','Contraseña incorrecta'));
      }
    }
  }
));

passport.serializeUser((users,done)=>{
  // console.log(users.id_c);
  done(null,users.id_c);
});

passport.deserializeUser(async (id,done) =>{
  const row = await getuserc(id);
  done(null,row);
});
