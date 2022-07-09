import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuestion } from '../contexts';
import { Question } from '../components';

export default function QuestionController() {
    const { question_id } = useParams();
    const { selectQuestion } = useQuestion()

    const testQuestion = { upvotes: 123, text: '###markdown' }; // temp

    useEffect(() => {
        selectQuestion(question_id);
    }, []);

    return <Question {...testQuestion} />;
}
