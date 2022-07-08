import { Grid, Card, CardContent } from '@mui/material';
import { FormController } from '../controllers';
import { signupSchema } from '../services/schemas';
import CAPTCHA from '../assets/captcha.jpg';

const signupFields = [
    {
        id: 'username',
        title: 'Username',
    },
    {
        id: 'email',
        title: 'Email',
    },
    {
        id: 'password',
        title: 'Password',
        type: 'password',
    },
    {
        id: 'confirmPassword',
        title: 'Confirm Password',
        type: 'password',
    },
    {
        id: 'captcha',
        title: 'CAPTCHA',
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
                        validationSchema={signupSchema}
                    />
                    <div>
                        <img src={CAPTCHA} alt='CAPTCHA' />
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}
