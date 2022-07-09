import * as Yup from 'yup';

const recoverSchema = Yup.object({
    username: Yup.string().required('Username is required'),
});

const loginSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const registerSchema = Yup.object({
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
        .min(11, 'Password must be at least 11 characters')
        .required('Password is required'),
    captcha: Yup.string()
        .required('CAPTCHA is required')
        .oneOf(['4'], 'Invalid CAPTCHA'),
});

const resetSchema = Yup.object({
    password: Yup.string()
        .min(11, 'Password must be at least 11 characters')
        .required('Password is required'),
});

const mailSchema = Yup.object({
    reciever: Yup.string().required('Reciever is required.'),
    subject: Yup.string().required('Subject is required.'),
    text: Yup.string('Body is required').max(
        150,
        'The message cannot be longer than 150 characters.'
    ),
});

export { registerSchema, loginSchema, recoverSchema, resetSchema, mailSchema };
