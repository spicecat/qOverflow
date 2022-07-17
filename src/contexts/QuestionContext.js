import { createContext, useContext } from 'react';

const QuestionContext = createContext();

export default function QuestionProvider({ children }) {
    return (
        <QuestionContext.Provider value={{}}>
            {children}
        </QuestionContext.Provider>
    );
}

export const useQuestion = () => useContext(QuestionContext);
