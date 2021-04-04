export {}
const config =  require('./config');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const routes = require('./routes');
const connectDB = require('./db');
const { formatDate } = require('./helpers/hbs');
const _handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

require('./middlewares/passport-strategies');
require('./middlewares/caching-middleware');

const app = express();

connectDB();

// Handlebars
// defaultLayout: we have a layout that wraps all of our views. We wany ours to be called main.hbs
// extname: changes file extention from .handlebars to .hbs
app.engine('.hbs', exphbs({ 
    helpers: { formatDate }, 
    defaultLayout: 'main', 
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(_handlebars)
})) 
app.set('view engine', '.hbs')
// Set 'views' directory for any views being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Express
app.use(session({ // this needs to go above the passport middleware
    secret: config.session.secret, // the secret can be anything you want
    resave: false, // false = we don't want to save a session if nothing is modified
    saveUninitialized: false, // false = don't create a session unless something is stored     
    store: MongoStore.create({ mongoUrl: config.mongoose.uri }) // connects to the db to be able store user sessions in Mongo Atlas
}));

app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public')); // defines which folder we want to use as static
app.use(express.urlencoded({ extended: false })); // to accept form data
app.use(express.json()); 
// Method override
// THIS MUST GO ABOVE routesa
app.use(methodOverride('_method'));
app.use(routes);

const port = process.env.PORT || 3000;
// If there is an environment variable already provided for us, use that. Otherwise, default to 3000
// That way, we can have localhost: 3000 on our computers, but if this server deploys somewhere else like herokku or aws, then you can be provided a port by that server
// most likely, another server already has port 3000 taken up  by their own devtools or someone else's code
app.listen(port, () => console.log(`Server listening on port: ${port}`)).on('error', err => {
    console.log(err);
    process.exit(1);
});