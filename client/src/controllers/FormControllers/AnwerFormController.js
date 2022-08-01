import { answerFields } from "services/fields";
import { answerSchema } from "services/schemas";
import { Form } from 'controllers/FormControllers';
import { postAnswer } from "services/questionsServices";
import { useUser } from "contexts";
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
