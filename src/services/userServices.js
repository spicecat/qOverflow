import { deriveKeyFromPassword } from './auth';
import { createEndpoint } from '../var';

const callUsersAPI = createEndpoint('/users');

const register = async ({ username, email, password }) => {
    try {
        const { key, salt } = await deriveKeyFromPassword(password);
        const { success } = await callUsersAPI(
            'post',
            `/`,
            { username, email, salt, key }
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const login = async (username, password) => {
    try {
        const { salt } = await getUser(username);
        const { key } = await deriveKeyFromPassword(password, salt);
        const { success } = await callUsersAPI(
            'post',
            `/${username}/auth`,
            { key }
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const getUser = async (username) => {
    try {
        const { user } = await callUsersAPI(
            'get',
            `/${username}`
        );
        return user;
    } catch (err) {
        return err.status;
    }
};

const getUsers = async () => {
    try {
        const { users } = await callUsersAPI(
            'get',
            `/`
        );
        return users;
    } catch (err) {
        return err.status;
    }
};

const getUserQuestions = async (username, data) => { // { after }
    try {
        const { questions } = await callUsersAPI(
            'get',
            `/${username}/questions`,
            data
        );
        return questions;
    } catch (err) {
        return err.status;
    }
};

const getUserAnswers = async (username, data) => { // { after }
    try {
        const { answers } = await callUsersAPI(
            'get',
            `/${username}/answers`,
            data
        );
        return answers;
    } catch (err) {
        return err.status;
    }
};

const updateUserPoints = async (username, data) => { // { operation, amount }
    try {
        const { success } = await callUsersAPI(
            'patch',
            `/${username}/points`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const updateUser = async (username, data) => { // { salt, key, email, points }
    try {
        const { success } = await callUsersAPI(
            'patch',
            `/${username}`,
            data
        );
        return success;
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
