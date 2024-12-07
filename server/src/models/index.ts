import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// const sequelize = process.env.DB_URL
//   ? new Sequelize(process.env.DB_URL)
//   : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
//     host: 'localhost',
//     dialect: 'postgres',
//     dialectOptions: {
//       decimalNumbers: true,
//     },
//   });
// incase this shit dosent work go to knban models/index
const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

const User = UserFactory(sequelize);

export { sequelize, User };