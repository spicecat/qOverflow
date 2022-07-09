import { useUser } from '../contexts';
import { FormController } from '../controllers';
import { mailSchema } from '../services/schemas';
import { composeMailFields } from '../services/fields';
import { postMail } from '../services/mailServices';

export default function LoginController() {
    const { userData } = useUser();

    async function loginUser({ reciever, subject, text }) {
        await postMail(userData.username, reciever, subject, text);
    }

    return (
        <FormController
            fields={composeMailFields}
            onSubmit={loginUser}
            validationSchema={mailSchema}
        />
    );
}
