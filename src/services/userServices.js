import { createEndpoint } from './api';
import { deriveKeyFromPassword } from './auth';
import { MD5 } from 'crypto-js';

const callUsersAPI = createEndpoint('/users');

const hashEmail = (email) => {

    email = email.trim()
    email = email.toLowerCase()

    let url = "https://www.gravatar.com/avatar/"
    let end = "?d=identicon"
    email = MD5(email)
    url += email + end;
    
    return url;


}
const getLevel = (points) => {
    if(points<15){
        return 1;
    }else if(points<50){
        return 2;
    }else if(points<125){
        return 3;
    }else if(points<1000){
        return 4;
    }else if(points<3000){
        return 5;
    }else if(points<10000){
        return 6;
    }else{
        return 7;
    }
}

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
    hashEmail,
    getLevel,
};
