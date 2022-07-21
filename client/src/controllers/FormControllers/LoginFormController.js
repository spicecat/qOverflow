import { useUser, useError } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { login } from 'services/userServices';
import { loginFields } from 'services/fields';
import { loginSchema } from 'services/schemas';
import { getUserLevel } from 'services/getUserLevel';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function LoginFormController() {
    const { setUserData } = useUser();
    const { setError } = useError();
    const navigate = useNavigate();

    const validateLogin = async ({ username, password }) => {
        const req = await login({ username, password });
        if (req.error) {
            setError(req.error);
        } else {
            const data = { ...req.user, level: getUserLevel(req.user.points) };
            setUserData(() => data);
            Cookies.set('token', req.token);
            navigate('/');
        }
    };

    return Form({
        fields: loginFields,
        onSubmit: validateLogin,
        validationSchema: loginSchema,
    });
}
