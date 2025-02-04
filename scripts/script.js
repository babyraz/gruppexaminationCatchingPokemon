const log = (msg) => console.log(msg);


// I denna fil skriver ni all er kod

//Hämta HTML-elementen
const pokemon = document.querySelectorAll(".pokemon");

// Generera array med 151 Pokémon
const allPokemons = [];
for (let i = 1; i <= 151; i++) {
    const number = i.toString().padStart(3, '0'); //i.toString() gör om i till en sträng och padStart() ser till att strängen alltid blir ett visst antal tecken långt, genom att lägga till nollor.
    allPokemons.push(`assets/pokemons/${number}.png`);
}

// Slumpa fram en pokemon och lagra original-URL:en
function randomPokemon(element) {
    const slumpIndex = Math.floor(Math.random() * allPokemons.length);
    const originalSrc = allPokemons[slumpIndex];
// Eftersom img-elementen i HTML är tomma måste vi ändra "ursprungsdatan" för att den ska kunna användas i catchPokemon-funktionen
    element.src = originalSrc;
    element.dataset.original = originalSrc; // Lagra original-URL:en
}

pokemon.forEach(poke => {
    randomPokemon(poke);
    poke.addEventListener("mouseenter", catchPokemon);
});

function catchPokemon(event) {
    const hoveredImg = event.target;
    if (hoveredImg.src.endsWith("ball.webp")) {
        if (hoveredImg.dataset.original) {
            hoveredImg.src = hoveredImg.dataset.original; // Återställ till ursprunglig Pokémon
        }
    } else {
        hoveredImg.src = "assets/ball.webp"; // Ändra till pokeboll
    }
}

/*
for (let i = 0; i < pokemon.length; i++) {
    randomPokemon(pokemon[i]);
}

//Pokémon fångas när spelaren hovrar över den med musen
pokemon.addEventListener("click", catchPokemon);

function catchPokemon(){

        pokemon.src = "assets/ball.webp" 
    
}*/


/*
Togglar mellan pokémon och pokéboll

function catchPokemon() {
    if (pokeball.src.endsWith("assets/pokemons/001.png")) {
        pokeball.src = "assets/ball.webp";
    } else {
        pokeball.src = "assets/pokemons/001.png";
    }
}
*/



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


