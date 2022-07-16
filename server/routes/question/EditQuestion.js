async function EditQuestion(req, res, next) {
    const user = req.user;
    const { token, ...body } = req.body;
    const { questionID } = req.params;

    const { success } = await createRequest(
        'patch',
        `/questions/${questionID}`,
        body
    );

    return success ? res.send() : res.status(500).send('Something went wrong.');
}

module.exports = EditQuestion;
