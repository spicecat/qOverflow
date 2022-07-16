import { Form } from '.';
import { useUser } from '../contexts';
import { mailSchema } from '../services/schemas';
import { composeMailFields } from '../services/fields';
import { postMail } from '../services/mailServices';

export default function SendMailController() {
    const { userData } = useUser();

    const sendMail = ({ reciever, subject, text }) =>
        postMail(userData.username, reciever, subject, text);

    return (
        <Form
            fields={composeMailFields}
            onSubmit={sendMail}
            validationSchema={mailSchema}
        />
    );
}
