
function getPermissions(questionData, userData, ongoingVote) {
    
    const { creator, status, hasAcceptedAnswer, close, reopen, protect } = questionData;
    const { username } = userData;

    var permissions = {
        canProtect: false,
        canClose: false,
        canAnswer: false,
        canComment: false,
        canAccept: false,
    };

    
    const level = userData.level || 0;
    const protection = status === 'protected' || status === 'closed';

    if (username && status) {
        const ongoingProtect = protect.length > 0;
        const ongoingClose = close.length > 0;
        const ongoingOpen= reopen.length > 0;

        if (userData.username === creator && !hasAcceptedAnswer) {
            permissions.canAccept = true;
        }

        if (level >= 7 && ongoingVote.type !== 'protect' && !ongoingProtect) {
            permissions.canClose = true;
        }

        if (level >= 6 && ongoingVote.type !== 'close' && !protection && !ongoingClose) {
            permissions.canProtect = true;
        }

        if (
            status !== 'closed' &&
            ((level >= 3 && status !== 'protected') ||
                (level >= 5 && status === 'protected') ||
                username === creator)
        ) {
            permissions.canComment = true;
        }

        if (
            status !== 'closed' &&
            ((level >= 1 && status !== 'protected') ||
                (level >= 5 && status === 'protected') ||
                username === creator)
        ) {
            permissions.canAnswer = true;
        }
    }

    return permissions;
}

module.exports = getPermissions;
