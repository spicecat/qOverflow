import { useNavigate } from 'react-router-dom';
import { useUser, useError } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { loginFields } from 'services/fields';
import { loginSchema } from 'services/schemas';
import { login } from 'services/userServices';

export default function LoginFormController() {
    const { setUserData } = useUser();
    const { setError } = useError();
    const navigate = useNavigate();

    const validateLogin = async ({ username, password }) => {
        const { error, status, user } = await login({ username, password });
        if (error) {
            setError(error);
            if (status === 403)
                return { username: 'Username or password incorrect' };
        } else {
            setUserData(user);
            navigate('/');
        }
    };

    return Form({
        fields: loginFields,
        onSubmit: validateLogin,
        validationSchema: loginSchema,
    });
}
