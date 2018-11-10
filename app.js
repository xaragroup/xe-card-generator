const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/static'));



app.get('/', (req, res) => {
    let resources = __dirname + "\\resources";
    let backgrounds = resources + "\\backgrounds\\";
    let cards = resources + "\\cards\\";

    var bgFiles = fs.readdirSync(backgrounds);
    //console.log(bgFiles)
    bgFiles.forEach(file => {
        fs.writeFileSync(__dirname + "\\static\\" + file, fs.readFileSync(backgrounds + file));
    })

    var cardFiles = fs.readdirSync(cards);
    //console.log(cardFiles)
    cardFiles.forEach(file => {
        fs.writeFileSync(__dirname + "\\static\\" + file, fs.readFileSync(cards + file));
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

    /***
     * { email: 'My email',
  contact: 'on',
  card: 'merry_christmas_cover.png',
  background: 'gold_lights.jpg',
  message: 'This is the main message',
  signature: 'This is my sign<br>ature message' }
     */

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        console.log(fields);
        //console.log(files.filetoupload.path)
        /**
{ email: 'ben@xara.com',
  contact: 'on',
  card: 'merry_christmas_cover.png',
  background: 'wood_presents.jpg',
  message: 'Click here to edit your message.\n             ',
  signature: 'and don\'t forget to sign it!',
  snowing: 'true' }
         */


        var contact = !!fields.contact;
        var email = fields.email;
        var message = fields.message;
        var company = fields.company;
        var background = fields.background;
        var card = fields.card;

        if (files.filetoupload && files.filetoupload.path) {
            //if user submitted an image
            var oldpath = files.filetoupload.path;
            var logoName = makeid();
            var newpath = __dirname + '/static/' + logoName;
            var relativePath = files.filetoupload.name ? "../" + logoName : "";
        }
        var {card2Gen} = require('./cardBuilder.js');
        const source = card2Gen(background, card, relativePath, message, company);
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

        
        res.setHeader('Content-Type', 'application/json');
        var send = {url : uniq};
        console.log(send.url);
        res.send(send);

    })
});
/*
{ email: '',
company: 'www.example.com',
message: 'I would just like to say thank you all for a fantastic year, and we look forward to a better one next year!\r\n\r\n                Boss,                        www.example.com\r\n
\r\n        ',
contact: 'on',
card: 'christmas_trees_cover.png',
background: 'christmas_presents.jpg' }
*/






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


    app.get('/*', (req, res) => {
        res.sendFile(__dirname + req.originalUrl + "\\index.html");
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
