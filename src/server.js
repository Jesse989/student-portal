import express from 'express';
import session from 'express-session';
import models from './models';
import routes from './routes';
import passport from 'passport';
import { passportConfig } from './auth';
import helmet from 'helmet';

require('dotenv').config();

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig(models);

app.use('/users', routes.users);
app.use('/portal', routes.portal);

app.listen(process.env.PORT || 8000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

export { app };
