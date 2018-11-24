var backgrounds = document.querySelectorAll('.bg-images');
var cards = document.querySelectorAll('.card-images');
var cardPreview = document.querySelector('#cardPreview');
var backgroundFilters = document.querySelectorAll('.colorPickers');

var currentBackground, currentCard, currentEffect = document.querySelector('#effect');



backgrounds.forEach(background => {
    background.addEventListener('click', function () {
        var imageLocation = this.parentElement.getAttribute("for");

        if (document.querySelector('#background')) {
            document.querySelector('#background').remove();
        }

        var temp = document.createElement('div');
        cardPreview.prepend(temp);
        temp.outerHTML = getBackgroundDomTemplate(imageLocation);
        document.querySelector('#toCards').classList.remove('disabled');
    });
})

cards.forEach(card => {
    card.addEventListener('click', function () {
        hasSelectedCard = true;
        var imageLocation = this.parentElement.getAttribute("for");

        if (document.querySelector('#card')) {
            document.querySelector('#card').remove();
        }


        
        var temp = document.createElement('div');    
        cardPreview.append(temp);
        temp.outerHTML = getCardDomTemplate(imageLocation)    

        resizeCard(imageLocation);
        
        document.querySelectorAll('.autoFIT').forEach(element => {
            initAutofit(element);
        });

        setTimeout(function(){ //doubel check the autofit occurrs
            document.querySelectorAll('.autoFIT').forEach(element => {
                autofit(element);
            });
        },200);

        document.querySelector('#toInfo').classList.remove('disabled');
        window.removeEventListener('resize', resizeCard);
        window.addEventListener('resize', resizeCard.bind(imageLocation));
    });
    card.addEventListener('click', function () {
        var editables = document.querySelectorAll('[contenteditable=""]');
        editables.forEach(edit => {
            var destroy;
            edit.addEventListener('focus', function () {
                destroy = initTextEdits(this);
            });
            edit.addEventListener('blur', function () {
                destroy();
            })
        })
    })
});


backgroundFilters.forEach(filter => {

    filter.addEventListener('click', function () {
        var background = document.querySelector('#background');
        background.style.backgroundBlendMode = "multiply";
        background.style.backgroundColor = filter.style.backgroundColor;
    });
});

function hideWelcomePanel() {
    document.querySelector('#welcomePanel').style.opacity = 0;
    document.querySelector('#welcomePanel').style.pointerEvents = "none";
};










var hasSelectedCard = false;
var effectEnabled = false;
function goToStep(option) {


    switch (option) {
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
            document.querySelector('#backButton').style.pointerEvents = "none";


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
            if (!hasSelectedCard) {
                document.querySelector('#toInfo').classList.add('disabled');
            }
            //hide info

            document.querySelector('#toSubmit').classList = "";
            document.querySelector('#form').classList = "hidden";

            //close card
            //toggleCard(false);

            //backbutton 
            document.querySelector('#backButton').style.opacity = 0.9;
            document.querySelector('#backButton').style.pointerEvents = "auto";
            currentStep = "background";


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
            //open card
            setCardTo("open");
            //document.getElementById('effect').innerHTML = getEffectDomTemplate("snow");



            //backbutton 
            document.querySelector('#backButton').style.opacity = 0.9;
            document.querySelector('#backButton').style.pointerEvents = "auto";
            currentStep = "card";
            //turn on snow
            if (!document.querySelector('#snowCanvas') && initSnow) {//only add if snowcanvas exists
                stopSnow = initSnow(document.querySelector('#cardPreview'));
            }
            break;
    }
}



