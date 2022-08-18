function calculateUserBadges(points) {
    let badges = [];

    if (points >= 10000) {
        badges.push('Socratic');
    }
    if (points >= 3000) {
        badges.push('Inquisitive');
    }
    if (points >= 100) {
        badges.push('Curious');
    }

    return badges;
}

module.exports = calculateUserBadges;
