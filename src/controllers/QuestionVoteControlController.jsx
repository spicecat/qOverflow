import { useQuestion } from '../contexts';
import { VoteControl } from '../components';

export default function QuestionVoteControlController() {
    const {
        getQuestionVoteStatus,
        questionData: { downvotes, upvotes }
    } = useQuestion();

    return <VoteControl {...{
        downvotes,
        upvotes,
        vote: getQuestionVoteStatus()
    }} />;
}
