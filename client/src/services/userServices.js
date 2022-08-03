import { Buffer } from 'buffer';
import Cookies from 'js-cookie';

import { createEndpoint } from './api';

const callUsersAPI = createEndpoint('/users');

const getLoginAttempts = () => {
    let loginAttempts = Number(Cookies.get('loginAttempts')) || 0;
    let loginTimeout = (Number(Cookies.get('loginTimeout')) - Date.now()) || 0;

    if (loginTimeout < 0) {
        Cookies.remove('loginAttempts');
        Cookies.remove('loginTimeout');
        loginAttempts = 0;
        loginTimeout = 0;
    }

    return { loginAttempts, loginTimeout };
}

const getUser = async (username) => callUsersAPI('get', `/${username}`);

const getUserQuestions = async () => callUsersAPI('get', `/questions`);

const getUserAnswers = async () => callUsersAPI('get', `/answers`);

const incrementLoginAttempts = () => {
    const { loginAttempts } = getLoginAttempts();
    Cookies.set('loginAttempts', loginAttempts + 1);
    if (loginAttempts >= 2) Cookies.set('loginTimeout', Date.now() + 1000 * 60 * 5);
}

const login = async ({ username, password }) => {
    const encoded = Buffer.from(`${username}:${password}`).toString('base64');
    const { token, ...data } = await callUsersAPI(
        'post',
        `/login`,
        { remember: false },
        `basic ${encoded}`
    );
    if (token) {
        Cookies.set('token', token);
        Cookies.remove('loginAttempts');
        Cookies.remove('loginTimeout');
    }
    return data;
};


const logout = async () => callUsersAPI('post', `/login`, { remember: false });

const updateUser = async (data) => callUsersAPI('patch', ``, data);

const register = async (data) => callUsersAPI('post', ``, data);

const remember = async () => callUsersAPI('get', `/remember`);

const requestReset = async (data) => callUsersAPI('post', `/reset`, data);

const resetPassword = async (id, data) =>
    callUsersAPI('post', `/reset/${id}`, data);

export {
    getLoginAttempts,
    getUser,
    getUserAnswers,
    getUserQuestions,
    incrementLoginAttempts,
    login,
    logout,
    register,
    remember,
    updateUser,
    requestReset,
    resetPassword,
};
