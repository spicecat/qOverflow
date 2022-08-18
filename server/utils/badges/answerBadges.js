function calculateAnswerBadges(points) {
    let badges = [];

    if (points >= 100) {
        badges.push('Great Answer');
    }
    if (points >= 25) {
        badges.push('Good Answer');
    }
    if (points >= 10) {
        badges.push('Nice Answer');
    }

    return badges;
}

module.exports = calculateAnswerBadges;
