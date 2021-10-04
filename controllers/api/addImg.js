const db = require('../../db');
const Img = require('../../Img');
const { BadRequestApiError } = require('../../validators/errors/ApiError');
const path = require('path')
const fs = require('fs')

module.exports = async(req, res, next) => {
    try {
        const { file } = req;

        if (!file) {
            throw new BadRequestApiError('image should not be empty');
        }

        let filename = file.filename
        let id = filename.split('.')[0];
        const imgFile = new Img(id);

        await db.insert(imgFile, file);

        res.setHeader('Content-type', 'image/jpeg');
        const fileStream = fs.createReadStream(path.resolve(imgFile.toPublicJSON().originalUrl));
        fileStream.pipe(res);
    } catch (err) {
        return next(err);
    }
};