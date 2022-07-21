import { useUser, useError } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { composeMailFields } from 'services/fields';
import { postMail } from 'services/mailServices';
import { mailSchema } from 'services/schemas';

export default function SendMailController() {
    const { userData } = useUser();
    const { setError } = useError();

    const sendMail = async ({ receiver, subject, text }) => {
        const request = postMail(userData.username, receiver, subject, text);

        if (request?.error) {
            setError(request.error);
        }
    };

    return Form({
        fields: composeMailFields,
        onSubmit: sendMail,
        validationSchema: mailSchema,
    });
}
