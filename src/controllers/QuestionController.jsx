import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QuestionProvider } from 'contexts'
import { Question } from 'components/QAComponents';
import { getQuestion } from 'services/questionsServices';

export default function QuestionController() {
    const { question_id } = useParams();
    const [questionData, setQuestionData] = useState();

    useEffect(() => {
        const loadQuestion = async () => {
            const { success, question } = await getQuestion(question_id);
            if (success)
                setQuestionData(question);
        }
        loadQuestion();
    }, [question_id]);

    return questionData && (
        <QuestionProvider>
            <Question {...questionData} />
        </QuestionProvider>
    );
}
