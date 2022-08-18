import { useEffect, useState } from 'react';

import { VoteControl } from 'components/QAComponents';
import { useQuestion, useUser } from 'contexts';

export default function VoteControlController({
    downvotes,
    getVote,
    orientation,
    updateVote,
    upvotes,
    creator,
}) {
    const {
        questionData: { status },
    } = useQuestion();
    const {
        userData: { level, username },
    } = useUser();

    const [disabled, setDisabled] = useState();
    const [vote, setVote] = useState();
    const [original, setOriginal] = useState();
    let isOwnQ = username === creator;
    const canDownvote = level >= 5 && status !== 'closed' && !isOwnQ;
    const canUpvote = level >= 2 && status !== 'closed' && !isOwnQ;

    const loadVote = async () => {
        if (canUpvote) {
            const { vote: newVote } = await getVote();
            setVote(newVote);
            return newVote;
        }
    };

    const handleDownvote = async () => {
        if (canDownvote) {
            setDisabled(true);
            const { vote: newVote } = await updateVote({ operation: 'downvote' });
            if (newVote !== undefined) setVote(newVote);
            setDisabled(false);
        }
    };

    const handleUpvote = async () => {
        if (level >= 2) {
            setDisabled(true);
            const { vote: newVote } = await updateVote({ operation: 'upvote' });
            if (newVote !== undefined) setVote(newVote);
            setDisabled(false);
        }
    };

    useEffect(() => {
        const doLoadVote = async () => setOriginal(await loadVote());
        doLoadVote();
    }, []);

    return VoteControl({
        canDownvote,
        canUpvote,
        disabled,
        downvotes: downvotes + (vote === 'downvoted') - (original === 'downvoted'),
        handleDownvote,
        handleUpvote,
        orientation,
        upvotes: upvotes + (vote === 'upvoted') - (original === 'upvoted'),
        vote,
    });
}
