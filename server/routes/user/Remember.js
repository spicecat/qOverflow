async function Remember(req, res) {
    const user = req.user;

    return res.send({ user });
}

module.exports = Remember;
