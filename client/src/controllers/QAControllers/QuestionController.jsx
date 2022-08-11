import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuestion, useUser } from 'contexts';
import {
    getQuestionVote,
    postQuestionComment,
    openQuestion,
    protectQuestion,
    updateQuestion,
    closeQuestion,
    updateQuestionVote,
} from 'services/questionsServices';
import getPermissions from 'services/getPermissions';
import { Question } from 'components/QAComponents';

export default function QuestionController() {
    const navigate = useNavigate();

    const { question_id } = useParams();
    const { questionData } = useQuestion();
    const { protect, close, reopen, status } = questionData;
    const { userData } = useUser();
    const [ongoingVote, setOngoingVote] = useState({ users: [], type: 'none' });
    const { permissions, setPermissions } = useQuestion();

    function setVote() {
        if (!questionData.loading) {
            if (protect.length) setOngoingVote({ users: protect, type: 'protect' });
            if (close.length) setOngoingVote({ users: close, type: 'close' });
            if (reopen.length) setOngoingVote({ users: reopen, type: 'open' });
        }
    }

    useEffect(() => {
        const permissions = getPermissions(questionData, userData, ongoingVote);

        setPermissions(permissions);
        setVote();
    }, [userData, questionData]);

    useEffect(() => {
        updateQuestion(question_id, { views: 'increment' });
    }, []);

    function ongoingVoteSet(users, type) {
        users.length === 0
            ? setOngoingVote({ users: [], type: 'none' })
            : setOngoingVote({ users: users, type: type });
    }

    function changeProtect() {
        protectQuestion(question_id, userData);
        protect.includes(userData.username)
            ? protect.splice(protect.indexOf(userData.username), 1)
            : protect.push(userData.username);
        ongoingVoteSet(protect, 'protect');
    }

    function changeClose() {
        if (status === 'open') {
            closeQuestion(question_id, userData);
            close.includes(userData.username)
                ? close.splice(close.indexOf(userData.username), 1)
                : close.push(userData.username);
            ongoingVoteSet(close, 'close');
        } else {
            openQuestion(question_id, userData);
            reopen.includes(userData.username)
                ? reopen.splice(reopen.indexOf(userData.username), 1)
                : reopen.push(userData.username);
            ongoingVoteSet(reopen, 'reopen');
        }
    }

    const getVote = () => getQuestionVote(question_id);
    const updateVote = (data) => updateQuestionVote(question_id, data);
    const postComment = async (data) => {
        const { comment } = await postQuestionComment(question_id, data);

        navigate('');
        return comment;
    };

    return (
        <>
            {!questionData.loading && (
                <Question
                    {...{
                        ...questionData,
                        ...permissions,
                        ongoingVote,
                        changeClose,
                        changeProtect,
                        getVote,
                        updateVote,
                        postComment,
                    }}
                />
            )}
        </>
    );
}
