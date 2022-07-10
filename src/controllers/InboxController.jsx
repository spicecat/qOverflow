import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useUser } from '../contexts';
import { getMail } from '../services/mailServices';
import { MailUnit } from '../components';

export default function InboxController() {
    const { userData } = useUser();
    const [mail, setMail] = useState([]);

    useEffect(() => {
        async function fetchMail() {
            const { messages } = await getMail(userData?.username);

            if (messages) {
                setMail(() => messages);
            }
        }

        fetchMail();
    }, []);

    return (
        <Box>
            {mail.map((message) => (
                <MailUnit {...message} />
            ))}
        </Box>
    );
}
