import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useUser } from '../contexts';
import { getMail } from '../services/mailServices';
import { MailUnit } from '../components';

export default function InboxController() {
    const { userData } = useUser();
    const [mail, setMail] = useState([]);

    useEffect(() => {
        const fetchMail = async () => {
            const { success, messages } = await getMail(userData?.username);
            if (success) {
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
