import { Form } from 'controllers/FormControllers';
import { registerFields } from 'services/fields';
import { registerSchema } from 'services/schemas';
import { register } from 'services/userServices';
import { useError } from 'contexts';
import { useNavigate } from 'react-router-dom';

export default function RegisterFormController() {
    const { setError } = useError();

    const navigate = useNavigate();

    const validateRegister = async ({ username, email, password }) => {
        const req = await register({ username, email, password });
        if (req.error) {
            setError(req.error);
        } else {
            navigate('/login');
        }
    };

    return Form({
        fields: registerFields,
        onSubmit: validateRegister,
        validationSchema: registerSchema,
    });
}
