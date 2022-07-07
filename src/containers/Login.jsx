import { Form } from '../controllers'
import { loginSchema } from '../services/schemas'

const fields = [
    {
        id: 'username',
        label: 'Username',
    },
    {
        id: 'password',
        label: 'Password',
    }
]

export default function Login() {


    return (
        <>
            {/* <Form validationSchema={loginSchema} /> */}
        </>
    )
}