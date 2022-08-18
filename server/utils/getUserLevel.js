function getUserLevel(points) {
    if (points > 10000) return 9;
    else if (points > 3000) return 8;
    else if (points > 2000) return 7;
    else if (points > 1000) return 6;
    else if (points > 125) return 5;
    else if (points > 75) return 4;
    else if (points > 50) return 3;
    else if (points > 15) return 2;
    else if (points > 0) return 1;
    else return 0;
}

module.exports = getUserLevel;
