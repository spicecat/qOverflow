import { useUser } from 'contexts';
import { Form } from 'controllers';
import { registerSchema } from 'services/schemas';
import { registerFields } from 'services/fields';

export default function RegisterFormController() {
    const { validateRegister } = useUser();

    return (
        <Form
            fields={registerFields}
            validate={validateRegister}
            validationSchema={registerSchema}
        />
    );
}
