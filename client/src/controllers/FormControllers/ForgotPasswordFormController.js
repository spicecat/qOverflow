import { Form } from 'controllers/FormControllers';
import { requestReset } from 'services/userServices';
import { recoverFields } from 'services/fields';
import { recoverSchema } from 'services/schemas';

export default function ForgotPasswordFormController() {
    const recover = async ({ username }) => {
        await requestReset({ username });
    };

    return Form({
        fields: recoverFields,
        onSubmit: recover,
        validationSchema: recoverSchema,
    });
}
