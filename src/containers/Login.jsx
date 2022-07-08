import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormController } from '../controllers';
import { loginSchema } from '../services/schemas';

const signupFields = [
    {
        id: 'username',
        title: 'Username',
    },
    {
        id: 'password',
        title: 'Password',
        type: 'password',
    },
];

export default function Signup() {
    return (
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
            style={{ height: '95vh' }}
        >
            <Card sx={{ padding: '1vh' }}>
                <CardContent>
                    <FormController
                        fields={signupFields}
                        onSubmit={(e) => console.log(e, 123)}
                        validationSchema={loginSchema}
                    />
                    <Typography variant='body1'>
                        Dont have an account?{' '}
                        <Link to='/register'>Register</Link>
                    </Typography>
                    <Typography variant='body1'>
                        Forgot your password?{' '}
                        <Link to='/users/recover'>Recover Password</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}
