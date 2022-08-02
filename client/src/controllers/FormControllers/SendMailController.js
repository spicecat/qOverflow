import { Form } from 'controllers/FormControllers';
import { composeMailFields } from 'services/fields';
import { postMail } from 'services/mailServices';
import { mailSchema } from 'services/schemas';

export default function SendMailController() {

    const sendMail = (data) =>
        postMail(data);

    return Form({
        fields: composeMailFields,
        onSubmit: sendMail,
        validationSchema: mailSchema
    });
}
