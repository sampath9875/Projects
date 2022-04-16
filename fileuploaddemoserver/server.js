const express = require("express");
const cors = require("cors");
const multer = require("multer");
const IncomingForm = require("formidable").IncomingForm;
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const server = express();

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};

server.use(fileUpload({
    createParentPath: true,
}))
server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/', (req, res) => {
    console.log('Server is running on ${port}')
    res.json({'message': 'Server is Running!'})
})

server.put('/uploadFile', (req, res) => {
    // module.exports = function upload(req, res) {
    // console.log(req)
    console.log('Hello', req.files)
    var form = new IncomingForm();

    form.on("file", (field, file) => {
        file.mv()
    });
    form.on("end", () => {
        res.json();
    });
    form.parse(req);
    // };
})

server.get('/something', (req, res) => {
    console.log('Received at server')
    res.json({'message':'Success!'})
})

server.post('/uploadFilePost', (req, res) => {
    try {
        // console.log(req.body)
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            // console.log(req.files.file);
            let file = req.files.file;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            file.mv('./uploads/' + file.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


server.listen(8000, () => {
    console.log("Server started!");
});