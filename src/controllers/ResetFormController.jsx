import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '.';
import { useUser } from '../contexts';
import { resetSchema } from '../services/schemas';
import { resetFields } from '../services/fields';
import { updateUser } from '../services/userServices';
import { deriveKeyFromPassword } from '../services/auth';

export default function ResetFormController() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { setUserData } = useUser();

    const changePassword = async ({ password }) => {
        const body = await deriveKeyFromPassword(password);

        const { user, success } = await updateUser(username, body);

        if (success) {
            setUserData(() => user);
            navigate('/login');
        }
    }

    return (
        <Form
            fields={resetFields}
            onSubmit={changePassword}
            validationSchema={resetSchema}
        />
    );
}
