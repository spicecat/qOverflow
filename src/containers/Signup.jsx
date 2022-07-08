import { Box, Paper } from '@mui/material'
import { Form } from '../components'
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
        <Box
            sx={{
                display: 'flex',
                '& > :not(style)': {
                    m: 1,
                    width: 128,
                    height: 128,
                },
            }}
        >
            <Paper className='paper' elevation={1}>
                <Form fields={signupFields} validationSchema={signupSchema} />
                <img src={CAPTCHA} alt='CAPTCHA' />
            </Paper>
        </Box>
    )
}