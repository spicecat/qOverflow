import { Buffer } from 'buffer';
import Cookies from 'js-cookie';
import { createEndpoint } from './api';
import { getUserLevel } from './getUserLevel';

const callUsersAPI = createEndpoint('/users');

const register = async (data) => callUsersAPI('post', ``, data);

const login = async ({ username, password }) => {
    const encoded = Buffer.from(`${username}:${password}`).toString('base64');
    const { token, ...user } = await callUsersAPI(
        'post',
        `/login`,
        { remember: false },
        `basic ${encoded}`
    );
    Cookies.set('token', token);
    return { ...user, level: getUserLevel(user?.points) };
};

const remember = async () => {
    const { user } = await callUsersAPI('get', `/remember`);
    return { user: { ...user, level: getUserLevel(user?.points) } };
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
    remember,
    updateUser,
    requestReset,
    resetPassword,
};
