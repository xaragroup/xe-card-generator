const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/static'));



app.get('/', (req, res) => {
    let resources = __dirname + "/resources";
    let backgrounds = resources + "/backgrounds/";
    let cards = resources + "/cards/";

    var bgFiles = fs.readdirSync(backgrounds);
    //console.log(bgFiles)
    bgFiles.forEach(file => {
        fs.writeFileSync(__dirname + "/static/" + file, fs.readFileSync(backgrounds + file));
    })

    var cardFiles = fs.readdirSync(cards);
    //console.log(cardFiles)
    cardFiles.forEach(file => {
        fs.writeFileSync(__dirname + "/static/" + file, fs.readFileSync(cards + file));
    })
    let { generateInputPage } = require("./inputPage.js");
    var src = generateInputPage(bgFiles, cardFiles);


    //res.sendFile(__dirname + '/inputPage.html');
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(src);
    res.end();




    /* FOLDER STRUCTURE!!
    let source = __dirname + "/backgrounds/";
    
    const { lstatSync, readdirSync } = require('fs');
    const { join } = require('path');
    console.log(__dirname)
    console.log(source)
    const isDirectory = source => lstatSync(source).isDirectory() //check if its a dir
    const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)
    
    var dir = getDirectories(source);
    console.log(dir)
*/

});







/*
app.get('/*', (req, res) => {
    res.sendFile(__dirname + req.originalUrl);
})
*/

app.post('/fileupload', (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        console.log(fields);

        const uniq = makeid();
         //handle the logo
        if (files.filetoupload && files.filetoupload.path) {
            //if user submitted an image
            var oldpath = files.filetoupload.path;
            var logoName = makeid();
            var newpath = __dirname + '/exports/' + uniq + "/";
            var newPathName = newpath + logoName;
            var relativePath = files.filetoupload.name ? "../" + uniq + "/" + logoName : "";
        }
        //now use relativePath for the logo
        var contact = !!fields.contact;
        var email = fields.email;
        var message = fields.message;
        var signature = fields.signature;
        var background = fields.background;
        var card = fields.card;
        var isSnowing = !!fields.snowing;
        var cardStyling = fields.cardStyle;
        console.log(cardStyling)

        /*switch(true){ //this will be required when we offer 2+designs
            case true:
            var {card2Gen} = require('./cardBuilder.js');

            break;
        }*/
        
        var exportURL = __dirname +"/exports/"+ uniq + "/index.html";
        var {card2Gen} = require('./cardBuilder.js');
        const source = card2Gen(background, card, relativePath, message, signature, isSnowing, exportURL, cardStyling);

        //fs.mkdirSync( __dirname +"/exports/"); 
        fs.mkdirSync( __dirname +"/exports/"+ uniq); //"/ 

        fs.writeFile(__dirname + "/exports/" + uniq + "/index.html", source, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved! to " + __dirname + "/exports/" + uniq + "/index.html");
        });

        if (relativePath !== "") {
            /* OLD 
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;

            });*/
            //Changed due to https://stackoverflow.com/questions/43206198/what-does-the-exdev-cross-device-link-not-permitted-error-mean
            fs.copyFile(oldpath, newpath+files.filetoupload.name, function(){
                if(err) {
                    console.log(new Date());
                    console.log(err);
                    throw err;
                };
                fs.rename(newpath+files.filetoupload.name, newPathName, function(){
                    if(err) {
                        console.log(new Date());
                        console.log(err);
                        throw err;
                    };
                })

            })
        }

        

    var facebookWorkaround = new XMLHttpRequest;
    facebookWorkaround.open('get', 'https://www.facebook.com/sharer/sharer.php?u='+'http://cards.xara.com/'+uniq+"/index.html", true);
    facebookWorkaround.send();


        res.setHeader('Content-Type', 'application/json');
        var send = {url : uniq, message: ""+message};
        console.log(send.url);
        res.send(send);

    })
});












app.post('/sendEmails', (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        console.log(fields);        
        res.setHeader('Content-Type', 'application/json');
        var send = {};
        res.send(send);
    })
});






/*
        if (files.filetoupload && files.filetoupload.path) {
            //if user submitted an image
            var oldpath = files.filetoupload.path;
            var newpath = __dirname + '/static/' + files.filetoupload.name;
            var relativePath = files.filetoupload.name ? "../" + files.filetoupload.name : "";
        }
        //var name = fields.name;
        var message = fields.message;
        var company = fields.company;
        const source = card2Gen(relativePath, message, company);
        const uniq = makeid();

        fs.mkdirSync(uniq);


        fs.writeFile(__dirname + "/" + uniq + "/index.html", source, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved! to " + uniq);
        });

        if (relativePath !== "") {
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;

            });
        }

        res.sendFile(__dirname + '/inputPage.html');
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`Thank you for your email ${fields.email}, we created your card:`);
        res.write(`<a href="./${uniq}/index.html">${uniq} </a>`);
        res.end();
        */
    app.get('/*/', (req, res) => { //image req
        res.sendFile(__dirname +  "/exports/"+ req.originalUrl);
    })
    app.get('/*', (req, res) => {
        res.sendFile(__dirname +  "/exports/"+ req.originalUrl +"/");
    })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))




function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};


/*
const http = require('http');
var fs = require('fs');


const server = http.createServer((req, res) => {

    fs.readFile('inputPage.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

*/
