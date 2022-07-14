import { createContext, useContext, useState } from 'react';
import { useUser } from '.';
import {
    getQuestion,
} from '../services/questionsServices';

const QuestionContext = createContext();

export default function QuestionProvider({ children }) {
    const { userData: { username } } = useUser();
    const [questionData, setQuestionData] = useState({});

    const loadQuestion = async (question_id) => {
        const { success, question } = await getQuestion(question_id);
        if (success)
            setQuestionData(question);
    }

    return (
        <QuestionContext.Provider value={{
            loadQuestion,
            questionData
        }}>
            {children}
        </QuestionContext.Provider>
    );
}

export const useQuestion = () => useContext(QuestionContext);
