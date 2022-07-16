import { useUser } from '../contexts';
import { Form } from '.';
import { loginSchema } from '../services/schemas';
import { loginFields } from '../services/fields';

export default function LoginFormController() {
    const { validateLogin } = useUser();

    return (
        <Form
            fields={loginFields}
            validate={validateLogin}
            validationSchema={loginSchema}
        />
    );
}
