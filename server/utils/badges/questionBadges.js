function calculateQuestionBadges(points) {
    let badges = [];

    if (points >= 100) {
        badges.push('Great Question');
    }
    if (points >= 25) {
        badges.push('Good Question');
    }
    if (points >= 10) {
        badges.push('Nice Question');
    }

    return badges;
}

module.exports = calculateQuestionBadges;
