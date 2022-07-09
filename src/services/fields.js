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
        type: 'password',
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

const recoverFields = [{ id: 'username', label: 'Username' }];

const resetFields = [
    {
        id: 'password',
        helperText: (value) => `Password strength: ${passwordStrength(value)}`,
        label: 'Password',
        type: 'password',
    },
];

const composeMailFields = [
    {
        id: 'reciever',
        label: 'To:',
    },
    {
        id: 'subject',
        label: 'Subject:',
    },
    {
        id: 'text',
        label: 'Body',
    },
];

export {
    loginFields,
    registerFields,
    recoverFields,
    resetFields,
    composeMailFields,
};
