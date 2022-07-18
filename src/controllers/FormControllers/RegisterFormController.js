import { useUser } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { registerFields } from 'services/fields';
import { registerSchema } from 'services/schemas';

export default function RegisterFormController() {
    const { validateRegister } = useUser();

    return (
        Form({
            fields: registerFields,
            validate: validateRegister,
            validationSchema: registerSchema
        })
    );
}
