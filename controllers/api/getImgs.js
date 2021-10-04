const db = require('../../db');

module.exports = (req, res) => {
    const allimgs = db.find()
    return res.json(allimgs);
};