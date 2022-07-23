import { useEffect, useState } from 'react';
import { useUser } from 'contexts';
import { VoteControl } from 'components/QAComponents';

export default function VoteControlController({
    downvotes,
    getVote,
    orientation,
    updateVote,
    upvotes,
}) {
    const { userData: { level } } = useUser();
    const [disabled, setDisabled] = useState()
    const [vote, setVote] = useState()
    const [original, setOriginal] = useState()

    const loadVote = async () => {
        if (level >= 2) {
            const { vote: newVote } = await getVote();
            setVote(newVote);
            return newVote;
        }
    }

    const handleDownvote = async () => {
        if (level >= 4) {
            setDisabled(true);
            const { vote: newVote } = await updateVote({ operation: 'downvote' });
            if (newVote !== undefined)
                setVote(newVote);
            setDisabled(false);
        }
    }

    const handleUpvote = async () => {
        if (level >= 2) {
            setDisabled(true);
            const { vote: newVote } = await updateVote({ operation: 'upvote' });
            if (newVote !== undefined)
                setVote(newVote);
            setDisabled(false);
        }
    }

    useEffect(() => {
        const doLoadVote = async () =>
            setOriginal(await loadVote());
        doLoadVote();
    }, []);

    return downvotes !== undefined && (
        VoteControl({
            disabled,
            downvotes: downvotes + (vote === 'downvoted') - (original === 'downvoted'),
            handleDownvote,
            handleUpvote,
            orientation,
            upvotes: upvotes + (vote === 'upvoted') - (original === 'upvoted'),
            vote
        })
    );
}
