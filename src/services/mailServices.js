import superagent from 'superagent';
import { API, API_KEY } from '../var';

const mailApi = API + '/mail';

const postMail = async () => {
    const URL = `${mailApi}`;

    try {
        const { user } = await superagent.get(URL).set('key', API_KEY);
        return user;
    } catch (err) {
        return err.status;
    }
};

const getMail = async username => {
    const URL = `${mailApi}/${username}`;

    try {
        const { user } = await superagent.get(URL).set('key', API_KEY);
        return user;
    } catch (err) {
        return err.status;
    }
};

export {
    getMail,
    postMail
};