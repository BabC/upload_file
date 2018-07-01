'use strict';
const formidable = require('formidable');
const fs = require('fs');
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
    app.get('/', (req, res) => {
        res.send('Hello world\n');
});

app.post('/up',(req,res)=>{
// create an incoming form object
var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        var oldpath = files.file.path;
        var newpath = './uploads/' + files.file.name;

        var upStream = fs.createWriteStream(newpath);

        upStream.on('close', function(err) {
            if (err) throw err; 
            // Remove old file
            fs.unlinkSync(oldpath);
            res.write('File uploaded and moved!');
            res.end();  
        });

        //Copy file
        fs.createReadStream(oldpath).pipe(upStream);
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
