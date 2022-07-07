import { Form } from '../controllers'
import { loginSchema } from '../services/schemas'

export default function Login() {

    return (
        <>
            <Form validationSchema={loginSchema} />
            
        </>
    )
}