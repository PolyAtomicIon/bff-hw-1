const db = require('../../db');

module.exports = (req, res, next) => {
    const imgId = req.params.id;

    if (db.findOne(imgId) === null) {
        return res.sendStatus(400);
    }

    next();
};