import { useQuestion } from '../contexts';
import { VoteControl } from '../components';

export default function QuestionVoteControlController() {
    const { questionData: { downvotes, upvotes, vote } } = useQuestion();

    return <VoteControl {...{
        downvotes,
        upvotes,
        vote
    }} />;
}
