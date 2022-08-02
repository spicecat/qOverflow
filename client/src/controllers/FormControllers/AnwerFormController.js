import { useUser } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { answerFields } from 'services/fields';
import { postAnswer } from 'services/questionsServices';
import { answerSchema } from 'services/schemas';

export default function AnswerForm({question_id}) {
    const {userData} = useUser();
    const data = {creator: userData.username}
    const answerQuestion = async(fields) => {
        data.text = fields.text;
        await postAnswer(question_id, data)
    }
    return (
        Form({
            fields: answerFields,
            onSubmit: answerQuestion,
            validationSchema: answerSchema
        })
    );
}
