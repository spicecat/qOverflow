import { Card, CardContent } from '@mui/material';
import React, { useEffect } from 'react';
import { SendMail } from 'controllers/FormControllers';
import { Inbox } from 'controllers';
import { MdPreview } from 'components';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'contexts';

export default function Mail() {
    const navigate = useNavigate();
    const { userData } = useUser();

    useEffect(() => {
        if (checkAuth()) {
            navigate('/users/login', {
                state: {
                    name: 'mail',
                    msg: 'You need to be authenticated to access this feature.',
                    prevPath: '/mail',
                },
            });
        }
    }, []);

    function checkAuth() {
        if (!userData.username) {
            return true;
        }
    }

    return (
        <Card>
            <CardContent>
                <SendMail />
                <MdPreview />
            </CardContent>
            <CardContent>
                <Inbox />
            </CardContent>
        </Card>
    );
}
