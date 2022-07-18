import { createContext, useContext, useState } from 'react';

const initialAnswerData = {};

const AnswerContext = createContext();

export default function AnswerProvider({ children }) {
    const [answerData, setAnswerData] = useState(initialAnswerData);

    return (
        <AnswerContext.Provider value={{ answerData, setAnswerData }}>
            {children}
        </AnswerContext.Provider>
    );
}

export const useAnswer = () => useContext(AnswerContext);
