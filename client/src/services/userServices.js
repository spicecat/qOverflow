import Cookies from 'js-cookie';
import { createEndpoint } from './api';

const callUsersAPI = createEndpoint('/users');

const register = async (data) =>
    callUsersAPI('post', '')
        .send(data)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const login = async ({ username, password }) => {
    const encoded = btoa(`${username}:${password}`);

    return callUsersAPI('post', `/login`)
        .set('Authorization', `basic ${encoded}`)
        .send({ remember: false })
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });
};

const logout = async () =>
    await callUsersAPI('post', `/login`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send({ remember: false })
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getUser = async (username) =>
    callUsersAPI('get', `/${username}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getUserQuestions = async () =>
    callUsersAPI('get', `/questions`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getUserAnswers = async () =>
    callUsersAPI('get', `/answers`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const updateUser = async (data) =>
    callUsersAPI('patch', ``)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const requestReset = async (data) =>
    callUsersAPI('post', '/reset')
        .send(data)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const resetPassword = async (id, data) =>
    callUsersAPI('post', `/reset/${id}`)
        .send(data)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

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
