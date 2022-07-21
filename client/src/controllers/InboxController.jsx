import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useError } from 'contexts';
import { getMail } from 'services/mailServices';
import { MailUnit } from 'components';

export default function InboxController() {
    const { setError } = useError();
    const [mail, setMail] = useState([]);

    const fetchMail = async () => {
        const req = await getMail();

        if (req.error) {
            setError(() => req.error);
        } else {
            setMail(() => req.messages);
        }
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
