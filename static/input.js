var bgs = document.querySelectorAll('.bg-images');

bgs.forEach(x => {
    x.addEventListener('click', moveToCenter.bind( { cont: document.querySelector('#background-picker') , el: x } ))
})


/* to use for cards
var cards = document.querySelectorAll('.card-images');
cards.forEach(x => {
    x.addEventListener('click', moveToCenter.bind( { cont: document.querySelector('#card-picker') , el: x } ))
})
*/





function moveToCenter(){
    var container = this.cont.getBoundingClientRect(); //dimensions for wrapper

    var el = this.el; //element to be centered
    var size = el.getBoundingClientRect();
    var max = container.width - window.innerWidth + 50;

    var wantedLeft = (window.innerWidth /2) - (size.width /2);
    var current = container.left;

    var diff = size.left - wantedLeft; //diff between its current pos and wantedPos

    var setValue = current-diff;
    if(setValue > 0){
        setValue = 0;
    }

    if(setValue < -max){
        setValue = -max;
    }


    this.cont.style.left = `${setValue}px`;
};

var goto = "background";

document.getElementById("backButton").addEventListener('click', function(){goToStep(goto)});

var hasSelectedCard = false;
function goToStep(option){
    

    switch(option){
        case "background":
        //show bg
        document.querySelector('#backgroundInstructions').classList = '';
        document.querySelector('#background-picker').classList = '';
        document.querySelector('#toCards').classList = 'button';
        
        //hide cards
        document.querySelector('#cardInstructions').classList = 'hidden';
        document.querySelector('#card-picker').classList = 'hidden';

        //hide info
        document.querySelector('#toSubmit').classList = "";
        document.querySelector('#form').classList = "hidden";

        //close card
        //toggleCard(false);

        //back button
        document.querySelector('#backButton').style.opacity = 0;
        document.querySelector('#backButton').style.pointerEvents= "none";


        break;
        case "card":
        //hide bg
        document.querySelector('#backgroundInstructions').classList = 'inactive';
        document.querySelector('#background-picker').classList = 'hidden';
        document.querySelector('#toCards').classList = 'hidden';
        
        //show cards
        document.querySelector('#cardInstructions').classList = '';
        document.querySelector('#card-picker').classList = '';
        document.querySelector('#toInfo').classList = 'button';
        if( !hasSelectedCard ){
            document.querySelector('#toInfo').classList.add('disabled');
        }
        //hide info
        
        document.querySelector('#toSubmit').classList = "";
        document.querySelector('#form').classList = "hidden";

        //close card
        //toggleCard(false);

        //backbutton 
        document.querySelector('#backButton').style.opacity = 0.49;
        document.querySelector('#backButton').style.pointerEvents= "auto";
        goto = "background";
        

        break;
        case "info":
        //hide bg
        document.querySelector('#backgroundInstructions').classList = 'inactive';
        document.querySelector('#background-picker').classList = 'hidden';
        document.querySelector('#toCards').classList = 'hidden';

        //hide card
        document.querySelector('#cardInstructions').classList = 'inactive';
        document.querySelector('#card-picker').classList = 'hidden';
        document.querySelector('#toInfo').classList = 'hidden';

        //show info
        document.querySelector('#toSubmit').classList = "button";
        document.querySelector('#form').classList = "";
        document.querySelector('#insideCard').style.opacity = 1;//first time going to the info, make the inside card visible;

        //open card
        toggleCard(true);

        
        //backbutton 
        document.querySelector('#backButton').style.opacity = 0.49;
        document.querySelector('#backButton').style.pointerEvents= "auto";
        goto = "card";
        //turn on snow
        if( !document.querySelector('#snowCanvas') ){//only add if snowcanvas exists
            stopSnow = initSnow && initSnow(document.querySelector('#cardPreview'));
        }
        break;
    }
}
var stopSnow;

