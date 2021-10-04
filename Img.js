const path = require('path');

const { imgFolder } = require('./config');
const { writeFile, removeFile } = require('./utils/fs');

module.exports = class Img {
    constructor(id, createdAt = null) {
        this.id = id
        this.createdAt = createdAt || Date.now();
        this.filename = id + '.jpeg'
    }

    async saveOriginal(content) {
        // await writeFile(path.resolve(imgFolder, this.originalFilename), content);
    }

    async removeOriginal() {
        console.log(this.filename)
        console.log(this)
        await removeFile(path.resolve(imgFolder, this.filename));
    }

    toPublicJSON() {
        return {
            id: this.id,
            originalUrl: `db/img/${this.filename}`,
            createdAt: this.createdAt,
        };
    }

    toJSON() {
        return {
            id: this.id,
            createdAt: this.createdAt,
        };
    }
};