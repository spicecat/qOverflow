import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuestion } from '../contexts';
import { Question } from '../components';

import {
    checkQuestionVote,
    updateQuestionVote,

} from '../services/questionsServices';
export default function QuestionController() {
    const { question_id } = useParams();
    const { loadQuestion, questionData } = useQuestion();

    useEffect(() => {
        loadQuestion(question_id);
    }, []);

    return <Question {...questionData} />;
}
