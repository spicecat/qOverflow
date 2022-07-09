import { useParams, useState } from 'react-router-dom';
import { Question } from '../components';
import { getQuestion } from '../services/questionsServices';

export default function QuestionController() {
    const { question_id } = useParams();

    const testQuestion = { upvotes: 123, text: '###markdown' }; // temp
    console.log(question_id);

    return <Question {...testQuestion} />;
}
