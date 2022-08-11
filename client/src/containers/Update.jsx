import { Card, CardContent, Grid } from '@mui/material';
import { UpdateForm } from 'controllers/FormControllers';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Register() {
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('token')) {
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
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
            style={{ height: '92vh' }}
        >
            <Grid item xs />
            <Grid item xs={11} sm={7} md={5}>
                <Card sx={{ padding: '1vh' }}>
                    <CardContent>
                        <UpdateForm />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs />
        </Grid>
    );
}
