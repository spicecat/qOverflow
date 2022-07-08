const passwordStrength = ({ length }) => {
    if (length <= 10) return 'weak';
    else if (length <= 17) return 'moderate';
    else return 'strong';
};

const loginFields = [
    {
        id: 'username',
        title: 'Username',
    },
    {
        id: 'password',
        title: 'Password',
    },
];

const registerFields = [
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
        helperText: (value) => `Password strength: ${passwordStrength(value)}`,
        label: 'Password',
        type: 'password',
    },
    {
        id: 'captcha',
        label: 'CAPTCHA',
    },
];

const recoverFields = [{ id: 'email', label: 'Email' }];

export { loginFields, registerFields, recoverFields };
