import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'controllers/FormControllers';
import { resetFields } from 'services/fields';
import { resetSchema } from 'services/schemas';
import { resetPassword } from 'services/userServices';

export default function ResetFormController() {
    const navigate = useNavigate();
    const { id } = useParams();

    const changePassword = async ({ password }) => {
        const { error } = await resetPassword(id, { password });

        if (!error) {
            navigate('/users/login');
        }
    };

    return Form({
        fields: resetFields,
        onSubmit: changePassword,
        validationSchema: resetSchema,
    });
}
