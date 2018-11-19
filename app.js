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
        }    

        user = {};

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










const nodemailer = require('nodemailer');

app.post('/sendEmails', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        /*
        var arr = Object.values(fields)
        var expArr = []
        for(i=0; i<arr.length; i++){
            expArr.push([arr[i],arr[i+1]])
                i++;
        };
*/
        let transporter = nodemailer.createTransport({
            host: 'smtp.mailgun.org',
            port: 465,
            secure: true,
            auth: {
                user: 'cards@mg.xara.com',
                pass: '5BHQ8MkGSkYPppd'
            }
        });

        var mailOptions = {
            from: '"Xara E-cards" <cards@xara.com>', // sender address
            to: 'ben@xara.com, ben-moses@live.co.uk',
            subject: "Someone's sent you an E-card", // Subject line
            text: "hi",
            html: "<p>hi</p>"
        }; 

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            res.setHeader('Content-Type','application/json');
            res.send({});
        });


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



const { Pool, Client } = require('pg');
const connectionString = "postgres://cards:T4vbDpJMRGbL0rK@cards-db:5432/cards";
/*
const client = new Client({
    user: 'cards',
    host: "localhost",
    database: 'cards',
    password: 'T4vbDpJMRGbL0rK',
    port: 5432
});*/

function addUser(emailToAdd){
    
    const client = new Client({
        connectionString : connectionString,
    })
    client.connect();
    var myQuery = 'INSERT INTO users(email) VALUES('+emailToAdd+')';

    client.query(myQuery, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
          // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        }
      })
    /*
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
        }
        // SQL Query > Insert Data

        const query = client.query('SELECT * FROM cards ORDER BY email ASC');
        // Stream results back one row at a time
        query.on('row', (row) => {
          console.log(row);
        });

        // After all data is inserted, end
        query.on('end', () => {
          done();
        });
      });
*/
}