import express from 'express';
import * as session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import * as path from 'path';

const app = express();

app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));