import { useForm } from 'contexts';
import { useState } from 'react';
import { MdPreview } from 'components';

export default function MdPreviewController() {
    const [show, setShow] = useState(false);
    const { content } = useForm();

    const toggleShow = () => setShow((initial) => !initial);

    return <MdPreview {...{ show, toggleShow, content }} />;
}
