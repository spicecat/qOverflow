import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'controllers/FormControllers';
import { useUser } from 'contexts';
import { questionSchema } from 'services/schemas';
import { askQuestionFields } from 'services/fields';
import { postQuestion } from 'services/questionsServices';

export default function AskFormController() {

    const navigate = useNavigate();
    const { userData } = useUser();
    useEffect(() => {
        if (checkAuth()) {
            navigate('/users/login', { state: { name: 'ask', msg: 'you need to be authenticated to access this feature', prevPath: '/ask' } })
        }
    }, []);

    function checkAuth() {

        if (!userData.username) {
            return true;
        }
    }

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
        Form({
            fields: askQuestionFields,
            onSubmit: askQuestion,
            validationSchema: questionSchema
        })
    );
}
