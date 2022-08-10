import { useNavigate } from 'react-router-dom';
import { Form } from 'controllers/FormControllers';
import { composeMailFields } from 'services/fields';
import { postMail } from 'services/mailServices';
import { mailSchema } from 'services/schemas';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function SendMailController({ sendMail }) {
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

    return Form({
        fields: composeMailFields,
        onSubmit: sendMail,
        validationSchema: mailSchema,
    });
}
