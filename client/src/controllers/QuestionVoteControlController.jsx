import { useQuestion } from '../contexts';
import { VoteControl } from '../components';

export default function QuestionVoteControlController() {
    const { downvoteQuestion, upvoteQuestion, questionData: { downvotes, upvotes, vote } } = useQuestion();

    return <VoteControl {...{
        downvote: downvoteQuestion,
        downvotes,
        upvote: upvoteQuestion,
        upvotes,
        vote
    }} />;
}
