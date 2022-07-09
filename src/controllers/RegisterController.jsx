import { useNavigate } from 'react-router-dom';
import { FormController } from '../controllers';
import { registerSchema } from '../services/schemas';
import { registerFields } from '../services/fields';
import { register } from '../services/userServices';

export default function RegisterController() {
    const navigate = useNavigate();

    async function registerUser(values) {
        const { success, status } = await register(values);
        console.log(123, values, status)
        if (success) {
            navigate('/login');
        }
    }

    return (
        <FormController
            fields={registerFields}
            onSubmit={registerUser}
            validationSchema={registerSchema}
        />
    );
}
