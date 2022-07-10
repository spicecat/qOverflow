import { createContext, useContext, useState } from 'react';
import { getAnswers, getAnswerComments, getQuestion, getQuestionComments } from '../services/questionsServices';

const QuestionContext = createContext(null);

export default function QuestionProvider({ children }) {
    const [questionData, setQuestionData] = useState(null);

    const loadQuestion = async (question_id) => {
        const { success, question } = await getQuestion(question_id);
        if (success) {
            // const { comments: questionComments = [] } = await getQuestionComments(question_id);
            // question.comments = questionComments;
            // const { answers = [] } = await getAnswers(question_id);
            // for (const answer of answers) {
            //     const { comments: answerComments } = await getAnswerComments(answer.answer_id);
            //     answer.comments = answerComments
            // }
            // question.answers = answers;
            setQuestionData(question);
        }
    }

    return (
        <QuestionContext.Provider value={{ loadQuestion, questionData }}>
            {children}
        </QuestionContext.Provider>
    );
}

export const useQuestion = () => useContext(QuestionContext);
