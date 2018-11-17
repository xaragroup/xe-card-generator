function getCardDomTemplate(title) {
    var defaultStyling = `
    <style>
    .sizing {
        backface-visibility: hidden;
        transform-origin: top left;
        transition: transform 1s;
    }
    .open .sizing{
        transform: translateX(calc(50% - 1px));
    }

    .open #card-cover {
        transform: translateX(calc(50% - 1px)) rotateY(180deg);
    }

    #card-inside-left {
        transform-origin: top right;
        transform: translateX(calc(-100% + 1px)) rotateY(180deg);
        border-right: 2px solid rgba(0,0,0,0.15);
        cursor: pointer;
    }

    #card-cover {
        cursor: pointer;
    }
    
    .open #card-inside-left {
        transform-origin: top right;
        transform: translateX(calc(-50% + 2px)) rotateY(360deg);
    }

    img {
        display: none;
    }
    
    
    img[src] {
       display: block;
     }
</style>
    `





    switch (title) {        
        case "a_real_estate_thumb.png":
            return `
        <div id="card" style="width: 100vw; height: calc( 100vh - 390px); position: absolute; left: 0px; top: 0px;">
        ${defaultStyling}
        

            <div class="sizing" id="card-inside-right" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
                <img src="${title.replace("_thumb", "_inside_right")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">

                <p class="autoFIT" id="message" contenteditable="" spellcheck="false" style="position:absolute; top:10%; bottom:60%; left:5%; right:5%; display: block; color:white; text-align: center; font-family: 'Mountains of Christmas', cursive; margin: 0px;">Click here to edit your message, you can also close the card and edit the cover!</p>
                <p class="autoFIT" id="signature" contenteditable="" spellcheck="false" style="position:absolute; top: 51%; bottom: 30%; right:5%; left:5%; display: block; color:white; text-align: center; font-family: 'Mountains of Christmas', cursive; margin: 0px;">and don't forget to sign it!</p>
                
                <img id="logoPreview" onclick="removeLogo();" src="./removeLogo.png" style="position: absolute; bottom: 2%; left: 0px; right: 0px; margin: auto; height: 25%;">

            </div>


            <div class="sizing" id="card-inside-left" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
                <img onmousedown="setCardTo('close')" src="${title.replace("_thumb", "_inside_left")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
            </div>

            <div class="sizing" id="card-cover" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto">
                <img onmousedown="setCardTo('open')" src="${title.replace("_thumb", "_cover")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
                <p id="coverMessage" class="autoFIT" contentEditable="" spellcheck="false" style="position:absolute; top: 5%; bottom: 60%; right:5%; left:20%; display: block; color:white; font-family: 'Pacifico', cursive; margin: 0px; text-align: right;">Merry Christmas \n in your new home!</p>
                </div>
        </div>
    `

    case "penguin_thumb.png":
            return `
        <div id="card" style="width: 100vw; height: calc( 100vh - 390px); position: absolute; left: 0px; top: 0px;">
        ${defaultStyling}

            <div class="sizing" id="card-inside-right" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
                <img src="${title.replace("_thumb", "_inside_right")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">

                <p class="autoFIT" id="message" contenteditable="" spellcheck="false" 
                style=" position:absolute; 
                        top:20%; 
                        bottom:45%; 
                        left:20%; 
                        right:15%; 
                        display: block; 
                        color:rgb(35, 31, 32); 
                        text-align: center; 
                        font-family: 'Architects Daughter'; 
                        margin: 0px;">Have a brilliant break and see you in the new year!</p> 
                
                <p class="autoFIT" id="signature" contenteditable="" spellcheck="false" style="position:absolute; top: 55%; bottom: 33%; right:5%; left:5%; display: block; color:rgb(35, 31, 32); text-align: center; font-family: 'Roboto; margin: 0px;">- From your company! -</p>

                <img id="logoPreview" onclick="removeLogo();" src="./removeLogo.png" style="position: absolute; bottom: 8%; left: 0px; right: 0px; margin: auto; height: 25%;">

            </div>


            <div class="sizing" id="card-inside-left" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
                <img onmousedown="setCardTo('close')" src="${title.replace("_thumb", "_inside_left")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
            </div>

            <div class="sizing" id="card-cover" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto">
                <img onmousedown="setCardTo('open')" src="${title.replace("_thumb", "_cover")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
                <p id="coverMessage" class="autoFIT" contentEditable="" spellcheck="false" style="position:absolute; top: 20%; bottom: 57%; right:15%; left:60%; display: block; color:rgb(35, 31, 32); font-family: 'Architects Daughter'; margin: 0px; text-align: center;">Let it SNOW!</p>
                </div>
        </div>
    `
    case "b_real_estate_thumb.png":
    return `
<div id="card" style="width: 100vw; height: calc( 100vh - 390px); position: absolute; left: 0px; top: 0px;">
${defaultStyling}

    <div class="sizing" id="card-inside-right" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
        <img src="${title.replace("_thumb", "_inside_right")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">

        <p class="autoFIT" id="message" contenteditable="" spellcheck="false" 
        style=" position:absolute; 
                top:10%; 
                bottom:40%; 
                left:10%; 
                right:10%; 
                display: block; 
                color:white;
                text-align: center; 
                font-family: 'Pacifico'; 
                margin: 0px;">Have a Merry Christmas and a happy New Year!</p> 
        
        <p class="autoFIT" id="signature" contenteditable="" spellcheck="false" 
        style=" position:absolute; 
                top: 65%; 
                bottom: 15%; 
                right:10%; 
                left:10%; 
                display: block; 
                color: #bf0005;
                text-align: center; 
                font-family: 'Roboto; 
                margin: 0px;">See you in the new year... <br>Xara Real Estate</p>

            </div>


    <div class="sizing" id="card-inside-left" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
        <img onmousedown="setCardTo('close')" src="${title.replace("_thumb", "_inside_left")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
    </div>

    <div class="sizing" id="card-cover" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto">
        <img onmousedown="setCardTo('open')" src="${title.replace("_thumb", "_cover")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
        <p id="coverMessage" class="autoFIT" contentEditable="" spellcheck="false" style="position:absolute; top: 5%; bottom: 80%; right:5%; left:5%; display: block; color:white; font-family: 'Pacifico'; margin: 0px; text-align: center;">Welcoming you to your new</p>

        <p class="autoFIT" id="signature" contenteditable="" spellcheck="false" style="position:absolute; top: 18%; bottom: 70%; right:5%; left:5%; display: block; color:#bf0005; text-align: center; font-family: 'Times New Roman'; margin: 0px;">CHRISTMAS HOME</p>
        <img id="logoPreview" onclick="removeLogo();" src="./removeLogo.png" style="position: absolute; bottom: 45%; left: 0%; right: 0%; margin: auto; height: 25%;">
        </div>
</div>
`
case "3_cornucopia_thumb.png":
    return `
<div id="card" style="width: 100vw; height: calc( 100vh - 390px); position: absolute; left: 0px; top: 0px;">
${defaultStyling}

    <div class="sizing" id="card-inside-right" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
        <img src="${title.replace("_thumb", "_inside_right")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">

        <p class="autoFIT" id="message" contenteditable="" spellcheck="false" 
        style=" position:absolute; 
                top:10%; 
                bottom:30%; 
                left:10%; 
                right:10%; 
                display: block; 
                color:#fbf194;
                text-align: center; 
                font-family: 'Merriweather', serif; 
                margin: 0px;">Come to ours for <br>THANKSGIVING DINNER!<br><br><u>MENU</u> <br> - TURKEY -<br> - Roast Potatoes -<br> - Pumpkin Pie -<br> - Assorted Veg. -</p> 
        
        <img id="logoPreview" onclick="removeLogo();" src="./removeLogo.png" 
        style="position: absolute; 
        bottom: 7%; 
        left: 0%; 
        right: 0%; 
        margin: auto; 
        height: 25%;">
        </div>


    <div class="sizing" id="card-inside-left" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
        <img onmousedown="setCardTo('close')" src="${title.replace("_thumb", "_inside_left")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
    </div>

    <div class="sizing" id="card-cover" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto">
        <img onmousedown="setCardTo('open')" src="${title.replace("_thumb", "_cover")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
        <p id="coverMessage" class="autoFIT" contentEditable="" spellcheck="false" 
        style="position:absolute; 
        top: 8%; 
        bottom: 85%; 
        right:5%; 
        left:5%; 
        display: block; 
        color:white; 
        font-family: 'Cantata One', serif;
        margin: 0px; 
        text-align: center;">YOU'RE INVITED TO</p>

        <p class="autoFIT" id="signature" contenteditable="" spellcheck="false" 
        style="position:absolute; 
        top: 15%; 
        bottom: 65%; 
        right:5%; 
        left:5%; 
        display: block; 
        color:#fbf194; 
        text-align: center; 
        font-family: 'Playfair Display', serif;
        margin: 0px;">THANKSGIVING</p>
        
        </div>
`
        default:
            return `
        <div id="card" style="width: 100vw; height: calc( 100vh - 390px); position: absolute; left: 0px; top: 0px;">
        ${sdefaultStyling}
            <div class="sizing" id="card-inside-right" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
                <img src="${title.replace("_thumb", "_inside_right")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">

                <p class="autoFIT" id="message" contenteditable="" spellcheck="false" style="position:absolute; top:10%; bottom:60%; left:5%; right:5%; display: block; font-family: 'Mountains of Christmas', cursive; margin: 0px;">Click here to edit your message</p>
                <p class="autoFIT" id="signature" contenteditable="" spellcheck="false" style="position:absolute; top: 51%; bottom: 30%; right:5%; left:5%; display: block; font-family: 'Mountains of Christmas', cursive; margin: 0px;">and don't forget to sign it!</p>
                
                <img id="logoPreview" onclick="removeLogo();" src="./removeLogo.png" style="position: absolute; bottom: 2%; left: 0px; right: 0px; margin: auto; height: 25%;">

            </div>


            <div class="sizing" id="card-inside-left" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
            <img onclick="setCardTo('close')" src="${title.replace("_thumb", "_inside_left")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
            </div>

            <div class="sizing" id="card-cover" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto">
            <img onclick="setCardTo('open')" src="${title.replace("_thumb", "_cover")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
            </div>
        </div>
    `
    }


}



function getBackgroundDomTemplate(title) {
    switch (title) {
        case "xara_blue.png":
            return `
            <style>

            #background {
                animation: slide 60s infinite;
                animation-timing-function: linear;
            }
            @keyframes slide {
                0% {background-position: 0%;}
                50% {background-position: 100%;}
                100% {background-position: 0%;}
            }
            </style>
            <div id="background"  style="background-image:url(${title}); width: 100%;height: 100%;background-size: cover;background-position: 50%;"; overflow: hidden;></div>
            `;
            break;
        case "silver_bauble.jpg":
        case "silver_bauble.jpg":
            return `<div id="background"  style="background-image:url(${title}); width: 100%;height: 100%;background-size: cover;background-position: 50%;"; overflow: hidden;></div>`;
            break;
        default:
            return `<div id="background"  style="background-image: url(${title}); width: 100%;height: 100%;background-size: cover;background-position: 50%;"; overflow: hidden;></div>`;
    }


}


function getEffectDomTemplate(title) {
    switch (title) {
        case "snow":
            return `<canvas id="snowCanvas" width="1280" height="913" style="position: absolute; left: 0px; top: 0px; pointer-events: none;"></canvas>`
        case "":
            break;
    }


}
