import { Form } from 'controllers/FormControllers';
import { recoverFields } from 'services/fields';
import { recoverSchema } from 'services/schemas';

export default function ForgotPasswordFormController() {
    const recover = ({ username }) => {
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
