import superagent from 'superagent';
import { API, API_KEY } from '../var';
import { deriveKeyFromPassword } from './auth';

const userApi = API + '/users';

const register = async ({ username, email, password }) => {
    const URL = userApi;

    const { key, salt } = await deriveKeyFromPassword(password);
    console.log(key, salt, 111);
    try {
        const { success } = await superagent
            .post(URL, { username, email, salt, key })
            .set('key', API_KEY);
        return success;
    } catch (err) {
        return err.status;
    }
};

const login = async ({ username, password }) => {
    const URL = `${userApi}/${username}/auth`;

    try {
        const { salt } = await getUser(username);
        const { key } = await deriveKeyFromPassword(password, salt);
        const { success } = await superagent
            .post(URL, { key })
            .set('key', API_KEY);
        return success;
    } catch (err) {
        return err.status;
    }
};

const logout = () => { };

const getUser = async (username) => {
    const URL = `${userApi}/${username}`;

    try {
        const { user } = await superagent.get(URL).set('key', API_KEY);
        return user;
    } catch (err) {
        return err.status;
    }
};

const getUsers = async () => {
    const URL = `${userApi}`;

    try {
        const { user } = await superagent.get(URL).set('key', API_KEY);
        return user;
    } catch (err) {
        return err.status;
    }
};

const getUserQuestions = async () => {
    const URL = `${userApi}`;

    try {
        const { user } = await superagent.get(URL).set('key', API_KEY);
        return user;
    } catch (err) {
        return err.status;
    }
};
const getUserAnswers = async () => {
    const URL = `${userApi}`;

    try {
        const { user } = await superagent.get(URL).set('key', API_KEY);
        return user;
    } catch (err) {
        return err.status;
    }
};
const updateUserPoints = async () => {
    const URL = `${userApi}`;

    try {
        const { user } = await superagent.get(URL).set('key', API_KEY);
        return user;
    } catch (err) {
        return err.status;
    }
};

export { getUser, getUsers, getUserAnswers, getUserQuestions, login, logout, register, updateUserPoints };
