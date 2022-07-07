import * as Yup from 'yup'

const passwordStrength = ({ length }) => {
    if (length <= 10) return 'weak'
    else if (length <= 17) return 'moderate'
    else return 'strong'
}

const signupSchema = Yup.object({
    username: Yup.string()
        .required('Username is required')
        .min(5, 'Username must be between 5 and 20 characters')
        .max(20, 'Username must be between 5 and 20 characters')
        .matches(/^[\w-]+$/, 'Username cannot contain special characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email')
        .min(5, 'Email must be between 5 and 50 characters')
        .max(50, 'Email must be between 5 and 50 characters'),
    password: Yup.string()
        .min(11, 'Password strength: weak')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    captcha: Yup.string()
        .required('CAPTCHA is required')
        .oneOf(['4'], 'Invalid CAPTCHA')
})


const loginSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
})

export { passwordStrength, signupSchema, loginSchema }