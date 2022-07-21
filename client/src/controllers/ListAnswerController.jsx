import { useEffect } from 'react';
import { getQuestion } from 'services/questionsServices';
import { ListAnswer } from 'components';

export default function ListAnswerController({ data }) {
    useEffect(() => {
        const request = getQuestion(data.questionID);
        if (request.error) {
            data.question = {};
        } else {
            data.question = request.question;
        }
    }, []);

    return <ListAnswer data={data} />;
}