function toggleCard(force){
    cardIsOpen = force || !cardIsOpen;
    if(cardIsOpen){
        document.querySelector('#actualCardPreview-cover').classList.add("open");
        document.querySelector('#actualCardPreview-inside-left').classList.add("open");
        document.querySelector('#actualCardPreview-inside-right').classList.add("open");
        document.querySelector('#insideCard').classList.add("open");
        
    }else{
        document.querySelector('#actualCardPreview-cover').classList.remove("open");
        document.querySelector('#actualCardPreview-inside-left').classList.remove("open");
        document.querySelector('#actualCardPreview-inside-right').classList.remove("open");
        document.querySelector('#insideCard').classList.remove("open");
    }
}

var input = document.querySelector('#imgupload');
input.addEventListener('change', updateImageDisplay);

function updateImageDisplay(){
    var src = input.files;

    var image = document.querySelector('#preview');
    image.style.opacity = 1;
    image.src = window.URL.createObjectURL(src[0]);
    showCardLogo(window.URL.createObjectURL(src[0]));
    document.querySelector('#addComp').style.opacity = 0;


}
/*
var form = document.getElementById("createCardForm");

document.getElementById("toSubmit").addEventListener("click", function () {
  form.submit();
});
*/
var prv = document.querySelector('#cardPreview');

document.querySelectorAll('.bg-images').forEach(x => { 
    x.addEventListener('click', function(){
        var imageLocation = this.parentElement.getAttribute("for");
        prv.style.backgroundImage = `url(${imageLocation})`;
        document.querySelector('#toCards').classList.remove('disabled');
    })})


var cardprv = document.querySelector('#actualCardPreview-cover');
var cardprvInsideLeft = document.querySelector('#actualCardPreview-inside-left');
var cardprvInsideRight = document.querySelector('#actualCardPreview-inside-right');

document.querySelectorAll('.card-images').forEach(x => { 
    x.addEventListener('click', function(){
        var style = this.parentElement.getAttribute("styleAttr");
        document.querySelector('h4').classList = style;
        document.querySelector('h5').classList = style;

        var imageLocation = this.parentElement.getAttribute("for");
        cardprv.src = imageLocation;

        var insideLeftLocation = imageLocation.replace('_cover', "_inside_left");
        var insideRightLocation = imageLocation.replace('_cover', "_inside_right");
        cardprvInsideLeft.src = insideLeftLocation;
        cardprvInsideRight.src = insideRightLocation;
        hasSelectedCard = true;
        document.querySelector('#toInfo').classList.remove('disabled');
    })})

    var cardURL = "";
    var currentURL = "";
    var currentMessage = "";
    
    document.querySelector('#cardURL').addEventListener('click', function(){
        window.open(cardURL,'_blank');
    })
    document.querySelector('#facebook').addEventListener('click', function(){
        var atag = document.querySelector('#facebook').parentNode;
        currentURL = "https://www.facebook.com/sharer/sharer.php?u="+cardURL; //currentURL

        atag.setAttribute("target", "_blank");
        atag.setAttribute("href", `${currentURL}`);
        atag.setAttribute("OnClick", `window.open("${currentURL}",'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250');`);
    })
    document.querySelector('#twitter').addEventListener('click', function(){
        var atag = document.querySelector('#twitter').parentNode;
        currentURL = `https://twitter.com/share?text=${currentMessage}&url=${cardURL}&hashtags=XaraGroup`; //currentURL

        atag.setAttribute("target", "_blank");
        atag.setAttribute("href", `${currentURL}`);
        atag.setAttribute("OnClick", `var wind = window.open("${currentURL}",'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250'); wind.location.reload();`);
    })
    document.querySelector('#linkedin').addEventListener('click', function(){
        var atag = document.querySelector('#linkedin').parentNode;
        currentURL = `https://www.linkedin.com/shareArticle?mini=true&url=${cardURL}&title=${"Winter season E-card"}&summary=${currentMessage}`; //currentURL
        atag.setAttribute("target", "_blank");
        atag.setAttribute("href", `${currentURL}`);
        atag.setAttribute("OnClick", `window.open("${currentURL}",'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=530');`);
    })
    document.querySelector('#pinterest').addEventListener('click', function(){
        var atag = document.querySelector('#pinterest').parentNode;
        currentURL = `https://pinterest.com/pin/create/button/?url=${cardURL}&description=${currentMessage}`; //currentURL
        atag.setAttribute("target", "_blank");
        atag.setAttribute("href", `${currentURL}`);
        atag.setAttribute("OnClick", `window.open("${currentURL}",'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=940');`);
    })


