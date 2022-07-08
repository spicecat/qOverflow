import superagent from 'superagent';

import { API, API_KEY } from '../var';
import { deriveKeyFromPassword } from './auth';

const userApi = API + '/users';

const register = async ({ username, email, password }) => {
    const { key, salt } = await deriveKeyFromPassword(password);

    try {
        const { success } = await superagent
            .post(`${API}/users`, { username, email, salt, key })
            .set('Authorization', `bearer ${API_KEY}`);

        return success;
    } catch (err) {
        return err.status;
    }
};

const login = async ({ username, password }) => {
    const URL = `${userApi}/${username}/auth`;

    try {
        const user = await getUser(username);
        const { key } = await deriveKeyFromPassword(password, user.salt);

        const status = await superagent
            .post(URL, { key })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((response) => response.body.success);

        return { status, user };
    } catch (err) {
        console.error(err);

        return err;
    }
};

const logout = () => {};

const getUser = async (username) => {
    const URL = `${userApi}/${username}`;

    try {
        const user = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((response) => response.body.user);

        return user;
    } catch (err) {
        return err.status;
    }
};

const getUsers = async () => {};

export { getUser, getUsers, login, logout, register };
