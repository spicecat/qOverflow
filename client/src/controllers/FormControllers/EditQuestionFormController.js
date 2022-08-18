
import { Form } from 'controllers/FormControllers';
import { generateEditFields } from 'services/fields';
import { editQuestion } from 'services/questionsServices';
import { questionSchema } from 'services/schemas';
import { useQuestion } from 'contexts';

export default function EditFormController() {
    const {questionData} = useQuestion();
    const {title, text} = questionData;
    

    
    const editTheQuestion = async (fields) => {
        console.log("hello")
        const { status } = await editQuestion(questionData.question_id, fields);
        window.location.reload(false);
    };

    const field = generateEditFields

    return !questionData.loading && Form({
        fields: field,
        onSubmit: editTheQuestion,
        validationSchema: questionSchema,
        initialValues: {etext : text, etitle : title}
    });
}
