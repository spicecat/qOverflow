import { createContext, useContext, useState } from 'react';

const QuestionContext = createContext(null);

export default function QuestionProvider({ children }) {
    const [questionData, setQuestionData] = useState(null);

    return (
        <QuestionContext.Provider value={{ setQuestionData, questionData }}>
            {children}
        </QuestionContext.Provider>
    );
}

export const useQuestion = () => useContext(QuestionContext);
