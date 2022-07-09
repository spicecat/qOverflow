import { createContext, useContext, useState } from 'react';
import { getQuestion } from '../services/questionsServices';

const QuestionContext = createContext(null);

export default function QuestionProvider({ children }) {
    const [questionData, setQuestionData] = useState(null);

    const selectQuestion = async question_id => {
        console.log(await getQuestion(question_id))
        
        // setQuestionData(await getQuestion(question_id))
    }

    return (
        <QuestionContext.Provider value={{ selectQuestion, setQuestionData, questionData }}>
            {children}
        </QuestionContext.Provider>
    );
}

export const useQuestion = () => useContext(QuestionContext);
