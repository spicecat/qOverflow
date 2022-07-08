import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoginController } from '../controllers';

export default function Login() {
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
                        <LoginController />
                        <Typography variant='body1'>
                            Forgot your password?{' '}
                            <Link to='/users/recover'>Recover Password</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
}
