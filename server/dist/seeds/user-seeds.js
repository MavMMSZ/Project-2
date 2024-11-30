import { User } from '../models/user.js';
export const seedUsers = async () => {
    await User.bulkCreate([
        { username: 'Jonathan', password: 'password' },
        { username: 'Maverick', password: 'password' },
        { username: 'Ed', password: 'password' },
    ], { individualHooks: true });
};
