import { Alert, Card, CardContent, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';

import { LoginForm } from 'controllers/FormControllers';

export default function Login() {
    let location = useLocation();

    function returnMsg() {
        return location.state?.msg;
    }

    return (
        <>
            <Helmet>
                <title>Log In - qOverflow</title>
            </Helmet>
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
                            <LoginForm />
                            <Typography variant='body1'>
                                Forgot your password?{' '}
                                <Link to='/users/recover'>Recover Password</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                    {returnMsg() && <Alert severity='warning'> {returnMsg()} </Alert>}
                </Grid>
                <Grid item xs />
            </Grid>
        </>
    );
}
