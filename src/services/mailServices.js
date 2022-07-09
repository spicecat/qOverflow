import superagent from 'superagent';
import { API, API_KEY } from '../var';

const mailApi = API + '/mail';

const postMail = async (sender, reciever, subject, text) => {
    const URL = `${mailApi}`;

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
    const URL = `${mailApi}/${username}`;

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
