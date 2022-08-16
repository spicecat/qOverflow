const config = require('../../config.json');
const { getQuestion, refreshQuestion } = require('../../utils/question');
const createRequest = require('../../utils/api');

async function EditQuestion(req, res) {
    const { user } = req;
    const { text } = req.body;
    const { views } = req.body;
    const { question_id } = req.params;

    if (views) {
        const { success } = await createRequest('patch', `/questions/${question_id}`, { views });

        if (!success) return res.status(500).send(config.errorGeneric);

        await refreshQuestion(question_id);

        return res.sendStatus(200);
    }
    if (!text) return res.status(400).send(config.errorIncomplete);

    // Verify user owns question
    const question = await getQuestion(question_id);
    if (!question) return res.status(404).send(config.errorNotFound);
    if (question.creator !== user.username) return res.status(403).send(config.errorForbidden);

    // Patch question with BDPA ../..
    const { success } = await createRequest('patch', `/questions/${question_id}`, { text });

    if (!success) return res.status(500).send(config.errorGeneric);

    await refreshQuestion(question_id);

    return res.sendStatus(200);
}

module.exports = EditQuestion;
