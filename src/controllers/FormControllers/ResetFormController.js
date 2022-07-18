import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'controllers/FormControllers';
import { deriveKeyFromPassword } from 'services/auth';
import { resetFields } from 'services/fields';
import { resetSchema } from 'services/schemas';
import { updateUser } from 'services/userServices';

export default function ResetFormController() {
    const navigate = useNavigate();
    const { username } = useParams();

    const changePassword = async ({ password }) => {
        const body = await deriveKeyFromPassword(password);

        const { success } = await updateUser(username, body);

        if (success) {
            navigate('/users/login');
        }
    }

    return (
        Form({
            fields: resetFields,
            onSubmit: changePassword,
            validationSchema: resetSchema
        })
    );
}
