import { FormController } from '.';
import { recoverFields } from '../services/fields';
import { recoverSchema } from '../services/schemas';

export default function ForgotPasswordController() {
    async function recover({ username }) {
        console.log(
            `Visit http://localhost:3000/recover/${username} to reset your password`
        );
    }

    return (
        <FormController
            fields={recoverFields}
            onSubmit={recover}
            validationSchema={recoverSchema}
        />
    );
}
