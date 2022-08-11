import { Form } from 'controllers/FormControllers';
import { registerFields } from 'services/fields';
import { registerSchema } from 'services/schemas';
import { register } from 'services/userServices';
import { useNavigate } from 'react-router-dom';

export default function RegisterFormController() {
    const navigate = useNavigate();

    const validateRegister = async ({ username, email, password }) => {
        const { error, status } = await register({ username, email, password });
        if (error) {
            switch (error) {
                case 'an item with that "username" already exists':
                    return { username: 'Username already exists' };
                case 'an item with that "email" already exists':
                    return { email: 'Email already exists' };
                default:
                    return;
            }
        } else {
            if (status === 201) navigate('/users/login');
        }
    };

    return Form({
        fields: registerFields,
        validate: validateRegister,
        validationSchema: registerSchema,
    });
}
