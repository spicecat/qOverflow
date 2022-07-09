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

const login = async (username, password) => {
    try {
        const { salt } = await getUser(username);
        const { key } = await deriveKeyFromPassword(password, salt);
        return callUsersAPI(
            'post',
            `/${username}/auth`,
            { key }
        );
    } catch (err) {
        return err.status;
    }
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
