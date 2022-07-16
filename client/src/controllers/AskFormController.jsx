import { useNavigate } from 'react-router-dom';
import { Form } from '.';
import { useUser } from '../contexts';
import { questionSchema } from '../services/schemas';
import { askQuestionFields } from '../services/fields';
import { postQuestion } from '../services/questionsServices';

export default function AskFormController() {
    const navigate = useNavigate();
    const { userData } = useUser();

    const askQuestion = async (fields) => {
        const { success } = await postQuestion({
            ...fields,
            creator: userData.username,
        });

        if (success) {
            navigate('/');
        }
    }

    return (
        <Form
            fields={askQuestionFields}
            onSubmit={askQuestion}
            validationSchema={questionSchema}
        />
    );
}
