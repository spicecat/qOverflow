import { Card, CardContent } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from 'contexts';
import { AskForm } from 'controllers/FormControllers';
import { MdPreview } from 'components';

export default function Ask() {
    const navigate = useNavigate();
    const { userData: loading } = useUser();

    useEffect(() => {
        if (loading === false) {
            navigate('/users/login', {
                state: {
                    name: 'dashboard',
                    msg: 'You need to be authenticated to access this feature.',
                    prevPath: '/dashboard',
                },
            });
        }
    }, [loading, navigate]);
    
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
