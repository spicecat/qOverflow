import { useNavigate } from 'react-router-dom';
import { Form } from 'controllers/FormControllers';
import { composeMailFields } from 'services/fields';
import { postMail } from 'services/mailServices';
import { mailSchema } from 'services/schemas';
import { useEffect } from 'react';
import { useUser } from 'contexts';

export default function SendMailController() {
    const { userData } = useUser();

    const navigate = useNavigate();
    useEffect(() => {
        if (checkAuth()) {
            navigate('/users/login', {
                state: {
                    name: 'ask',
                    msg: 'you need to be authenticated to access this feature',
                    prevPath: '/ask',
                },
            });
        }
    }, []);

    function checkAuth() {
        if (!userData.username) {
            return true;
        }
    }

    return Form({
        fields: composeMailFields,
        onSubmit: postMail,
        validationSchema: mailSchema,
    });
}
