const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
var {card2Gen} = require('./cardBuilder.js');

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
});



app.post('/cardGenerator', (req, res) => {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        var user = {
            email : fields.email,
            contact : !!fields.contact
        }

       // console.log(fields)

        var card = {
            cardContents : fields.cardContent,
            isSnowing : !!fields.snow,
            imageLocation : "" && files.filetoupload && files.filetoupload.path,
            imageName : "" && files.filetoupload && files.filetoupload.name,
            uniqueLocation : makeid(),
            uniqueName : makeid(),
            src : ""
        }
        card.exportURL = "https://cards.xara.com" + "/" + card.uniqueLocation;

        //handle the logo
        //if user submitted an image
        if (card.imageLocation != "" && card.imageName != ""){
            fs.copyFile(card.imageLocation, __dirname + '/exports/' + card.uniqueLocation + "/" + card.imageName, function(){
                if(err) {
                    console.log(new Date());
                    console.log(err);
                    throw err;
                };
                card.imageLocation = __dirname + '/exports/' + card.uniqueLocation + "/" + card.imageName;
                console.log('Logo moved to :' + card.imageLocation);

                fs.rename(card.imageLocation, __dirname + '/exports/' + card.uniqueLocation + "/" + card.uniqueName, function(){
                    if(err) {
                        console.log(new Date());
                        console.log(err);
                        throw err;
                    };

                    card.imageLocation = __dirname + '/exports/' + card.uniqueLocation + "/" + card.uniqueName;
                    console.log('Logo renamed to :' + card.imageLocation);
                })

            })

        }
        
        
        card.src = card2Gen(card.cardContents, card.imageName, card.isSnowing, card.exportURL);

        fs.mkdirSync( __dirname +"/exports/"+ card.uniqueLocation)
        fs.writeFile( __dirname +"/exports/"+ card.uniqueLocation+ "/index.html", card.src, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved! to " + __dirname +"/exports/"+ card.uniqueLocation+ "/index.html");
        });        
        res.setHeader('Content-Type', 'application/json');
        var send = {url : card.uniqueLocation};
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
