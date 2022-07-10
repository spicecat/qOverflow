import { deriveKeyFromPassword } from './auth';
import { createEndpoint } from '../var';

const callUsersAPI = createEndpoint('/users');

const register = async ({ username, email, password }) => {
    const { salt, key } = await deriveKeyFromPassword(password);
    return callUsersAPI(
        'post',
        ``,
        { username, email, salt, key }
    );
};

const login = async ({ username, password }) => {
    const { user, ...error } = await getUser(username);
    if (!user) return error

    const { key } = await deriveKeyFromPassword(password, user.salt);
    const { success } = await callUsersAPI(
        'post',
        `/${username}/auth`,
        { key }
    );
    return { ...user, success }
};

const getUser = (username) =>
    callUsersAPI(
        'get',
        `/${username}`
    );

const getUsers = () =>
    callUsersAPI(
        'get',
        ``
    );

const getUserQuestions = (username, data) => // { after }
    callUsersAPI(
        'get',
        `/${username}/questions`,
        data
    );

const getUserAnswers = (username, data) => // { after }
    callUsersAPI(
        'get',
        `/${username}/answers`,
        data
    );

const updateUserPoints = (username, data) => // { operation, amount }
    callUsersAPI(
        'patch',
        `/${username}/points`,
        data
    );

const updateUser = (username, data) => // { salt, key, email, points }
    callUsersAPI(
        'patch',
        `/${username}`,
        data
    );

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
