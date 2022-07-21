import { useUser, useError } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { updateUser } from 'services/userServices';
import { patchFields } from 'services/fields';
import { patchSchema } from 'services/schemas';
import { useNavigate } from 'react-router-dom';

export default function LoginFormController() {
    const { setUserData } = useUser();
    const { setError } = useError();
    const navigate = useNavigate();

    const update = async ({ email, password }) => {
        const req = await updateUser({ email, password });
        if (req?.error) {
            setError(req.error);
        } else {
            setUserData((initial) => ({ ...initial, email }));
            navigate('/');
        }
    };

    return Form({
        fields: patchFields,
        onSubmit: update,
        validationSchema: patchSchema,
    });
}
