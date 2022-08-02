import { useQuestion, useUser } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { answerFields } from 'services/fields';
import { postAnswer } from 'services/questionsServices';
import { answerSchema } from 'services/schemas';

export default function AnswerFormController() {
    const { questionData: { question_id } } = useQuestion();
    const { userData: { username } } = useUser();

    const answerQuestion = async (fields) => {
        await postAnswer(question_id, { creator: username, text: fields.text })
    }

    return (
        Form({
            fields: answerFields,
            onSubmit: answerQuestion,
            validationSchema: answerSchema
        })
    );
}
