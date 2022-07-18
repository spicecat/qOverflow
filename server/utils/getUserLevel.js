function getUserLevel(points) {
    switch (points) {
        case points > 10000:
            return 7;
        case points > 3000:
            return 6;
        case points > 1000:
            return 5;
        case points > 125:
            return 4;
        case points > 50:
            return 3;
        case points > 15:
            return 2;
        case points > 0:
            return 1;
        default:
            return 0;
    }
}
