import { Link } from 'react-router-dom';

import { Card, CardContent, Grid, Typography } from '@mui/material';

import { useUser } from '../contexts';
import { FormController } from '../controllers';
import { loginFields } from '../services/fields';
import { loginSchema } from '../services/schemas';

export default function Login() {
    const { login } = useUser();

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
                        <FormController
                            fields={loginFields}
                            onSubmit={login}
                            validationSchema={loginSchema}
                        />
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
