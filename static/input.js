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
        document.querySelector('#infoInstructions').classList = "hidden";
        document.querySelector('#toSubmit').classList = "";
        document.querySelector('#form').classList = "hidden";

        //close card
        toggleCard(false);


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

        //hide info
        
        document.querySelector('#infoInstructions').classList = "hidden";
        document.querySelector('#toSubmit').classList = "";
        document.querySelector('#form').classList = "hidden";

        //close card
        toggleCard(false);

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
        document.querySelector('#infoInstructions').classList = "";
        document.querySelector('#form').classList = "";

        //open card
        toggleCard(true);

        //turn on snow
        stopSnow = initSnow && initSnow(document.querySelector('#cardPreview'));
        break;
    }
}
var stopSnow;

function toggleCard(bool){
    if(bool){
        document.querySelector('#actualCardPreview-cover').classList.add("open");
        document.querySelector('#actualCardPreview-inside-left').classList.add("open");
        document.querySelector('#actualCardPreview-inside-right').classList.add("open");
    }else{
        document.querySelector('#actualCardPreview-cover').classList.remove("open");
        document.querySelector('#actualCardPreview-inside-left').classList.remove("open");
        document.querySelector('#actualCardPreview-inside-right').classList.remove("open");
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
    })})


var cardprv = document.querySelector('#actualCardPreview-cover');
var cardprvInsideLeft = document.querySelector('#actualCardPreview-inside-left');
var cardprvInsideRight = document.querySelector('#actualCardPreview-inside-right');

document.querySelectorAll('.card-images').forEach(x => { 
    x.addEventListener('click', function(){
        var imageLocation = this.parentElement.getAttribute("for");
        cardprv.src = imageLocation;

        var insideLeftLocation = imageLocation.replace('_cover', "_inside_left");
        var insideRightLocation = imageLocation.replace('_cover', "_inside_right");
        cardprvInsideLeft.src = insideLeftLocation;
        cardprvInsideRight.src = insideRightLocation;
    })})

    var currentURL = "";
    
    document.querySelector('#cardURL').addEventListener('click', function(){
        window.open("/" + currentURL,'_blank');
    })


function sendForm(){
    var formData = new FormData(document.querySelector('#createCardForm'));
    var xhr = new XMLHttpRequest;
    
    xhr.responseType = 'json';    
    
    xhr.onload  = function() {
        currentURL = xhr.response.url;
        document.querySelector('#cardURL').textContent = currentURL;
        
        toggleShare(true);

        //alert(xhr.response);

    };

    xhr.open('post', '/fileupload', true);
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

var cardState = false;
document.querySelector('#cardPreview').addEventListener('click', function(){ 
    toggleCard(cardState)
    cardState = !cardState;
});

document.querySelector('#closeShare').addEventListener('click', function(){
    toggleShare(false)
});