const passwordStrength = ({ length }) => {
    if (length <= 10) return 'weak'
    else if (length <= 17) return 'moderate'
    else return 'strong'
};

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

const registerFields = [
    {
        id: 'username',
        title: 'Username',
    },
    {
        id: 'email',
        title: 'Email',
    },
    {
        id: 'password',
        helperText: value => `Password strength: ${passwordStrength(value)}`,
        title: 'Password',
        type: 'password',
    },
    {
        id: 'captcha',
        title: 'CAPTCHA',
    }
];

const recoverFields = [{ id: 'email', label: 'Email' }];

export { loginFields, registerFields, recoverFields };
