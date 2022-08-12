import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { MailUnit } from 'components';
import { getMail } from 'services/mailServices';

export default function InboxController() {
    const [mail, setMail] = useState([]);

    const fetchMail = async () => {
        const { messages } = await getMail();
        setMail(messages);
    };

    useEffect(() => {
        fetchMail();
    }, []);

    return (
        <Box>
            {mail.map((message) => (
                <MailUnit {...message} key={message.id} />
            ))}
        </Box>
    );
}
