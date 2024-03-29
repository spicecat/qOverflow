const passwordStrength = ({ length }) => {
    if (length <= 10) return 'weak';
    else if (length <= 17) return 'moderate';
    else return 'strong';
};

const answerFields = [
    {
        id: 'text',
        label: 'Answer',
        multiline: true,
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
        multiline: true,
    },
    { id: 'tags', label: 'Tags' },
];

const commentFields = [
    {
        id: 'text',
        label: 'Comment',
        multiline: true,
    },
];

const composeMailFields = [
    {
        id: 'receiver',
        label: 'Recipient',
    },
    {
        id: 'subject',
        label: 'Subject',
    },
    {
        id: 'text',
        label: 'Body',
        multiline: true,
    },
];

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

const recoverFields = [
    {
        id: 'username',
        title: 'Username',
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

const resetFields = [
    {
        id: 'password',
        helperText: (value) => `Password strength: ${passwordStrength(value)}`,
        title: 'Password',
        type: 'password',
    },
];

const patchFields = [
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
];

const searchFields = [
    {
        id: 'title',
        label: 'Title',
    },
    {
        id: 'text',
        label: 'Text',
    },
    {
        id: 'createdAt',
        type: 'date',
    },
    {
        id: 'creator',
        label: 'Creator',
    },
    { id: 'tags', label: 'Tags (separated by spaces)' },
];

const generateEditFields =
    
   [
        {
            id: 'etitle',
            label: 'Title',
            
        },
        {
            id: 'etext',
            label: 'Text',
            multiline: true,
            
        },
    ]

export {
    answerFields,
    askQuestionFields,
    commentFields,
    composeMailFields,
    loginFields,
    patchFields,
    registerFields,
    recoverFields,
    resetFields,
    searchFields,
    generateEditFields
};
