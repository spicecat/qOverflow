import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form } from 'controllers/FormControllers';
import { composeMailFields } from 'services/fields';
import { postMail } from 'services/mailServices';
import { mailSchema } from 'services/schemas';

export default function SendMailController() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/users/login', {
                state: {
                    name: 'ask',
                    msg: 'you need to be authenticated to access this feature',
                    prevPath: '/ask',
                },
            });
        }
    }, []);

    const sendMail = async (fields) => {
        const { error, status } = await postMail(fields);
        console.log(error, status, 12313);
        if (error) {
            if (status === 500)
                return { receiver: 'Error' };
            else if (status === 404)
                return { receiver: 'User not found' };
        } else {
            window.location.reload(false);
        }
    };

    return Form({
        fields: composeMailFields,
        validate: sendMail,
        validationSchema: mailSchema,
    });
}
