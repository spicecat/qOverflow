import { Card, CardContent } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from 'contexts';
import { Inbox } from 'controllers';
import { SendMail } from 'controllers/FormControllers';
import { MdPreview } from 'components';

export default function Mail() {
    const navigate = useNavigate();
    const { userData} = useUser();

    useEffect(() => {
        if (!userData.username) {
            navigate('/users/login', {
                state: {
                    name: 'dashboard',
                    msg: 'You need to be authenticated to access this feature.',
                    prevPath: '/dashboard',
                },
            });
        }
    }, [navigate]);

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
