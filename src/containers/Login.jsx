import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, Grid, Typography, Alert } from '@mui/material';
import { LoginForm } from '../controllers';

export default function Login() {
    let location = useLocation();

    function returnMsg(){
        if(location.state){
            return location.state.msg;
        }
    }

    return (
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
            style={{ height: '95vh' }}
        >
            <Grid item xs={3.5} />
            <Grid item xs={5}>
                <Card sx={{ padding: '1vh' }}>
                    <CardContent>
                        <LoginForm />
                        <Typography variant='body1'>
                            Forgot your password?{' '}
                            <Link to='/recover'>Recover Password</Link>
                        </Typography>
                    </CardContent>
                </Card>
                {returnMsg() ? <Alert severity="warning"> {returnMsg()} </Alert> : null }
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
}
