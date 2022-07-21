import { Card, CardContent } from '@mui/material';
import { AskForm } from '../controllers/FormControllers';
import { MdPreview } from 'components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from 'contexts';

export default function Ask() {
    const navigate = useNavigate();
    const { userData } = useUser();

    useEffect(() => {
        if (checkAuth()) {
            navigate('/users/login', {
                state: {
                    name: 'Ask',
                    msg: 'You need to be authenticated to access this feature.',
                    prevPath: '/questions/ask',
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
        <div>
            <Card>
                <CardContent>
                    <AskForm></AskForm>
                    <MdPreview />
                </CardContent>
            </Card>
        </div>
    );
}
