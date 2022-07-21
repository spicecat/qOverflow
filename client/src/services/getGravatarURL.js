const { MD5 } = require('crypto-js');

function getGravatarURL(email) {
    return `https://www.gravatar.com/avatar/${MD5(
        email.toLowerCase().trim()
    )}?d=identicon`;
}

export { getGravatarURL };
