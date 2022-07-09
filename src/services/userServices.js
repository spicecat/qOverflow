import superagent from 'superagent';
import { API, API_KEY, callAPI } from '../var';
import { deriveKeyFromPassword } from './auth';

const userAPI = API + '/users';

const register = async ({ username, email, password }) => {
    const URL = userAPI;

    const { key, salt } = await deriveKeyFromPassword(password);

    try {
        const res = await superagent
            .post(URL, { username, email, salt, key })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const login = async (username, password) => {
    const URL = `${userAPI}/${username}/auth`;

    try {
        const { user } = await getUser(username);
        const { key } = await deriveKeyFromPassword(password, user.salt);

        const res = await superagent
            .post(URL)
            .send({ key })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((response) => response.body);

        return { user, ...res };
    } catch (err) {
        console.error(err);

        return err;
    }
};

const getUser = async (username) => {
    const URL = `${userAPI}/${username}`;

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
    const URL = `${userAPI}`;

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
    const URL = `${userAPI}/${username}/questions`;

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
    const URL = `${userAPI}/${username}/answers`;

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
    const URL = `${userAPI}/${username}`;

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

const updateUser = async (username, body) => {
    const URL = `${userAPI}/${username}`;

    try {
        const res = await superagent
            .patch(URL)
            .send(body)
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
    updateUser,
};
