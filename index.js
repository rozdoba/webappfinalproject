let express = require('express')
let app = express();
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./utils/db');

const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      partialsDir: 'views/partials/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));

let userRoutes = require('./routes/userRoute');
app.use(userRoutes);

let postRoutes = require('./routes/postRoutes');
app.use(postRoutes);

let loginRoutes = require('./routes/loginRoute');
app.use(loginRoutes);

let profileRoutes = require('./routes/profileRoute');
app.use(profileRoutes);

let messageRoutes = require('./routes/messageRoute');
app.use(messageRoutes);

// !! Change the render page name to your view name to test your view.
// Change the variables to your view variables.
app.get('/', function (req,res) {
    res.render('loginView', { 
      loginCSS: true,
      registerCSS: true
    });
});

// app.get('/', function (req,res) {
//   // res.render('registerView', {  
//   //   homeCSS: true,
//   //   loginCSS: true,
//   //   registerCSS: true
//   // });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready @ port ${PORT}`))
