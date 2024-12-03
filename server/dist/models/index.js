import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
const sequelize = new Sequelize('user_db', 'postgres', '1015643', {
    host: 'localhost',
    dialect: 'postgres',
});
const User = UserFactory(sequelize);
export { sequelize, User };
