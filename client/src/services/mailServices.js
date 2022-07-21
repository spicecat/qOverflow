import { createEndpoint } from './api';

const callMailAPI = createEndpoint('/mail');

const postMail = async () =>
    callMailAPI('post', ``)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getMail = async () =>
    callMailAPI('get', ``)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

export { getMail, postMail };
