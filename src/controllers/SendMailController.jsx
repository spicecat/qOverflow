import { Form } from '.';
import { useUser } from '../contexts';
import { mailSchema } from '../services/schemas';
import { composeMailFields } from '../services/fields';
import { postMail } from '../services/mailServices';

export default function SendMailController() {
    const { userData } = useUser();

    async function loginUser({ reciever, subject, text }) {
        await postMail(userData.username, reciever, subject, text);
    }

    return (
        <Form
            fields={composeMailFields}
            onSubmit={loginUser}
            validationSchema={mailSchema}
        />
    );
}
