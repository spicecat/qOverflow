import { createEndpoint } from './api';

const callMailAPI = createEndpoint('/mail');

const postMail = async (data) => callMailAPI('post', ``, data);

const getMail = async () => callMailAPI('get', ``);

export { getMail, postMail };
