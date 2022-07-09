import superagent from 'superagent';
import { API, API_KEY } from '../var';
import { deriveKeyFromPassword } from './auth';

const userApi = API + '/users';

const register = async ({ username, email, password }) => {
    const { key, salt } = await deriveKeyFromPassword(password);
    console.log(key, salt, 111);
    try {
        const res = await superagent
            .post(URL, { username, email, salt, key })
            .set('key', API_KEY)
            .then((res) => res.body);
        return res;
    } catch (err) {
        return err.status;
    }
};

const login = async (username, password) => {
    const URL = `${userApi}/${username}/auth`;

    try {
        const user = await getUser(username);
        const { key } = await deriveKeyFromPassword(password, user.salt);

        const res = await superagent
            .post(URL, { key })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        console.error(err);

        return err;
    }
};

const getUser = async (username) => {
    const URL = `${userApi}/${username}`;

    try {
        const res = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const getUsers = async () => {
    const URL = `${userApi}`;

    try {
        const res = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const getUserQuestions = async (username, after) => {
    const URL = `${userApi}/${username}/questions`;

    try {
        const res = await superagent
            .get(URL)
            .query({ after })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const getUserAnswers = async (username, after) => {
    const URL = `${userApi}/${username}/answers`;

    try {
        const res = await superagent
            .get(URL)
            .query({ after })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const updateUserPoints = async (username, operation, amount) => {
    const URL = `${userApi}/${username}`;

    try {
        const res = await superagent
            .patch(URL)
            .send({ operation, amount })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

export {
    getUser,
    getUsers,
    getUserAnswers,
    getUserQuestions,
    login,
    register,
    updateUserPoints,
};
