import { useQuestion, useUser } from 'contexts';
import { CreateAnswer } from 'components/QAComponents';

export default function CommentControlController() {
    const { questionData: { status } } = useQuestion();
    const { userData: { level } } = useUser();

    return CreateAnswer({
        canAnswer: level >= 2 && status === 'open'
    });
}
