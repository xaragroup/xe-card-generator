function getCardDomTemplate(title) {
    switch (title) {
        case "special": //merry_christmas_cover.png
            alert('special');
            return `
            <div id="card" style="width: 100vw; height: calc( 100vh - 390px); position: absolute; left: 0px; top: 0px;">
                <style>
                @media (max-aspect-ratio: 1/1) { /*thinner than square*
                    #card {
                        background-color:black;
                    }
                }
                </style>

                <img id="actualCardPreview-inside-right" src="merry_christmas_inside_right.png" class="open">
                <div id="insideCard" style="width: 392.25px; opacity: 1;" class="open">
                    <h4 contenteditable="" spellcheck="false" class="merry_christmas" style="font-size: 58px; display: block;">Click here to edit your message</h4>
                    <h5 contenteditable="" spellcheck="false" class="merry_christmas" style="font-size: 38px; display: block;">and don't forget to sign it!</h5>
                    <img id="logoPreview" src="./removeLogo.png">
                </div>
        
        
                <img id="actualCardPreview-inside-left" src="merry_christmas_inside_left.png" class="open">
                <img id="actualCardPreview-cover" src="merry_christmas_cover.png" class="open">
            </div>
        `
        default:
        return `
        <div id="card" style="width: 100vw; height: calc( 100vh - 390px); position: absolute; left: 0px; top: 0px;">
        <style>
                .sizing {
                    backface-visibility: hidden;
                    transform-origin: top left;
                    transition: transform 1s;
                }
                .open .sizing{
                    transform: translateX(50%);
                }

                .open #card-cover {
                    transform: translateX(50%) rotateY(180deg);
                }

                #card-inside-left {
                    transform-origin: top right;
                    transform: translateX(-100%) rotateY(180deg);
                }
                
                .open #card-inside-left {
                    transform-origin: top right;
                    transform: translateX(-50%) rotateY(360deg);
                }

                img {
                    display: none;
                }
                
                
                img[src] {
                   display: block;
                 }
                
                 [contenteditable]:focus {
                    outline: dashed 0.5px rgba(102,102,102,0.5);
                    stroke-dasharray: 3.5;
                    -webkit-box-shadow: 0px 0px 10px 5px rgba(168, 209, 244, 1);
                    -moz-box-shadow: 0px 0px 10px 5px rgba(168, 209, 244, 1);
                    box-shadow: 0px 0px 10px 5px rgba(168, 209, 244, 1);
                }
                


        </style>

            <div class="sizing" id="card-inside-right" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
                <img src="${title.replace("_cover", "_inside_right")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">

                <p class="autoFIT" id="message" contenteditable="" spellcheck="false" style="position:absolute; top:10%; bottom:60%; left:5%; right:5%; display: block; font-family: 'Mountains of Christmas', cursive; margin: 0px;">Click here to edit your message</p>
                <p class="autoFIT" id="signature" contenteditable="" spellcheck="false" style="position:absolute; top: 41%; bottom: 20%; right:5%; left:5%; display: block; font-family: 'Mountains of Christmas', cursive; margin: 0px;">and don't forget to sign it!</p>
                
                <img id="logoPreview" src="./removeLogo.png">

            </div>


            <div class="sizing" id="card-inside-left" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto;">
            <img onclick="setCardTo('close')" src="${title.replace("_cover", "_inside_left")}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
            </div>

            <div class="sizing" id="card-cover" style="position: absolute; left:0px; right:0px; top:0px; bottom:0px;margin:auto">
            <img onclick="setCardTo('open')" src="${title}" style="position:absolute; width:100%; height:100%; top:0px; left:0px;">
            </div>
        </div>
    `
    /*
    <img id="actualCardPreview-inside-right" src="merry_christmas_inside_right.png" class="open">
            <div id="insideCard" style="width: 392.25px; opacity: 1;" class="open">
                <h4 contenteditable="" spellcheck="false" class="merry_christmas" style="font-size: 58px; display: block;">Click here to edit your message</h4>
                <h5 contenteditable="" spellcheck="false" class="merry_christmas" style="font-size: 38px; display: block;">and don't forget to sign it!</h5>
                <img id="logoPreview" src="./removeLogo.png">
            </div>
    
    
            <img id="actualCardPreview-inside-left" src="merry_christmas_inside_left.png" class="open">
            <img id="actualCardPreview-cover" src="merry_christmas_cover.png" class="open">
    */
    }


}



function getBackgroundDomTemplate(title) {
    switch (title) {
        case "silver_bauble.jpg":
        case "silver_bauble.jpg":
            alert("special");
            return `<div id="background"  style="background-image:url(${title}); width: 100%;height: 100%;background-size: cover;background-position: 50%;"; overflow: hidden;></div>`;
            break;
        default:
            return `<div id="background"  style="background-image: url(${title}); width: 100%;height: 100%;background-size: cover;background-position: 50%;"; overflow: hidden;></div>`;
    }

   
}


function getEffectDomTemplate(title) {
    switch (title) {
        case "snowing":
            return ` <div id=effect>
                        <canvas id="snowCanvas" width="1280" height="913" style="position: absolute; left: 0px; top: 0px; pointer-events: none;"></canvas>
                    </div>`
            break;
        case "":
            break;
    }


}
