import { createContext, useContext, useState } from 'react';
import { useUser } from '.';
import {
    getAnswers,
    getAnswerComments,
    getQuestion,
    getQuestionComments,

} from '../services/questionsServices';

const QuestionContext = createContext();

export default function QuestionProvider({ children }) {
    const { userData: { username } } = useUser();
    const [questionData, setQuestionData] = useState({});

    const loadQuestion = async (question_id) => {
        const { success, question } = await getQuestion(question_id);
        if (success) {
            // question.vote = checkQuestionVote(question_id, username).then(({ vote }) => vote);

            // const { comments = [] } = await getQuestionComments(question_id);
            // question.commentsList = comments;
            // for (const comment of comments)
            // comment.vote = checkCommentVote(question_id, comment.comment_id, username).then(({ vote }) => vote);

            // const { answers = [] } = await getAnswers(question_id);
            // question.answersList = answers;
            // for (const answer of answers) {
            //     const { comments: answerComments } = await getAnswerComments(question_id, answer.answer_id);
            //     answer.commentsList = answerComments;
            // answer.vote = checkAnswerVote(question_id, answer.answer_id, username).then(({ vote }) => vote);

            // for (const answerComment of answerComments)
            //     answerComment.vote = checkAnswerCommentVote(question_id, answer.answer_id, answerComment.comment_id, username).then(({ vote }) => vote);
            // }
            setQuestionData(question);
        }
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
