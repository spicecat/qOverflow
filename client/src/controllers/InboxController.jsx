import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getMail } from 'services/mailServices';
import { MailUnit } from 'components';

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
