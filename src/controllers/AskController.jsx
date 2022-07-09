import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts';
import { FormController } from '../controllers';
import { questionSchema } from '../services/schemas';
import { askQuestionFields } from '../services/fields';
import { postQuestion } from '../services/questionsServices';

export default function LoginController() {
    const navigate = useNavigate();
    const { userData } = useUser();

    async function askQuestion(fields) {
        const { success } = await postQuestion({
            ...fields,
            creator: userData.username,
        });

        if (success) {
            navigate('/');
        }
    }

    return (
        <FormController
            fields={askQuestionFields}
            onSubmit={askQuestion}
            validationSchema={questionSchema}
        />
    );
}
