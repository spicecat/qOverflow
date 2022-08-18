import { useEffect, useState } from 'react';

import { Question } from 'components/QAComponents';
import { useQuestion, useUser } from 'contexts';
import { useNavigate, useParams } from 'react-router-dom';
import getPermissions from 'services/getPermissions';

import {
    addBounty,
    closeQuestion,
    getQuestionVote,
    openQuestion,
    postQuestionComment,
    protectQuestion,
    updateQuestion,
    updateQuestionVote,
} from 'services/questionsServices';
import { SettingsPhoneTwoTone } from '@mui/icons-material';

export default function QuestionController() {
    const navigate = useNavigate();
    let canBounty = false;
    const { question_id } = useParams();
    const { questionData } = useQuestion();
    const { protect, close, reopen, status } = questionData;
    const { userData } = useUser();
    const [ongoingVote, setOngoingVote] = useState({ users: [], type: 'none' });
    const { permissions, setPermissions } = useQuestion();
    const [show, setShow] = useState(false)
    function setVote() {
        if (!questionData.loading) {
            if (protect.length) setOngoingVote({ users: protect, type: 'protect' });
            if (close.length) setOngoingVote({ users: close, type: 'close' });
            if (reopen.length) setOngoingVote({ users: reopen, type: 'open' });
        }
    }

    useEffect(() => {
        const permissions = getPermissions(questionData, userData, ongoingVote);
        if (userData.username) canBounty = (userData.level >= 4 && status !== 'closed' && !questionData.hasBounty && !questionData.hasAcceptedAnswer)

        permissions.canBounty = canBounty;
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
        window.location.reload(false);
    }

    function changeClose() {
        if (status === 'open') {
            closeQuestion(question_id, userData);
            close.includes(userData.username)
                ? close.splice(close.indexOf(userData.username), 1)
                : close.push(userData.username);
            ongoingVoteSet(close, 'close');
            window.location.reload(false);
        } else {
            openQuestion(question_id, userData);
            reopen.includes(userData.username)
                ? reopen.splice(reopen.indexOf(userData.username), 1)
                : reopen.push(userData.username);
            ongoingVoteSet(reopen, 'reopen');
            window.location.reload(false);
        }
    }
    function handleBounty(amount) {
        if (show) {
            const data = {amount: amount}
            addBounty(question_id, data)
            questionData.hasBounty = amount;
            userData.points -= amount;
            setShow(false)
        } else {
            setShow(true)
        }
    }

    const getVote = () => getQuestionVote(question_id);
    const updateVote = (data) => updateQuestionVote(question_id, data);
    const postComment = async (data) => {
        const { comment } = await postQuestionComment(question_id, data);
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
                        show,
                        handleBounty

                    }}
                />
            )}
        </>
    );
}
