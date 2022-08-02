import { useQuestion } from 'contexts';
import { Question } from 'components/QAComponents';

export default function QuestionController() {
    const { questionData } = useQuestion();

    return !questionData.loading && <Question questionData={questionData} />;
}
