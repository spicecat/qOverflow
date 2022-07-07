import { Grid, Box, Card, CardContent } from '@mui/material'
import { Form } from '../controllers'
import { signupSchema } from '../services/schemas'
import CAPTCHA from '../assets/captcha.jpg'

const signupFields = [
    {
        id: 'username',
        label: 'Username',
    },
    {
        id: 'email',
        label: 'Email',
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password'
    },
    {
        id: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password'
    }
]

export default function Signup() {
    return (
        <Grid
            container
            className='centered'
        >
            <Card>
                <CardContent>
                    <Form fields={signupFields} validationSchema={signupSchema} />
                    <div>
                        <img src={CAPTCHA} alt='CAPTCHA' />
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}