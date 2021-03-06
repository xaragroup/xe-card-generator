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
    var cardFiles = fs.readdirSync(cards);

    
  /*
    bgFiles.forEach(file => {
        fs.writeFileSync(__dirname + "/static/" + file, fs.readFileSync(backgrounds + file));
    })
    cardFiles.forEach(file => {
        fs.writeFileSync(__dirname + "/static/" + file, fs.readFileSync(cards + file));
    })*/
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
        if(user.contact){
            addUser(user.email);
        }else {
            user = {};
        }

        var card = {
            cardContents : fields.cardContent,
            isSnowing : !!fields.snow,
            uniqueLocation : makeid(),
            uniqueName : makeid(),
            src : ""
        }
        card.exportURL = "https://cards.xara.com" + "/" + card.uniqueLocation;

        //handle the logo
        //if user submitted an image
        if (files.filetoupload && files.filetoupload.size && files.filetoupload.size > 0){

            card.imageLocation = files.filetoupload.path;
            card.imageName = files.filetoupload.name;

            fs.copyFile(card.imageLocation, __dirname + '/exports/' + card.imageName, function(){
                if(err) {
                    console.log(new Date());
                    console.log(err);
                    throw err;
                };
                card.imageLocation = __dirname + '/exports/' + card.imageName;
                console.log('Logo moved to :' + card.imageLocation);

                fs.rename(card.imageLocation, __dirname + '/exports/' + card.uniqueName, function(){
                    if(err) {
                        console.log(new Date());
                        console.log(err);
                        throw err;
                    };

                    card.imageLocation = __dirname + '/exports/' + card.uniqueName;
                    console.log('Logo renamed to :' + card.imageLocation);
                })

            })

        }
        
        
        card.src = card2Gen(card.cardContents, card.uniqueName, card.isSnowing, card.exportURL);

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







var nodemailer = require('nodemailer');
var {generateEmail} = require('./emailGen.js');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: 'cards@mg.xara.com',
        pass: '5BHQ8MkGSkYPppd'
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Xara E-cards" <cards@xara.com>', // sender address
    to: 'ben-moses@live.co.uk', // list of receivers
    subject: 'Your Xara E-card!', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};


app.post('/sendEmails', (req, res) => {
    var emailAddress;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        mailOptions.text = `Someone has sent you an E-card. It's available to see at ${fields.url}`;

        for(i=1; i<6; i++){
            if(fields["email"+i] == ""){ continue; }//skip if no email
            mailOptions.html = generateEmail(fields.url, fields["name"+i]);
            mailOptions.to = "" + fields["email"+i];
            send(mailOptions);
        };
    });

    
    res.setHeader('Content-Type', 'application/json');
    response = {err : false};
    res.send(response);
});

function send(enclosedMailOptions){
// send mail with defined transport object
    transporter.sendMail(enclosedMailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log("email sent");
        }
    });
}


    app.get('/*/', (req, res) => { //image req        
        if(req.originalUrl.indexOf("?") > -1){
            req.originalUrl = req.originalUrl.split('?')[0];
        }
        res.sendFile(__dirname +  "/exports/"+ req.originalUrl);
    })
    app.get('/*', (req, res) => {
        res.sendFile(__dirname +  "/exports/"+ req.originalUrl +"/");
    })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))




function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

function addUser(emailAddress) {
    const { Client } = require('pg');
    const connectionString = 'postgresql://cards:T4vbDpJMRGbL0rK@cards-db:5432/cards';

    const client = new Client({
        connectionString: connectionString,
    })
    client.connect()

    client.query("INSERT INTO users (email) VALUES ('"+emailAddress+"');")
    .then(res => {
        //console.log(res);
    })
    .catch(e => console.error(e.stack))
}



