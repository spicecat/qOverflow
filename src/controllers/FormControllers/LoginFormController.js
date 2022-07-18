import { useUser } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { loginFields } from 'services/fields';
import { loginSchema } from 'services/schemas';

export default function LoginFormController() {
    const { validateLogin } = useUser();

    return (
        Form({
            fields: loginFields,
            validate: validateLogin,
            validationSchema: loginSchema
        })
    );
}
