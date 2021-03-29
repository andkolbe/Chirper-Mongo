import express from 'express';
import * as session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import * as path from 'path';
import connectDB from './db';

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello')
})

const port = process.env.PORT || 3000;
// If there is an environment variable already provided for us, use that. Otherwise, default to 3000
// That way, we can have localhost: 3000 on our computers, but if this server deploys somewhere else like herokku or aws, then you can be provided a port by that server
// most likely, another server already has port 3000 taken up  by their own devtools or someone else's code
app.listen(port, () => console.log(`Server listening on port: ${port}`));