const db = require('../../db');
const Img = require('../../Img');
const { BadRequestApiError } = require('../../validators/errors/ApiError');

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

        return res.json(imgFile.toPublicJSON());
    } catch (err) {
        return next(err);
    }
};