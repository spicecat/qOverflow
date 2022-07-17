import { useEffect, useState } from 'react';
import { useUser } from '../contexts';
import { VoteControl } from '../components/QAComponents';

export default function VoteControlController({
    downvotes,
    getVote,
    orientation,
    updateVote,
    upvotes,
}) {
    const { userData: { username } } = useUser();
    const [vote, setVote] = useState()
    const [original, setOriginal] = useState()

    const loadVote = async () => {
        const { success, vote: newVote } = await getVote(username);
        if (success)
            setVote(newVote || 'none');
        return newVote;
    }

    const handleDownvote = async () => {
        if (vote === 'downvoted')
            await updateVote(username, { operation: 'decrement', target: 'downvotes' });
        else {
            if (vote === 'upvoted')
                await updateVote(username, { operation: 'decrement', target: 'upvotes' });
            await updateVote(username, { operation: 'increment', target: 'downvotes' });
        }
        await loadVote();
    }
    const handleUpvote = async () => {
        if (vote === 'upvoted')
            await updateVote(username, { operation: 'decrement', target: 'upvotes' });
        else {
            if (vote === 'downvoted')
                await updateVote(username, { operation: 'decrement', target: 'downvotes' });
            await updateVote(username, { operation: 'increment', target: 'upvotes' });
        }
        await loadVote();
    }

    useEffect(() => {
        const doLoadVote = async () =>
            setOriginal(await loadVote());
        doLoadVote();
    }, []);

    return downvotes !== undefined && (
        <VoteControl {...{
            downvotes: downvotes + (vote === 'downvoted') - (original === 'downvoted'),
            handleDownvote,
            handleUpvote,
            orientation,
            upvotes: upvotes + (vote === 'upvoted') - (original === 'upvoted'),
            vote
        }} />
    );
}