function resizeCard(title) {
    var card = document.querySelector('#card');
    if (!card) {
        return;
    } //if card doesn't exist yet

    var aspectR = window.innerWidth / window.innerHeight; // 1+ wider, 1- taller
    var cardParts = card.children; //all children element of the card
    switch (title) {
        default:
            [...cardParts].forEach(cardPart => {
                if (aspectR > 1.2) {
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


function setCardTo(state) {
    var card = document.querySelector('#card');
    if (state == "open") {
        card.classList.add('open');
        if (!document.querySelector('#snowCanvas')) {//only add if snowcanvas exists
            stopSnow = initSnow && initSnow(document.querySelector('#cardPreview'));
        }
    }
    if (state == "close") {
        card.classList.remove('open');
    }
}



//AUTOFIT

function isOverflowing(element) {
    return element.scrollHeight > element.clientHeight; //|| element.scrollWidth > element.clientWidth;
}

function autofit(element) {
    var limit = 100;
    if (element.innerText == "") {
        //if there is no text, exit immediately
        return;
    }
    element.innerText == element.innerText; //cant remember, but i don't think I'd add it in for shits and giggles?

    var size = parseInt(getComputedStyle(element).fontSize); //cache size

    //increase till it is overflowing
    var adjust = 0;
    while (!isOverflowing(element) && adjust < limit) {
        element.style.fontSize = (size++) + "px";
        adjust++;
    }

    //decrease until it isn't overflowing
    while (isOverflowing(element) && adjust < limit) {
        element.style.fontSize = (size--) + "px";
        adjust++;
    };
}


function initAutofit(element) {

    //change string identifier to object
    if (typeof element != "object") {
        element = document.querySelector(element);
    }

    element.addEventListener("paste", function (ev) {
        ev.preventDefault();
    });

    element.addEventListener("input", function () {
        autofit(element);
    });

    window.addEventListener('resize', function () {
        autofit(element);
        autofit(element);
    })

    autofit(element);
};


function initTextEdits(el) {
    console.log('build')
    /*
    var position = el.getBoundingClientRect();

    retun;// function to destroy;*/
    return function () { console.log('destroy') };
}


function sendForm() {
    var formData = new FormData(document.querySelector('#createCardForm'));
    var xhr = new XMLHttpRequest();
    var emailInput = document.querySelector('#emailInput');
    if (emailInput.value == "") {
        alert('Please insert an email address.');
        emailInput.style.backgroundColor = "lightyellow";
        return;
    }

    xhr.responseType = 'json';
    var cardContent = document.querySelector('#cardPreview').innerHTML.replace(/contenteditable/g, "").replace(/class="open"/g, "").replace(/.\/removeLogo.png/g, "");
    formData.append("cardContent", cardContent);

    xhr.onload = function () {
        currentURL = cardURL = window.location.href + xhr.response.url;
        document.querySelector('#cardURL').textContent = cardURL;
        document.querySelector('#cardURL').parentNode.href = cardURL;
        updateShareLinks(cardURL);
        toggleShare(true);
    };

    xhr.open('post', '/cardGenerator', true);
    xhr.send(formData);
}


function sendEmails(){
    var formData = new FormData();
    var xhr2 = new XMLHttpRequest();
    var emailInput = document.querySelector('#emailInput');

    xhr2.responseType = 'json';
    
    xhr2.onload  = function() {
        if(xhr2.response.err){
            document.querySelector('#sendEmailButton').textContent = "Hmm somethings gone wrong, try sharing it ";
        }else {
            document.querySelector('#sendEmailButton').textContent = "Email sent!";
        }
    };

    formData.append("email", emailInput.value);

    xhr2.open('post', '/sendEmails', true);
    xhr2.send(formData);
}

function updateShareLinks(cardURL) {

    var facebookURL = "https://www.facebook.com/sharer/sharer.php?u="+cardURL;
    var twitterURL = "https://twitter.com/share?text=Just created an E-card&url="+cardURL+"&hashtags=XaraGroup";
    var linkedinURL = "https://www.linkedin.com/shareArticle?mini=true&url"+cardURL+"&title=Xara E-card&summary=Just created my E-card";
    var pinterestURL = "https://pinterest.com/pin/create/button/?url="+cardURL+"&description=Just created my Xara E-card";


    document.querySelector('#facebook').parentNode.setAttribute("OnClick", `window.open("${facebookURL}",'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250');`);
    document.querySelector('#twitter').parentNode.setAttribute("OnClick", `window.open("${twitterURL}",'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=300');`);
    document.querySelector('#linkedin').parentNode.setAttribute("OnClick", `window.open("${linkedinURL}",'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=530');`);
    document.querySelector('#pinterest').parentNode.setAttribute("OnClick", `window.open("${pinterestURL}",'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=940');`);
}

function toggleSnow(){
    if(stopSnow){
        stopSnow();
        stopSnow = false;
        if (document.querySelector('#snowCanvas')) {//only add if snowcanvas exists
            document.querySelector('#snowCanvas').remove();
        }
        return;
    }
    stopSnow = initSnow(document.querySelector('#cardPreview'));
}