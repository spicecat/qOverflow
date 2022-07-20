import Cookies from 'universal-cookie';
import { createEndpoint } from './api';

const callUsersAPI = createEndpoint('/users');

const register = async (data) =>
    await callUsersAPI('post', '/users')
        .send(data)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const login = async (data) => {
    const encoded = btoa(`${data.username}:${data.password}`);

    return await callUsersAPI('post', `/users/login`)
        .set('Authorization', `basic ${encoded}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });
};

const getUser = async (username) =>
    await callUsersAPI('get', `/${username}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getUserQuestions = async () =>
    await callUsersAPI('get', `/questions`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getUserAnswers = async () =>
    await callUsersAPI('get', `/answers`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const updateUser = async (data) =>
    await callUsersAPI('patch', ``)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const requestReset = async (data) =>
    await callUsersAPI('post', '/reset')
        .send(data)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const resetPassword = async (id, data) =>
    await callUsersAPI('post', `/reset/${id}`)
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
    register,
    updateUser,
    requestReset,
    resetPassword,
};
