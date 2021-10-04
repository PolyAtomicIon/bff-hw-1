const db = require('../../db');

module.exports = (req, res) => {
    const allimgs = db.find().map(item => ({ "id": item.id }))
    return res.json(allimgs);
};