import { Form } from '.';
import { recoverFields } from '../services/fields';
import { recoverSchema } from '../services/schemas';

export default function ForgotPasswordFormController() {
    async function recover({ username }) {
        console.log(
            `Visit http://localhost:3000/recover/${username} to reset your password`
        );
    }

    return (
        <Form
            fields={recoverFields}
            onSubmit={recover}
            validationSchema={recoverSchema}
        />
    );
}
