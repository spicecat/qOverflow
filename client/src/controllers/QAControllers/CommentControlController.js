import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CommentControl } from 'components/QAComponents';
import { commentFields } from 'services/fields';
import { commentSchema } from 'services/schemas';

export default function CommentControlController({ postComment, canComment }) {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    };

    const closeAfterSubmit = async (data) => {
        await postComment(data);

        toggleShow();
    };

    return CommentControl({
        commentFields,
        commentSchema,
        postComment: closeAfterSubmit,
        show,
        toggleShow,
        canComment,
    });
}
