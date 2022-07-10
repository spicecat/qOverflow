import { createEndpoint } from './api';

const callMailAPI = createEndpoint('/mail');

const postMail = data => // { sender, reciever, subject, text }
    callMailAPI(
        'post',
        ``,
        data
    );

const getMail = (username, data) => // { after }
    callMailAPI(
        'get',
        `/${username}`,
        data
    );

export { getMail, postMail };
