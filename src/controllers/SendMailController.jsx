import { useUser } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { composeMailFields } from 'services/fields';
import { postMail } from 'services/mailServices';
import { mailSchema } from 'services/schemas';

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
