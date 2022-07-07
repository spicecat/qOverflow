import { Paper } from '@mui/material'
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
        <>
            <Form fields={signupFields} validationSchema={signupSchema} />
            <img src={CAPTCHA} alt='CAPTCHA' />
        </>
    )
}