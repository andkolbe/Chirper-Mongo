import config from './config';
import express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import routes from './routes';
import connectDB from './db';
import './middlewares/passport-strategies';

const app = express();

connectDB();

// Handlebars
// defaultLayout: we have a layout that wraps all of our views. We wany ours to be called main.hbs
// extname: changes file extention from .handlebars to .hbs
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) 
app.set('view engine', '.hbs')
// Set 'views' directory for any views being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

app.use(session({ // this needs to go above the passport middleware
    secret: config.session.secret, // the secret can be anything you want
    resave: false, // false = we don't want to save a session if nothing is modified
    saveUninitialized: false, // false = don't create a session unless something is stored     
    store: MongoStore.create({ mongoUrl: config.mongoose.uri }) // connects to the db to be able store user sessions in Mongo Atlas
}));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;
// If there is an environment variable already provided for us, use that. Otherwise, default to 3000
// That way, we can have localhost: 3000 on our computers, but if this server deploys somewhere else like herokku or aws, then you can be provided a port by that server
// most likely, another server already has port 3000 taken up  by their own devtools or someone else's code
app.listen(port, () => console.log(`Server listening on port: ${port}`));