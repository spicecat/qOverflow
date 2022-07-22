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
    const { userData: { level, username } } = useUser();
    const [vote, setVote] = useState()
    const [original, setOriginal] = useState()

    const loadVote = async () => {
        if (level >= 2) {
            const { success, vote: newVote } = await getVote(username);
            if (success)
                setVote(newVote || 'none');
            return newVote;
        }
    }

    const handleDownvote = async () => {
        if (level >= 2) {
            if (vote === 'downvoted')
                await updateVote(username, { operation: 'decrement' });
            else {
                if (vote === 'upvoted')
                    await updateVote(username, { operation: 'decrement' });
                await updateVote(username, { operation: 'increment' });
            }
            await loadVote();
        }
    }
    const handleUpvote = async () => {
        if (level >= 2) {
            if (vote === 'upvoted')
                await updateVote(username, { operation: 'decrement' });
            else {
                if (vote === 'downvoted')
                    await updateVote(username, { operation: 'decrement' });
                await updateVote(username, { operation: 'increment' });
            }
            await loadVote();
        }
    }

    useEffect(() => {
        const doLoadVote = async () =>
            setOriginal(await loadVote());
        doLoadVote();
    }, []);

    return downvotes !== undefined && (
        VoteControl({
            downvotes: downvotes + (vote === 'downvoted') - (original === 'downvoted'),
            handleDownvote,
            handleUpvote,
            orientation,
            upvotes: upvotes + (vote === 'upvoted') - (original === 'upvoted'),
            vote
        })
    );
}
