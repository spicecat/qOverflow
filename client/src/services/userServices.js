import { createEndpoint } from './api';
import { Buffer } from 'buffer';

const callUsersAPI = createEndpoint('/users');

const register = async (data) => callUsersAPI('post', ``, data);

const login = async ({ username, password }) => {
    const encoded = Buffer.from(`${username}:${password}`).toString('base64');
    return callUsersAPI(
        'post',
        `/login`,
        { remember: false },
        `basic ${encoded}`
    );
};

const logout = async () => callUsersAPI('post', `/login`, { remember: false });

const getUser = async (username) => callUsersAPI('get', `/${username}`);

const getUserQuestions = async () => callUsersAPI('get', `/questions`);

const getUserAnswers = async () => callUsersAPI('get', `/answers`);

const updateUser = async (data) => callUsersAPI('patch', ``, data);

const requestReset = async (data) => callUsersAPI('post', `/reset`, data);

const resetPassword = async (id, data) =>
    callUsersAPI('post', `/reset/${id}`, data);

export {
    getUser,
    getUserAnswers,
    getUserQuestions,
    login,
    logout,
    register,
    updateUser,
    requestReset,
    resetPassword,
};
