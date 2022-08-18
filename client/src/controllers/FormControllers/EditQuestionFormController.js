
import { Form } from 'controllers/FormControllers';
import { generateEditFields } from 'services/fields';
import { editQuestion } from 'services/questionsServices';
import { editSchema } from 'services/schemas';
import { useQuestion } from 'contexts';

export default function EditQuestionFormController() {
    const {questionData} = useQuestion();
    const {title, text} = questionData;
    

    
    const editTheQuestion = async (fields) => {
        const { status } = await editQuestion(questionData.question_id, fields);
        window.location.reload(false);
    };

    const field = generateEditFields

    return !questionData.loading && Form({
        fields: field,
        onSubmit: editTheQuestion,
        validationSchema: editSchema,
        initialValues: {etext : text, etitle : title}
    });
}
