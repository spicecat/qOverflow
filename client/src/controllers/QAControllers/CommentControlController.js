import { useState } from 'react';

import { useQuestion, useUser } from 'contexts';
import { CommentControl } from 'components/QAComponents';
import { commentFields } from 'services/fields';
import { commentSchema } from 'services/schemas';

export default function CommentControlController({ postComment, canComment }) {
    const { questionData: { status } } = useQuestion();
    const { userData: { level } } = useUser();

    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    };

    return CommentControl({
        commentFields,
        commentSchema,
        postComment,
        show,
        toggleShow,
        canComment,
    });
}
