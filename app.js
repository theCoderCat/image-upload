var express = require('express');
var multer = require('multer');
var app = express();
const fs = require('fs');



var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        console.log(file);
        callback(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({
    storage: storage
}).single('image');

app.get('/', function(req, res) {
    res.send('Hello World!');
});
app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        console.log(req.file);
        if (err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.end("url: http://localhost:3000/images/" + req.file.filename);
    });
});
app.get('/images/:filename', function(req, res) {
    var filename = req.params.filename;
    res.sendFile('./uploads/' + filename);
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});