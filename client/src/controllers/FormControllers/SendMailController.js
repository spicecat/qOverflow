import { useNavigate } from 'react-router-dom';
import { Form } from 'controllers/FormControllers';
import { composeMailFields } from 'services/fields';
import { postMail } from 'services/mailServices';
import { mailSchema } from 'services/schemas';

export default function SendMailController() {
    const navigate = useNavigate();

    const sendMail = async (data) => {
        const { status } = await postMail(data);
        if (status === 200)
            navigate('/');
    }

    return Form({
        fields: composeMailFields,
        onSubmit: sendMail,
        validationSchema: mailSchema
    });
}
