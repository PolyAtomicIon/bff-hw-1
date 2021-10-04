const db = require('../../db');

module.exports = async(req, res) => {
    const imgId = req.params.id;
    console.log(imgId)

    const id = await db.remove(imgId);

    return res.json({ id });
};