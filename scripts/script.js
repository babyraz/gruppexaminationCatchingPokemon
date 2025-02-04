const log = (msg) => console.log(msg);

prepGame()

function prepGame(){
    let startClick = document.getElementById('submitBtn');
    startClick.addEventListener("click",  function(){
        event.preventDefault();
        validateForm()

    });
}

function initiateGame(){
    playGameMusic();

}

let gameMusic = new Audio("assets/pokemon_vs_trainer.mp3");


function playGameMusic(){
    gameMusic.loop = true; // Gör att musiken loopas
    gameMusic.volume = 0.5; // Justera volymen om det behövs (0.0 - 1.0)
    gameMusic.play().catch(error => console.log("Kunde inte spela upp musiken:", error));
}

function validateForm(){
    if (validateName() && validateAge() && validateGender()){
        alert('Välkommen till spelet!');
        initiateGame();

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
    let age = parseInt(document.getElementById('age').value); 

    
    if (isNaN(age)) {
        alert('Vänligen ange en ålder');
        return false;
    } else if (age < 10){
        alert('Du måste vara minst 10 år för att spela');
        return false;
    } else if (age > 15){
        alert('Du får inte vara äldre än 15 år');
        return false;
    }
    return true;
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