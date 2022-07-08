import { useNavigate } from 'react-router-dom';
import { FormController } from '../controllers';
import { registerSchema } from '../services/schemas';
import { registerFields } from '../services/fields';
import { register } from '../services/userServices';

export default function RegisterController() {
    const navigate = useNavigate();

    async function registerUser(username, email, password) {
        const response = await register(username, password);

        if (response) {
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
