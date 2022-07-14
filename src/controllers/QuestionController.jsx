import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuestion } from '../contexts';
import { Question } from '../components';

export default function QuestionController() {
    const { question_id } = useParams();
    const { loadQuestion, questionData } = useQuestion();

    useEffect(() => {
        loadQuestion(question_id);
    }, [question_id]);

    return questionData && (
        <Question {...questionData} />
    );
}
