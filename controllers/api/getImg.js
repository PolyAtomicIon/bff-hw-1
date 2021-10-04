const db = require('../../db');
const path = require('path')

module.exports = async(req, res) => {
    const imgId = req.params.id;

    let { originalUrl } = await db.findOne(imgId).toPublicJSON();

    res.set('content-type', 'image/*');
    return res.download(path.resolve(originalUrl));
};