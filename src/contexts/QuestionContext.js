import { createContext, useContext, useState } from 'react';
import { useUser } from '.';
import { checkAnswerVote, checkQuestionVote, getAnswers, getAnswerComments, getQuestion, getQuestionComments } from '../services/questionsServices';

const QuestionContext = createContext(null);

export default function QuestionProvider({ children }) {
    const { userData: { username } } = useUser();
    const [questionData, setQuestionData] = useState(null);

    const getAnswerVoteStatus = (question_id, answer_id) =>
        checkAnswerVote(question_id, answer_id, username)
            .then(({ vote }) => vote);

    const getQuestionVoteStatus = () =>
        checkQuestionVote(questionData.question_id, username)
            .then(({ vote }) => vote);

    const loadQuestion = async (question_id) => {
        const { success, question } = await getQuestion(question_id);
        if (success) {
            const { comments: questionComments = [] } = await getQuestionComments(question_id);
            question.comments = questionComments;
            const { answers = [] } = await getAnswers(question_id);
            for (const answer of answers) {
                const { comments: answerComments } = await getAnswerComments(question_id, answer.answer_id);
                answer.comments = answerComments
            }
            question.answers = answers;
            setQuestionData(question);
        }
    }

    return (
        <QuestionContext.Provider value={{
            getAnswerVoteStatus,
            getQuestionVoteStatus,
            loadQuestion,
            questionData
        }}>
            {children}
        </QuestionContext.Provider>
    );
}

export const useQuestion = () => useContext(QuestionContext);
