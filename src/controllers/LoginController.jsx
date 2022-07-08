import { useUser } from '../contexts';
import { FormController } from '../controllers';
import { loginSchema } from '../services/schemas';
import { loginFields } from '../services/fields';
import { login } from '../services/userServices';

export default function LoginController() {
    const { setUserData } = useUser();

    async function loginUser(username, password) {
        const { status, user } = await login(username, password);

        if (status) {
            setUserData(() => user);
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
