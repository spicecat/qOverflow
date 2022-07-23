const passwordStrength = ({ length }) => {
    if (length <= 10) return 'weak';
    else if (length <= 17) return 'moderate';
    else return 'strong';
};

const answerFields = [{
    id: 'answer',
    title: 'Answer'
}]

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

const commentFields = [{
    id: 'comment',
    label: 'Comment'
}]

const composeMailFields = [
    {
        id: 'receiver',
        label: 'Recipient',
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

const recoverFields = [{
    id: 'username',
    title: 'Username'
}];

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
        label: 'Password',
        type: 'password',
    },
];
const searchFields = [
    {
        id: 'search',
        label: 'search by title',
        type: 'search',
    },
    {
        id: 'body',
        label: 'search by text',
        type: 'search',
    },
    {
        id: 'date',
        label: 'date(MM/DD/YYYY)',
        type: 'search',
    },
    {
        id: 'creator',
        label : 'creator',
        type : 'search'
    }
];

export {
    answerFields,
    askQuestionFields,
    commentFields,
    composeMailFields,
    loginFields,
    registerFields,
    recoverFields,
    resetFields,
    searchFields
};
