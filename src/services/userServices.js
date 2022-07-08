import superagent from 'superagent';
import { API, API_KEY } from '../var';
import { deriveKeyFromPassword } from './auth';

const userApi = API + '/users';

const register = async ({ username, email, password }) => {
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

const login = async (username, password) => {
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

const getUsers = async () => {
    const URL = `${userApi}`;

    try {
        const users = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((response) => response.body.users);

        return users;
    } catch (err) {
        return err.status;
    }
};

const getUserQuestions = async (username, after) => {
    const URL = `${userApi}/${username}/questions`;

    try {
        const questions = await superagent
            .get(URL)
            .query({ after })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((response) => response.body.questions);

        return questions;
    } catch (err) {
        return err.status;
    }
};

const getUserAnswers = async (username, after) => {
    const URL = `${userApi}/${username}/answers`;

    try {
        const answers = await superagent
            .get(URL)
            .query({ after })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((response) => response.body.answers);

        return answers;
    } catch (err) {
        return err.status;
    }
};

const updateUserPoints = async (username, operation, amount) => {
    const URL = `${userApi}/${username}`;

    try {
        const status = await superagent
            .patch(URL)
            .send({ operation, amount })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((response) => response.body.success);

        return status;
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
