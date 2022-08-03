import { useNavigate } from 'react-router-dom';
import { useUser, useError } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { loginFields } from 'services/fields';
import { loginSchema } from 'services/schemas';
import { getLoginAttempts, incrementLoginAttempts, login } from 'services/userServices';

export default function LoginFormController() {
    const { setUserData } = useUser();
    const { setError } = useError();
    const navigate = useNavigate();

    const validateLogin = async ({ username, password }) => {
        if (username && password) {
            const formatTime = time => `${Math.floor(time / 60000)} minutes, ${Math.floor((time % 60000) / 1000)} seconds`
            {
                const { loginTimeout } = getLoginAttempts();
                if (loginTimeout)
                    return { password: `0 attempts remaining, wait ${formatTime(loginTimeout)}` };
            }
            const { error, status, user } = await login({ username, password });
            if (error) {
                setError(error);
                if (status === 403) {
                    incrementLoginAttempts();
                    const { loginAttempts, loginTimeout } = getLoginAttempts();
                    return {
                        username: 'Username or password incorrect',
                        password: loginAttempts >= 3
                            ? `0 attempts remaining, wait ${formatTime(loginTimeout)}`
                            : `${3 - loginAttempts} attempts remaining`
                    }
                }
            } else {
                setUserData(user);
                navigate('/');
            }
        }
    };

    return Form({
        fields: loginFields,
        validate: validateLogin,
        validationSchema: loginSchema,
    });
}
