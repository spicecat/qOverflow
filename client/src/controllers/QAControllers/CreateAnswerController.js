import { useState } from 'react';

import { CreateAnswer } from 'components/QAComponents';
import { useQuestion, useUser } from 'contexts';

export default function CreateAnswerController() {
    const {
        questionData: { status },
    } = useQuestion();
    const {
        userData: { level },
    } = useUser();

    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    };

    return CreateAnswer({
        canAnswer: (level >= 2 && status === 'open') || (status === 'protected' && level >= 5),
        show,
        toggleShow,
    });
}
