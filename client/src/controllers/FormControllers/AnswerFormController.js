import { useQuestion, useUser } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { answerFields } from 'services/fields';
import { postAnswer } from 'services/questionsServices';
import { answerSchema } from 'services/schemas';
import { useNavigate } from 'react-router-dom';

export default function AnswerFormController({ toggleShow }) {
    const navigate = useNavigate();

    const {
        questionData: { question_id },
    } = useQuestion();
    const {
        userData: { username },
    } = useUser();

    const answerQuestion = async (fields) => {
        const answer = await postAnswer(question_id, { creator: username, text: fields.text });
        toggleShow();
        navigate('');
    };

    return Form({
        fields: answerFields,
        onSubmit: answerQuestion,
        validationSchema: answerSchema,
    });
}
