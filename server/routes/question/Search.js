const config = require('../../config.json');

const Question = require('../../db/models/Question');

async function Search(req, res) {
    const { creator, title, text, tags, createdAt, sort } = req.query;

    let searchQuery = {};
    if (creator) {
        searchQuery['creator'] = {
            $regex: creator,
        };
    }
    if (title) {
        searchQuery['title'] = {
            $regex: title,
        };
    }
    if (text) {
        searchQuery['text'] = {
            $regex: text,
        };
    }
    if (tags) {
        searchQuery['tags'] = { $all: tags };
    }
    if (createdAt) {
        searchQuery['createdAt'] = createdAt;
    }

    let sortQuery = [[createdAt, 'desc']];
    switch (sort) {
        case 'u':
            sortQuery = [['upvotes', 'desc']];
            break;
        case 'uvc':
            sortQuery = [
                ['upvotes', 'desc'],
                ['view', 'desc'],
                ['comments', 'desc'],
            ];
            break;
        case 'uvac':
            sortQuery = [
                ['upvotes', 'desc'],
                ['view', 'desc'],
                ['answers', 'desc'],
                ['comments', 'desc'],
            ];
            searchQuery['hasAcceptedAnswer'] = false;
            break;
    }

    const questions = await Question.find(searchQuery).sort(sortQuery);

    return res.send({ questions });
}

module.exports = Search;
