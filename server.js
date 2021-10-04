const http = require('http');
const express = require('express');
const { PORT } = require('./config');
const { imgFolder } = require('./config')
const multer = require('multer');
const controller = require('./controllers/api')
const { generateId } = require('./utils/generateId')

const upload = multer.diskStorage({
    destination: imgFolder,
    filename: function(req, file, callback) {
        let id = generateId();
        let name = id + '.jpeg';

        callback(null, name);
    },
});


const app = express();

app.post('/upload', multer({ storage: upload }).single('image'), controller.addImg);
app.get('/list', controller.getImgs);
app.get('/image/:id', controller.getImg);
app.delete('/image/:id', controller.deleteImg);
app.get('/merge', controller.merge);

app.use(function(err, req, res, next) {
    res.status(500).send(err.message);
})

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});