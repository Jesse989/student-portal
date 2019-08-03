import models from '../models';
import bcrypt from 'bcrypt';

export const createUsers = async () => {
  await models.User.create({
    username: 'Admin0',
    password: bcrypt.hashSync('passwordA0', 12),
    role: 'admin'
  });

  await models.User.create({
    username: 'Teacher0',
    password: bcrypt.hashSync('passwordT0', 12),
    role: 'teacher'
  });

  await models.User.create({
    username: 'Teacher1',
    password: bcrypt.hashSync('passwordT1', 12),
    role: 'teacher'
  });

  await models.User.create({
    username: 'Student0',
    password: bcrypt.hashSync('passwordS0', 12),
    role: 'student'
  });

  await models.User.create({
    username: 'Student1',
    password: bcrypt.hashSync('passwordS1', 12),
    role: 'student'
  });

  await models.User.create({
    username: 'Student2',
    password: bcrypt.hashSync('passwordS2', 12),
    role: 'student'
  });
};
