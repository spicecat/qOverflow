import { useUser } from '../contexts';
import { FormController } from '../controllers';
import { registerSchema } from '../services/schemas';
import { registerFields } from '../services/fields';

export default function RegisterController() {
    const { validateRegister } = useUser();

    return (
        <FormController
            fields={registerFields}
            validate={validateRegister}
            validationSchema={registerSchema}
        />
    );
}
