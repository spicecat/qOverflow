import { useUser } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { updateUser } from 'services/userServices';
import { patchFields } from 'services/fields';
import { patchSchema } from 'services/schemas';
import { useNavigate } from 'react-router-dom';

export default function UpdateFormController() {
    const { setUserData } = useUser();
    const navigate = useNavigate();

    const update = async ({ email, password }) => {
        const { error } = await updateUser({ email, password });
        if (!error) {
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
