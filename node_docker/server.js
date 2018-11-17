'use strict';
const formidable = require('formidable');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Functions
function checkFormat(fileName) {
    const fileSplit = fileName.split('.');
    return fileSplit[fileSplit.length - 1] !== 'torrent';
}

function writeFile(endPath, files, res) {
    const oldpath = files.file.path;
    const newpath = `W:/upload_file/upload${endPath}` + files.file.name;
    // var newpath = '/uploads/' + files.file.name;

    const upStream = fs.createWriteStream(newpath);

    upStream.on('close', function (err) {
        if (err) throw err;
        // Remove old file
        fs.unlinkSync(oldpath);
        res.write('File uploaded and moved!');
        res.end();
    });

    //Copy file
    fs.createReadStream(oldpath).pipe(upStream);
}

function saveFileName(endPath, mailFile, fileName) {
    fs.appendFileSync(`W:/upload_file/upload${endPath}${mailFile}`, `${fileName}\r\n`);
}

// App
const app = express();

app.post('/upMovie', cors(), (req, res) => {
    // create an incoming form object
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        if (checkFormat(files.file.name)) {
            res.status(406).send('Format error');
        } else {
            const endPath = '/film/';
            saveFileName(endPath, 'mail_movie_files.txt', files.file.name);
            writeFile(endPath, files, res);
        }
    });
});

app.post('/upTVShow', cors(), (req, res) => {
// create an incoming form object
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        if (checkFormat(files.file.name)) {
            res.status(406).send('Format error');
        } else {
            const endPath = '/serie/';
            saveFileName(endPath, 'mail_tv_show_files.txt', files.file.name);
            writeFile(endPath, files, res);
        }
    });
});

app.post('/upOther', cors(), (req, res) => {
// create an incoming form object
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        if (checkFormat(files.file.name)) {
            res.status(406).send('Format error');
        } else {
            const endPath = '/other/';
            writeFile(endPath, files, res);
        }
    });
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
