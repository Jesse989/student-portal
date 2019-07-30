import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';
import passport from 'passport';
import { auth } from './auth';
import { createTeachersWithStudents } from './seed';
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// app.use(passport.session());

app.use('/students', routes.student);
app.use('/teachers', routes.teacher);
app.use('/auth', routes.auth);

auth(app, models);

app.listen(process.env.PORT || 8000, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

export { app };
