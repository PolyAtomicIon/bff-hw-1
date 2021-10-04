const db = require('../../db');
const path = require('path')
const { imgFolder } = require('../../config');
const { dbFolder } = require('../../config');
const { replaceBackground } = require('backrem');
const fs = require('fs')
const { BadRequestApiError } = require('../../validators/errors/ApiError');

module.exports = async(req, res, next) => {
    try {
        const colors = req.query.color.split(',').map(item => +item)
        const threshold = +req.query.threshold

        const frontImgId = req.query.front;
        const frontImg = await db.findOne(frontImgId)

        const backImgId = req.query.back;
        const backImg = await db.findOne(backImgId)

        if (!backImg || !frontImg) throw new BadRequestApiError('Front or back image id not found');

        const frontFile = fs.createReadStream(
            path.resolve(imgFolder, frontImg.id + '.jpeg')
        );

        const backFile = fs.createReadStream(
            path.resolve(imgFolder, backImg.id + '.jpeg')
        );

        if (!frontFile || !backFile) throw new BadRequestApiError('Front or back image not found');

        replaceBackground(frontFile, backFile, colors, threshold).then(
            (readableStream) => {
                // const writableStream = fs.createWriteStream(
                //     path.resolve(dbFolder, "/result/result.jpg")
                // );

                res.set('content-type', 'image/jpg');
                readableStream.pipe(res);
            }
        );

        return res;
    } catch (err) {
        return next(err);
    }
};