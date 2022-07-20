import { useState } from 'react';
import { useQuestion, useUser } from 'contexts';
import { CommentControl } from 'components/QAComponents';
import { commentFields } from 'services/fields';
import { commentSchema } from 'services/schemas';
import { postQuestionComment } from 'services/questionsServices';

export default function CommentControlController({ postComment }) {
    const { questionData: { question_id } } = useQuestion();
    const { userData: { username } } = useUser();

    const [show, setShow] = useState(false)

    // const postComment = comment => {

    // }

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        CommentControl({
            commentFields,
            commentSchema,
            postComment,
            show,
            toggleShow
        })
    );
}
