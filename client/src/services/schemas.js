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
        .min(4, 'Username must be between 4 and 16 characters')
        .max(16, 'Username must be between 4 and 16 characters')
        .matches(/^[\w-]+$/, 'Username cannot contain special characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email')
        .min(4, 'Email must be between 4 and 75 characters')
        .max(75, 'Email must be between 4 and 75 characters'),
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

const questionSchema = Yup.object({
    title: Yup.string()
        .max(150, 'Title cannot be longer then 150 characters.')
        .required('A title is required.'),
    text: Yup.string()
        .max(3000, 'Body cannot be longer than 3000 characters')
        .required('A body is required'),
});

export {
    registerSchema,
    loginSchema,
    recoverSchema,
    resetSchema,
    mailSchema,
    questionSchema,
};
