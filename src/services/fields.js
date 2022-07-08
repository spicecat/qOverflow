const loginFields = [
    {
        id: 'username',
        label: 'Username',
    },
    {
        id: 'password',
        label: 'Password',
    },
];

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
        type: 'password',
    },
    {
        id: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
    },
];

const recoverFields = [{ id: 'email', label: 'Email' }];

export { loginFields, signupFields, recoverFields };
