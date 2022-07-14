import { useState } from 'react'
import { VoteControl } from '../components';

export default function VoteControlController({
    downvotes,
    getVote,
    updateVote,
    upvotes,
}) {
    const [vote, setVote] = useState()
    const handleDownvote = () => {
        console.log(-1, 1)
        if (vote === 'downvote') {
            setVote()
            updateVote({ operation: 'decrement', target: 'downvotes' })
        } else {
            setVote('downvote')
            if (vote === 'upvote')
                updateVote({ operation: 'decrement', target: 'upvotes' })
            updateVote({ operation: 'increment', target: 'downvotes' })
        }
    }
    const handleUpvote = () => {
        console.log(-1, 1)
        if (vote === 'upvote') {
            setVote()
            updateVote({ operation: 'decrement', target: 'upvotes' })
        } else {
            setVote('upvote')
            if (vote === 'downvote')
                updateVote({ operation: 'decrement', target: 'downvotes' })
            updateVote({ operation: 'increment', target: 'upvotes' })
        }
    }

    return <VoteControl {...{
        downvotes,
        handleDownvote,
        handleUpvote,
        upvotes,
        vote
    }} />;
}
