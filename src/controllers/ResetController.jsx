import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../contexts';
import { FormController } from '../controllers';
import { resetSchema } from '../services/schemas';
import { resetFields } from '../services/fields';
import { updateUser } from '../services/userServices';
import { deriveKeyFromPassword } from '../services/auth';

export default function ResetController() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { setUserData } = useUser();

    async function changePassword({ password }) {
        const { key } = await deriveKeyFromPassword(password);

        const { user, success } = await updateUser(username, {
            key: key,
        });

        if (success) {
            setUserData(() => user);
            navigate('/login');
        }
    }

    return (
        <FormController
            fields={resetFields}
            onSubmit={changePassword}
            validationSchema={resetSchema}
        />
    );
}
