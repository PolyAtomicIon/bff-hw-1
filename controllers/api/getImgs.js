const db = require('../../db');

module.exports = (req, res) => {
    const allimgs = db.find().map((img) => img.toPublicJSON());

    return res.json({ allimgs });
};