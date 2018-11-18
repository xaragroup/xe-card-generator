module.exports.generateInputPage = function generateInputPage(backgroundFiles, cardFiles) {
    /**
     * How to checked the first el ${checked ? (checked = !checked , "checked") : ""}
     */

    function editor() {

    }

    var colors = `
                        <div class="colorPickers" style="background-color:black;    left:6px;"></div>
                        <div class="colorPickers" style="background-color:#e0322c;  left:12px;"></div>
                        <div class="colorPickers" style="background-color:#e09720;  left:18px;"></div>
                        <div class="colorPickers" style="background-color:#eeef00;  left:24px;"></div>
                        <div class="colorPickers" style="background-color:#7ed732;  left:30px;"></div>
                        <div class="colorPickers" style="background-color:#1471c1;  left:36px;"></div>
                        <div class="colorPickers" style="background-color:#8007e4;  left:42px;"></div>
                    `
    function backgroundsLoop() {
        var html = "";
        var cleanString;
        var checked = "checked";
        for (i = 0; i < backgroundFiles.length; i++) {
            cleanString = backgroundFiles[i].replace('.jpg', "").replace('.png', "").replace("_", " ").replace("-", " ");
            //Capitalise the first letter
            cappedString = cleanString.substr(0, 1).toUpperCase() + cleanString.substr(1);
            html += `   <input type="radio" name="background" value="${backgroundFiles[i]}" id="${backgroundFiles[i]}">
                        <label for="${backgroundFiles[i]}" class="bg">  
                        <div class="bg-images" style="background-image:url(${backgroundFiles[i]})"></div>    
                        <p class="bg-text">${cappedString}</p> 
                        ${backgroundFiles[i].indexOf("_colored") > -1 ? colors : ""}  
                        </label>`;

            if (checked == true);
        }

        return html;
    }


    function cardsLoop() {
        var html = "";
        var cleanString;
        var checked = "checked";
        for (i = 0; i < cardFiles.length; i++) {
            if (cardFiles[i].indexOf('thumb') > -1) {
                //remove any illegal, or unwanted string from the title                
                cleanString = cardFiles[i].replace("_thumb", "").replace('.jpg', "").replace('.png', "").replace("_", " ").replace("-", " ");
                styleName = cleanString.replace(" ", "_");
                //Capitalise the first letter
                //cappedString = cleanString.substr(0, 1).toUpperCase() + cleanString.substr(1);
                //<p class="bg-text">${cappedString}</p> 
                html += `   <input type="radio" name="card" value="${cardFiles[i]}" id="${cardFiles[i]}"> 
                            <label styleAttr="${styleName}" for="${cardFiles[i]}" class="bg">    
                                <div class="card-images" style="background-image:url(${cardFiles[i]})"></div>    
                            </label>`;
            }
        }


        return html;
    }
    var fonts = `
    <link href="https://fonts.googleapis.com/css?family=Mountains+of+Christmas" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Dancing+Script" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Architects+Daughter" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Cantata+One" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Arapey" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Magra" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=EB+Garamond" rel="stylesheet">
    `

    // now return the html with the dynamic content

    return `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Xara Cloud's Input page</title>
    <link rel="stylesheet" type="text/css" href="./input.css">
    <link rel="stylesheet" type="text/css" href="./text_styles.css">
    ${fonts}
    <meta property="og:url"                content="https://cards.xara.com/" />
    <meta property="og:type"               content="website" />
    <meta property="og:title"              content="Xara E-card Creator" />
    <meta property="og:description"        content="Create your very own e-card in seconds with xara.com" />
    <meta property="og:image:width"        content="1048"/> 
    <meta property="og:image:height"       content="549"/>
    <meta property="og:image"              content="https://cards.xara.com/envelope.png" />

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Xara E-card Creator">
    <meta name="twitter:description" content="Create your very own e-card in seconds with xara.com" >
    <meta name="twitter:image" content="https://cards.xara.com/envelope.png">


</head>

<body>

    <div id="cardPreview">

       <div id="effect"></div>

    </div>






    <div id="header">
        </h1>
        <h1 class="" id="backgroundInstructions">Firstly choose your E-card’s background:
        </h1>
        <h1 class="hidden" id="cardInstructions">Pick a card design</h1>
        <h1 class="" id="backButton">Back
    </div>

    <div class="button disabled" id="toInfo" onclick="goToStep( 'info' )">Next, add your message</div>
    <div class="button disabled" id="toCards" onclick="goToStep( 'card' )">Choose a card design...</div>






    <form id="createCardForm" <!--action="fileupload" method="post" --> enctype="multipart/form-data" autocomplete="off">

        <!-- information -->
        <div class="hidden" id="form">

            <label id="addComp" for="imgupload">Click to add your company logo <i>(optional)</i>
            </label>
            <input id="imgupload" type="file" name="filetoupload">
            <img id="preview" src="">


            <label id="emailLabel">Add your email address: <i>(required)</i></label>
            <input id="emailInput" type="text" name="email" value="" required>

<!--
            <label id="compLabel">Your companies URL:</label>
            <input id="compInput" type="text" name="company" value="www.example.com">
-->
            <label id="contactLabel">
                <input id="contactCheck" type="checkbox" name="contact" unchecked> Yes I would like to hear about more stuff from
                <a href="https://www.xara.com">Xara Cloud</a>
                <div id="privacy">We will treat your data with care and you can unsubscribe for free anytime. See our <a href="http://xara.cloud/privacy/" title="Privacy Policy" target="_blank">Privacy Policy</a> for more information.</div>
            </label>

            <label id="snowEnable">
                <input id="contactCheck" type="checkbox" name="snow" onclick="toggleSnow();" checked> Apply Snow effect
            </label>
        </div>

        <div class="button hidden" id="toSubmit" onclick="sendForm()">Get your e-card</div>

        <!-- card -->
        <div class="overflowHandler">
        <div class="hidden" id="card-picker">   
            ${cardsLoop()}
            <div class="scrollerHandle" id="card-left"></div>
            <div class="scrollerHandle" id="card-right"></div>
        </div>
        </div>


        <!-- background -->
        <div class="overflowHandler">
        <div class="" id="background-picker">
            ${backgroundsLoop()}
            <div class="scrollerHandle" id="bg-left"></div>
            <div class="scrollerHandle" id="bg-right"></div>
        </div>
        </div>


    </form>


    <div id="cover"></div>
    <div id="sharePanel">
        <div id="closeShare" onclick="toggleShare(false)">x</div>
        <h2>Share your e-card</h2>
        <p id="publishedTo">Your e-card is published to here:</p>
        <a href="" target="_blank"><p id="cardURL">UNDEFINED</p></a>
        <hr>
        <p id="shareTo">
           Share to: 
        </p>
        
        <a><div id="facebook" class="social" title="Share to Facebook!"></div> </a>
        <a><div id="twitter" class="social" title="Share to Twitter!"></div> </a>
        <a><div id="linkedin" class="social" title="Share to LinkedIn!"></div> </a>
        <a><div id="pinterest" class="social" title="Share to Pinterest!"></div> </a>

        <hr>
        <p id="emailTo">Email:</p>
        <form id="sendEmailForm">
           <input class="shareForm email" type="email" name="email1" placeholder="#1 Email">
           <input class="shareForm name" type="text" name="name1" placeholder="#1 Name"><br>

           <input class="shareForm email" type="email" name="email2" placeholder="#2 Email">
           <input class="shareForm name" type="text" name="name2" placeholder="#2 Name"><br>

           <input class="shareForm email" type="email" name="email3" placeholder="#3 Email">
           <input class="shareForm name" type="text" name="name3" placeholder="#3 Name"><br>

           <input class="shareForm email" type="email" name="email4" placeholder="#4 Email">
           <input class="shareForm name" type="text" name="name4" placeholder="#4 Name"><br>

           <input class="shareForm email" type="email" name="email5" placeholder="#5 Email">
           <input class="shareForm name" type="text" name="name5" placeholder="#5 Name"><br>

           <p id="emailText">Currently we only allow you to share to 5 emails at once. You could share via social media or using the Link. <br> We will change the email name to be the names you entered.</p>            
           <div id="sendEmailButton" onclick="sendEmails()">Send</div>
       </form>


    </div>
    
    <div id="welcomePanel">
        <h1>Create and send your own E-card
        </h1>
        <img id="cardCover" src="./intro_card_cover.png">    

        </img>
        <div class="button" id="coverButton" onclick="hideWelcomePanel()">Show some love</div>
    </div>




    <a href="https://www.xara.com"><div id="xara-logo"></div>
    </a>

    <footer>
    <p><a href="https://cards.xara.com" target="_blank">Create your own E-card</a>   |   <a style="cursor: pointer" href="https://cloud.ixara.com" target="_blank">These templates and more can be customized further...</a></p>
       <p id="made">… made by the team at <a href="https://www.xara.com" target="_blank"><b>xara.com</b></a></p>
        </footer>
    <!--SCRIPTS -->

    <script src="previewTemplates.js"></script>
    <!--<script src="autofit.js"></script>-->
    <script src="input.js"></script>
    <script src="snow.js"></script>
    <script>
    
document.querySelector('#cover').addEventListener('click', function () { toggleShare(false) });
var share = document.querySelector('#sharePanel');
var cover = document.querySelector('#cover');
function toggleShare(bool) {
    if (bool) {
        cover.style.display = "block";
        share.style.display = "block";
    } else {
        cover.style.display = "none";
        share.style.display = "none";
    }
}

    var currentStep = "background";
    document.getElementById("backButton").addEventListener('click', function () { goToStep(currentStep) });

    
var input = document.querySelector('#imgupload');
input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
    var src = input.files;

    var image = document.querySelector('#preview');
    image.style.opacity = 1;
    image.src = window.URL.createObjectURL(src[0]);
    document.querySelector('#addComp').style.opacity = 0;

    document.querySelector('#logoPreview').src = window.URL.createObjectURL(src[0]);
    document.querySelector('#logoPreview').style.display = "block";
    this.value = null;
}

function removeLogo(el) {
    document.querySelector('#logoPreview').style.display = "none";
};
    </script>
</body>

</html>`
}



