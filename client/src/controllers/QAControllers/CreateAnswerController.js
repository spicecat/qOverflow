import {useState} from 'react';

import { useQuestion, useUser } from 'contexts';
import { CreateAnswer } from 'components/QAComponents';

export default function CommentControlController() {
    const { questionData: { status } } = useQuestion();
    const { userData: { level } } = useUser();

    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    };

    return CreateAnswer({
        canAnswer: level >= 2 && status === 'open',
        show,
        toggleShow,
    });
}
