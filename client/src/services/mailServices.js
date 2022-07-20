import { createEndpoint } from './api';
import Cookies from 'universal-cookie';

const callMailAPI = createEndpoint('/mail');

const postMail = async () =>
    await callMailAPI('post', ``)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getMail = async () =>
    await callMailAPI('get')
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

export { getMail, postMail };
