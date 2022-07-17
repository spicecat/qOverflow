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
        title: 'Username',
        
    },
    {
        id: 'email',
        title: 'Email',
    },
    {
        id: 'password',
        helperText: (value) => `Password strength: ${passwordStrength(value)}`,
        title: 'Password',
        type: 'password',
    },
    {
        id: 'captcha',
        title: 'CAPTCHA',
    },
];

const recoverFields = [{ id: 'username', title: 'Username' }];

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

const askQuestionFields = [
    {
        id: 'title',
        label: 'Title',
    },
    {
        id: 'text',
        label: 'Text',
        multiline: true
    }
   
];

export {
    loginFields,
    registerFields,
    recoverFields,
    resetFields,
    composeMailFields,
    askQuestionFields,
};