function sendForm(){
    var formData = new FormData(document.querySelector('#createCardForm'));
    var xhr = new XMLHttpRequest;
    var emailInput = document.querySelector('#emailInput')
    if(emailInput.value == ""){
        alert('Please insert an email address.');
        emailInput.style.backgroundColor = "lightyellow";
        return;
    }
    
    xhr.responseType = 'json';    
    var cardBig = document.querySelector("h4").innerHTML;
    var cardStyle = document.querySelector("h4").getAttribute('class');
    var cardSig = document.querySelector("h5").innerHTML;
    var isSnowing = !!document.querySelector('#snowCanvas');
    formData.append("message", cardBig);
    formData.append("signature", cardSig);
    formData.append("snowing", isSnowing);
    formData.append("cardStyle", cardStyle);
    
    xhr.onload  = function() {
        currentURL = cardURL = window.location.href + xhr.response.url;
        currentMessage = xhr.response.message;
        document.querySelector('#cardURL').textContent = cardURL;
        toggleShare(true);

    };

    xhr.open('post', '/fileupload', true);
    xhr.send(formData);
}

function sendEmails(){
    var formData = new FormData(document.querySelector('#sendEmailForm'));
    var xhr = new XMLHttpRequest;
    var firstInput = document.querySelector('#sendEmailForm > input');

    if(firstInput.value == ""){
        alert('Please insert at least one email address.');
        firstInput.style.backgroundColor = "lightyellow";
        return;
    }
    
    xhr.responseType = 'json';
    
    xhr.onload  = function() {
        document.querySelector('#sendEmailButton').textContent = "Emails sent"
    };

    xhr.open('post', '/sendEmails', true);
    xhr.send(formData);
}




var share = document.querySelector('#sharePanel');
var cover = document.querySelector('#cover');
function toggleShare(bool){
    if(bool){
        cover.style.display = "block";
        share.style.display = "block";
    }else {
        cover.style.display = "none";
        share.style.display = "none";
    }
}

document.querySelector('#cover').addEventListener('click', function(){ toggleShare(false)});

var cardIsOpen = false;
document.querySelector('#actualCardPreview-inside-left').addEventListener('click', function(){ 
    toggleCard(false)
});

document.querySelector('#actualCardPreview-cover').addEventListener('click', function(){ 
    toggleCard(true)
});


document.querySelector('#closeShare').addEventListener('click', function(){
    toggleShare(false)
});

var logoPrev = document.querySelector('#logoPreview');
var logoShowing = true;
var signature = document.querySelector('h5');
var message = document.querySelector('h4');

document.querySelector('#logoPreview').addEventListener('click', function(){
    logoPrev.style.display = "none";
    signature.style.height = "25%";
    signature.style.top = "70%";
    message.style.height = "55%";
    logoShowing = !logoShowing;
})

function showCardLogo(src){
    logoPrev.src = src;
    logoPrev.style.display = "block";
    signature.style.height = "15%";
    signature.style.top = "57%";
    message.style.height = "42%";
    logoShowing = !logoShowing;

}


document.querySelector('#coverButton').addEventListener('click', function(){
    //document.querySelector('#welcomePanel').style.top = "-100vh";
    document.querySelector('#welcomePanel').style.opacity = 0;
    document.querySelector('#welcomePanel').style.pointerEvents = "none";
})


function imageExist(bool){
    if(bool){

    }else{}
}