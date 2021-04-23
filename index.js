if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} 
console.log(process.env.NODE_ENV);

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const methodoverride =require('method-override');
const flash = require('connect-flash');
const morgan = require('morgan');
const path = require('path');
//const jquery = require('jquery');
// require('dotenv').config();

//init
const app = express();
require('./config/passport');


//setting
app.set('port',process.env.PORT);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
  }));
app.set('view engine', '.hbs');

//middlewares
app.use(methodoverride('_method'));
app.use(session({
  secret:'covid',
  resave: true,
  saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//global
app.use((req,res,next)=> {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.users = req.users;
  //app.locals.total = req.total;
  next();
});

//routs
app.use(require('./routes/index'));
app.use(require('./routes/center'));
app.use(require('./routes/login'));
app.use(require('./routes/usuarios'));
app.use('/port',require('./routes/port'));
app.use('/insert',require('./routes/insert'));
app.use('/query',require('./routes/query'));
app.use('/update',require('./routes/update'));
app.use('/edit',require('./routes/edit'));
//static fails
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__filename,'database')));
//star the server
app.listen(app.get('port'),() =>{
  console.log('server op port', app.get('port'));
});



