import { Grid, Box, Card, CardContent } from '@mui/material';
import { Form } from '../controllers';
import { signupSchema } from '../services/schemas';
import CAPTCHA from '../../public/captcha.jpg';

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
        <Grid container className='centered'>
            <Card>
                <CardContent>
                    <Form
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
