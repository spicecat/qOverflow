import { createEndpoint } from '../var';

const callMailAPI = createEndpoint('/mail');

const postMail = async data => { // { sender, reciever, subject, text }
    try {
        const { success } = await callMailAPI(
            'post',
            `/`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const getMail = async (username, data) => { // { after }
    try {
        const { messages } = await callMailAPI(
            'get',
            `/${username}`,
            data
        );
        return messages;
    } catch (err) {
        return err.status;
    }
};

export { getMail, postMail };
