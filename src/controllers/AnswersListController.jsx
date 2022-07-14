import { useEffect, useState } from 'react';
import { useQuestion } from '../contexts';
import { AnswersList } from '../components';
import { getAnswers } from '../services/questionsServices';

export default function AnswersListController() {
    const { questionData: { question_id, answers: count } } = useQuestion();
    const [answers, setAnswers] = useState();

    useEffect(() => {
        const loadAnswers = async () => {
            const { answers: newAnswers } = await getAnswers(question_id)
            setAnswers(newAnswers || []);
        }
        loadAnswers();
    }, [question_id]);

    return <AnswersList {...{ answers, count }} />;
}
