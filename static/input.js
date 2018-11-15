var backgrounds = document.querySelectorAll('.bg-images');
var cards = document.querySelectorAll('.card-images');
var cardPreview = document.querySelector('#cardPreview');

var currentBackground, currentCard, currentEffect = document.querySelector('#effect');


backgrounds.forEach(background => {
    background.addEventListener('click', moveToCenter.bind({ cont: document.querySelector('#background-picker'), el: background }
    ));

    background.addEventListener('click', function () {
        var imageLocation = this.parentElement.getAttribute("for");

        if (document.querySelector('#background')) {
            document.querySelector('#background').remove();
        }

        cardPreview.innerHTML = getBackgroundDomTemplate(imageLocation) + cardPreview.innerHTML;
        document.querySelector('#toCards').classList.remove('disabled');
    });
})

cards.forEach(card => {
    card.addEventListener('click', moveToCenter.bind({ cont: document.querySelector('#card-picker'), el: card }
    ));

    card.addEventListener('click', function () {
        hasSelectedCard = true;
        var imageLocation = this.parentElement.getAttribute("for");

        if (document.querySelector('#card')) {
            document.querySelector('#card').remove();
        }

        cardPreview.innerHTML = cardPreview.innerHTML + getCardDomTemplate(imageLocation);
        resizeCard(imageLocation);
        document.querySelectorAll('.autoFIT').forEach(element => {
            initAutofit(element);
        });
        document.querySelector('#toInfo').classList.remove('disabled');
        window.removeEventListener('resize', resizeCard);
        window.addEventListener('resize', resizeCard.bind(imageLocation));
    });
});



function moveToCenter() {
    var container = this.cont.getBoundingClientRect(); //dimensions for wrapper

    var el = this.el; //element to be centered
    var size = el.getBoundingClientRect();
    var max = container.width - window.innerWidth + 50;

    var wantedLeft = (window.innerWidth / 2) - (size.width / 2);
    var current = container.left;

    var diff = size.left - wantedLeft; //diff between its current pos and wantedPos

    var setValue = current - diff;
    if (setValue > 0) {
        setValue = 0;
    }

    if (setValue < -max) {
        setValue = -max;
    }


    this.cont.style.left = `${setValue}px`;
};



function hideWelcomePanel() {
    document.querySelector('#welcomePanel').style.opacity = 0;
    document.querySelector('#welcomePanel').style.pointerEvents = "none";
};









var currentStep = "background";
document.getElementById("backButton").addEventListener('click', function () { goToStep(currentStep) });



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
            document.querySelector('#backButton').style.opacity = 0.49;
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
            document.querySelector('#backButton').style.opacity = 0.49;
            document.querySelector('#backButton').style.pointerEvents = "auto";
            currentStep = "card";
            //turn on snow
            if (!document.querySelector('#snowCanvas')) {//only add if snowcanvas exists
                stopSnow = initSnow && initSnow(document.querySelector('#cardPreview'));
            }
            break;
    }
}



function resizeCard(title) {
    var card = document.querySelector('#card');
    if(!card){
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


function setCardTo(state){
    var card = document.querySelector('#card');
    if(state == "open"){
        card.classList.add('open');
    }
    if(state == "close"){
        card.classList.remove('open');
    }
}

var input = document.querySelector('#imgupload');
input.addEventListener('change', updateImageDisplay);

function updateImageDisplay(){
    var src = input.files;

    var image = document.querySelector('#preview');
    image.style.opacity = 1;
    image.src = window.URL.createObjectURL(src[0]);
    document.querySelector('#addComp').style.opacity = 0;
    
    document.querySelector('#logoPreview').src = window.URL.createObjectURL(src[0]);
    document.querySelector('#logoPreview').style.display = "block";
    this.value = null;
}

function removeLogo(el){
    document.querySelector('#logoPreview').style.display = "none";
};


//AUTOFIT

function isOverflowing(element){
    return element.scrollHeight > element.clientHeight; //|| element.scrollWidth > element.clientWidth;
}

function autofit(element) {
    var limit = 100;
    if(element.innerText == ""){
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

    window.addEventListener('resize', function(){
        autofit(element);
        autofit(element);
    })

    autofit(element);
};