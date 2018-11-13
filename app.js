const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const {makeid} = require('./util.js');
var { card2Gen } = require('./cardBuilder.js');

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/static'));



//HOMEPAGE
app.get('/', (req, res) => {
    let resources = __dirname + "/resources";
    let backgrounds = resources + "/backgrounds/";
    let cards = resources + "/cards/";

    var bgFiles = fs.readdirSync(backgrounds);
    bgFiles.forEach(file => {
        fs.writeFileSync(__dirname + "/static/" + file, fs.readFileSync(backgrounds + file));
    })

    var cardFiles = fs.readdirSync(cards);
    cardFiles.forEach(file => {
        fs.writeFileSync(__dirname + "/static/" + file, fs.readFileSync(cards + file));
    })

    let { generateInputPage } = require("./inputPage.js");
    var src = generateInputPage(bgFiles, cardFiles);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(src);
    res.end();
});





//Generate Cards
app.post('/fileupload', (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //console.log(fields);

        var user = {
            contact : !!fields.contact,
            email : fields.email
        }
        if(user.contact){
            console.log(`Add ${user.email} to database here...`);
        }


        var card = {
            dir: makeid(),
            message : fields.message,
            signature : fields.signature,
            background : fields.background,
            card : fields.card,
            isSnowing : !!fields.snowing,
            logo : makeid(),
            source : ""
        }
        card.exportURL = __dirname + "/" + card.dir + "/index.html";

        //handle the logo
        //if user submitted an image
        if (files.filetoupload && files.filetoupload.path) {
            //copy the file incl. it's current name
            //then rename it, cannot do this as 1 action due to a docker issue with renaming across partitions.
            fs.copyFile(files.filetoupload.path, __dirname + '/static/' + files.filetoupload.name, function () { 
                if (err) {
                    console.log(new Date());
                    console.log(err);
                    throw err;
                };

                fs.rename(__dirname + '/static/' + files.filetoupload.name, __dirname + '/static/' + card.logo, function () {
                    if (err) {
                        console.log(new Date());
                        console.log(err);
                        throw err;
                    };
                    console.log(`uploaded file moved to ${__dirname + '/static/' + card.logo}`);
                    card.logo = "./" + card.logo;
                })

            })
        };

        /*switch(true){ //this will be required when we offer 2+designs
            case true:
            var {card2Gen} = require('./cardBuilder.js');

            break;
        }*/
        
        card.source = card2Gen(card.background, card.card, card.logo, card.message, card.signature, card.isSnowing, card.exportURL);
        fs.mkdirSync(card.dir);

        fs.writeFile(card.exportURL, card.source, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved! to " + card.exportURL);
        });

        res.setHeader('Content-Type', 'application/json');
        var send = { url: card.exportURL, message: "" + card.message };
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





//Going to cards, possibly implement a 404 page?
app.get('/*', (req, res) => {
    res.sendFile(__dirname + req.originalUrl + "/index.html");
})


app.listen(port, () => console.log(`Xara Cloud, E-card creator listening on port ${port}!`));