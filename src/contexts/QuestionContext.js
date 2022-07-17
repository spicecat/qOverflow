import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestion } from 'services/questionsServices';

const QuestionContext = createContext();

export default function QuestionProvider({ children }) {
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

    return (
        <QuestionContext.Provider value={{questionData}}>
            {children}
        </QuestionContext.Provider>
    );
}

export const useQuestion = () => useContext(QuestionContext);
