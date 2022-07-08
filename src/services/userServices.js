import superagent from 'superagent';
import Cookies from 'universal-cookie';
import { API, API_KEY } from '../var';
import { deriveKeyFromPassword } from './auth';

const userApi = API + '/users';
const cookies = new Cookies();

export const register = async ({ username, email, password }) => {
    const URL = userApi;

    const { key, salt } = await deriveKeyFromPassword(password);
    console.log(key, salt, 111)
    try {
        const response = await superagent.post(URL, { username, email, salt, key }).set('key', API_KEY);
        return;
    } catch (err) { return err.status; }
}

export const login = async () => {
}

export const logout = () => {
}

export const getLocalUser = async () => {
}

export const getUser = async user_id => {
}

export const getUsers = async (after = '') => {

}
