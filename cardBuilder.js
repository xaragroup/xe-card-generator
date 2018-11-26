
//card2Gen(background, card, relativePath, message, signature, isSnowing);
module.exports.card2Gen = function card2Gen(cardContents, logoPath, snowEffect, exportURL){

    this.cardContents =cardContents;
    this.logo = logoPath || "";
    this.exportURL = exportURL;
    

    this.fbOpenGraph = `
    <meta property="og:url"                content="${exportURL}" />
    <meta property="og:type"               content="website" />
    <meta property="og:title"              content="My Christmas E-card" />
    <meta property="og:description"        content="Create your very own E-card in seconds with xara.com" />
    <meta property="og:image:width"        content="1048"/> 
    <meta property="og:image:height"       content="549"/>
    <meta property="og:image"              content="https://cards.xara.com/envelope.png" />
    `;

    this.twitter = `
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="My Christmas E-card">
    <meta name="twitter:description" content="Create your very own E-card in seconds with xara.com" >
    <meta name="twitter:image" content="https://cards.xara.com/envelope.png">`


    this.xaraBranding = `
    <a href="https://www.xara.com"><div id="xara-logo"></div>
     </a>
    
    <footer>
    <p><a href="https://cards.xara.com" target="_blank">Create your own E-card</a>   |   <a style="cursor: pointer" href="https://cloud.ixara.com" target="_blank">These templates and more can be customized further...</a></p>
    <p id="made">… made by the team at <a href="https://www.xara.com" target="_blank"><b>xara.com</b></a></p>
</footer>
    
    `;

    this.fontList = `
    <link href="https://fonts.googleapis.com/css?family=Mountains+of+Christmas" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Dancing+Script" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Architects+Daughter" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,900" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Cantata+One" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Arapey" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Magra" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=EB+Garamond" rel="stylesheet">
    `;

    this.style = `

    body {
        position:absolute;
        left:0px;
        top:0px;
        width:100%;
        height: 100%;
        margin: 0;
        overflow:hidden;
    }

    #card {
        height:100% !important;
    }

    #xara-logo {
        position:absolute;
        top:30px;
        right:40px;
        width: 108.7px;
        height: 31.2px;
        background-image:url(../XCLOGO.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }
    img {
        display: none;
    }
    
    
    img[src] {
       display: block;
     }

footer {
    position:absolute;
    left:0px;
    bottom:0px;
    height:40px;
    width:100%;
    background-color:black;
    font-size: 12px;
    font-family: "Open Sans";
    color:white;
    text-align: center;
}

footer a {
    color:white;
    text-decoration: underline;
}

#made {
    position:absolute;
    bottom: 0px;
    right:0px;
    margin-right:40px;

}

#made a {
    color : #2fa5e7;
}
logoPreview {
    pointer-events:none;
}

.autoFIT {
    pointer-events: none;
}
    `;

    this.runScripts = `
    <script src="input.js"> </script>
    ${snowEffect ? "<script src='snow.js'> </script><script> initSnow(document.querySelector('body'));</script>":""}
    
    
    <script>function resizeCard(title) {
        var card = document.querySelector('#card');
        if(!card){
            return;
        } //if card doesn't exist yet
    
        var aspectR = window.innerWidth / window.innerHeight; // 1+ wider, 1- taller
        var cardParts = card.children; //all children element of the card
        switch (title) {
            default:
                [...cardParts].forEach(cardPart => {
                    if (aspectR > 1.6) {
                        var value = card.getBoundingClientRect().height;
                        cardPart.style.width = 0.80 * value + "px";
                        cardPart.style.height = 0.80 * value + "px";
                    } else {
                        var value = card.getBoundingClientRect().width;
                        cardPart.style.width = 0.40 * value + "px";
                        cardPart.style.height = 0.40 * value + "px";
                    }
                });
                break;
        }
    };
    window.addEventListener('resize', resizeCard);
    resizeCard();
    
    setTimeout(function(){
        document.querySelectorAll('.autoFIT').forEach(el => {
            initAutofit(el);
        })
    },150)
    
    setCardTo('close')
    </script>
    `
    this.cardContents = this.cardContents.replace(/"blob:.*" /g, `"${logoPath}" `); //update the images

    return `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <title>Your E-card</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        ${this.style}
        </style>      
        <link rel="stylesheet" type="text/css" href="./text_styles.css">
        ${this.fontList}
        ${this.fbOpenGraph}
        ${this.twitter}
        </head>
        
        <body>
        ${this.cardContents}
        ${this.xaraBranding}

        ${this.runScripts}
        </body>
        </html>`

}