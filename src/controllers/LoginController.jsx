import { useUser } from '../contexts';
import { FormController } from '../controllers';
import { loginSchema } from '../services/schemas';
import { loginFields } from '../services/fields';

export default function LoginController() {
    const { validateLogin } = useUser();

    return (
        <FormController
            fields={loginFields}
            validate={validateLogin}
            validationSchema={loginSchema}
        />
    );
}
