import { createEndpoint } from './api';

const callMailAPI = createEndpoint('/mail');

const getMail = async () => callMailAPI('get', ``);

const postMail = async (data) => callMailAPI('post', ``, data);

const readMail = async (mail_id) => callMailAPI('patch', `/${mail_id}`, { read: 'true' });


export { getMail, postMail, readMail };
