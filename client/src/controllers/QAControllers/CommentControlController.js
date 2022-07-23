import { useState } from 'react';
import { CommentControl } from 'components/QAComponents';
import { commentFields } from 'services/fields';
import { commentSchema } from 'services/schemas';

export default function CommentControlController({ postComment }) {
    const [show, setShow] = useState(false)

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
