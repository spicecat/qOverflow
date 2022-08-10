import { Card, CardContent } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AskForm } from 'controllers/FormControllers';
import { MdPreview } from 'components';
import Cookies from 'js-cookie';

export default function Ask() {
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
        <div>
            <Card>
                <CardContent>
                    <AskForm />
                    <MdPreview />
                </CardContent>
            </Card>
        </div>
    );
}
