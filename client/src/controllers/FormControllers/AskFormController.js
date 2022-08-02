import { useNavigate } from 'react-router-dom';

import { Form } from 'controllers/FormControllers';
import { askQuestionFields } from 'services/fields';
import { postQuestion } from 'services/questionsServices';
import { questionSchema } from 'services/schemas';

export default function AskFormController() {
    const navigate = useNavigate();

    const askQuestion = async (fields) => {
        const { success } = await postQuestion(fields);

        if (success)
            navigate('/');
    }

    return (
        Form({
            fields: askQuestionFields,
            onSubmit: askQuestion,
            validationSchema: questionSchema
        })
    );
}
