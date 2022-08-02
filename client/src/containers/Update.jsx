import { Card, CardContent, Grid } from '@mui/material';
import { UpdateForm } from 'controllers/FormControllers';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from 'contexts';

export default function Register() {
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
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
            style={{ height: '92vh' }}
        >
            <Grid item xs={3.5} />
            <Grid item xs={5}>
                <Card sx={{ padding: '1vh' }}>
                    <CardContent>
                        <UpdateForm />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
}
