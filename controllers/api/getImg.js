const db = require('../../db');
const path = require('path')
const fs = require('fs')

module.exports = async(req, res) => {
    const imgId = req.params.id;

    let { originalUrl } = db.findOne(imgId).toPublicJSON();

    res.setHeader('Content-type', 'image/jpeg');
    const fileStream = fs.createReadStream(path.resolve(originalUrl));
    fileStream.pipe(res);
};