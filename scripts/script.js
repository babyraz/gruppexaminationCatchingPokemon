const log = (msg) => console.log(msg);

prepGame()

function prepGame(){
    let startClick = document.getElementById('submitBtn');
    startClick.addEventListener("click",  function(){
        validateForm()
    });
}


function validateForm(){
    if (validateName() && validateAge() && validateGender()){
        alert('Välkommen till spelet!');// 
    }
}


function validateName (){
    let namn = document.getElementById('nick').value.length;
    if (namn <5) {
        alert('Användarnamnet får inte understiga 5 bokstäver');
        return false;
    }
    else if(namn >10){
        alert('Användarnamnet får inte överstiga 10 bokstäver');
        return false;
    }
    else {
        return true;
    }
}

function validateAge(){
    let age = document.getElementById('age').value;

    if (age <10){
        alert('Du måste vara minst 10 år för att spela');
        return false;
    }
    else if (age >15){
        alert('Du får inte vara äldre än 15 år');
        return false;
    }
    else{
        return true;
    }
}

function validateGender() {
    let isBoy = document.getElementById('boy').checked;
    let isGirl = document.getElementById('girl').checked;

    if (!isBoy && !isGirl) {
        alert('Vänligen välj om du är pojke eller flicka.');
        return false;
    }
    return true;
}
