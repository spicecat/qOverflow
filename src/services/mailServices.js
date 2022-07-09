import superagent from 'superagent';
import { API, API_KEY } from '../var';

const mailAPI = API + '/mail';

const postMail = async (sender, reciever, subject, text) => {
    const URL = `${mailAPI}`;

    try {
        const res = await superagent
            .post(URL)
            .send({
                sender,
                reciever,
                subject,
                text,
            })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const getMail = async (username, after) => {
    const URL = `${mailAPI}/${username}`;

    try {
        const res = await superagent
            .get(URL)
            .query({ after })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

export { getMail, postMail };
