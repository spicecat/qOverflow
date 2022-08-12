import { Card, CardContent } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Inbox, MdPreview } from 'controllers';
import { SendMail } from 'controllers/FormControllers';

export default function Mail() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
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
