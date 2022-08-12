import { createContext, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { getQuestion } from 'services/questionsServices';

const initialQuestionData = { loading: true };

const QuestionContext = createContext();

export default function QuestionProvider({ children }) {
    const { question_id } = useParams();
    const [questionData, setQuestionData] = useState(initialQuestionData);
    const [permissions, setPermissions] = useState({});

    useEffect(() => {
        const loadQuestion = async () => {
            const { question } = await getQuestion(question_id);
            if (question) setQuestionData(question);
        };

        loadQuestion();
    }, [question_id]);

    return (
        <QuestionContext.Provider value={{ questionData, permissions, setPermissions }}>
            <Helmet>
                <title>{questionData.title}</title>
            </Helmet>
            {children}
        </QuestionContext.Provider>
    );
}

export const useQuestion = () => useContext(QuestionContext);
