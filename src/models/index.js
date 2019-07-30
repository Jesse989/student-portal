import Sequelize from 'sequelize';

require('dotenv').config();
const db =
  process.env.NODE_ENV == 'test' ? process.env.TEST_DB : process.env.DB;

export const sequelize = new Sequelize(
  db,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    dialect: 'postgres'
  }
);

const models = {
  Teacher: sequelize.import('./teacher.js'),
  Student: sequelize.import('./student.js')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;
