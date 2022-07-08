import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts';
import { FormController } from '../controllers';
import { loginSchema } from '../services/schemas';
import { loginFields } from '../services/fields';
import { login } from '../services/userServices';

export default function LoginController() {
    const navigate = useNavigate();
    const { setUserData } = useUser();

    async function loginUser({ username, password }) {
        const { status, user } = await login(username, password);

        if (status) {
            setUserData(() => user);
            navigate('/');
        }
    }

    return (
        <FormController
            fields={loginFields}
            onSubmit={loginUser}
            validationSchema={loginSchema}
        />
    );
}
