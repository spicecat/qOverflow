const config = require('server/config.json');

const Question = require('server/db/models/Question');

async function Search(req, res) {
    const { creator, title, text, tags, createdAt } = req.query;

    console.log(req.query);

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

    const questions = await Question.find(searchQuery).sort({ createdAt: 'asc' });

    return res.send({ questions });
}

module.exports = Search;
