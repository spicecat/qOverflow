import { Form } from '../controllers'
import { loginSchema } from '../services/schemas'
import CAPTCHA from '../assets/captcha.jpg'

export default function Login() {

    return (
        <>
            <Form validationSchema={loginSchema} />
            <img src={CAPTCHA} alt='CAPTCHA' />
        </>
    )
}