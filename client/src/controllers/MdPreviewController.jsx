import { useState } from 'react';

import { MdPreview } from 'components';
import { useForm } from 'contexts';

export default function MdPreviewController() {
    const [show, setShow] = useState(false);
    const { content } = useForm();

    const toggleShow = () => setShow((initial) => !initial);

    return <MdPreview {...{ show, toggleShow, content }} />;
}
