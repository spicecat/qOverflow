import { useUser, useError } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { login } from 'services/userServices';
import { loginFields } from 'services/fields';
import { loginSchema } from 'services/schemas';
import Cookies from 'universal-cookie';

export default function LoginFormController() {
    const { setUserData } = useUser();
    const { setError } = useError();

    const validateLogin = async ({ username, password }) => {
        const req = await login({ username, password });
        if (req.error) {
            setError(req.error);
        } else {
            setUserData(() => req.user);
            Cookies.set('token', req.token);
        }
    };

    return Form({
        fields: loginFields,
        validate: validateLogin,
        validationSchema: loginSchema,
    });
}
