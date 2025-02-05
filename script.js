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

prepGame()

function prepGame() {
    let startClick = document.getElementById('submitBtn');
    startClick.addEventListener("click", function(event) {
        event.preventDefault(); // Stoppar sidans omladdning
        validateForm();
    });
}

// Placerar ut pokemon random på spelplanen
function placePokemonRandomly() {
    // slumpmässiga värden för positionerna
    const gameFieldWidth = gameField.clientWidth; // Bredd på spelplanen
    const gameFieldHeight = gameField.clientHeight; // Höjd på spelplanen

    console.log("Game field width:", gameFieldWidth); // Felsökning
    console.log("Game field height:", gameFieldHeight); // Felsökning

    const pokemonWidth = 200;
    const pokemonHeight = 200;

    pokemon.forEach(pokemon => {
        const randomX = Math.floor(Math.random() * (gameFieldWidth - pokemonWidth));
        const randomY = Math.floor(Math.random() * (gameFieldHeight - pokemonHeight));

        // Sätt pokemonens position
        pokemon.style.left = `${randomX}px`;
        pokemon.style.top = `${randomY}px`;
});
}

// Funktion för att byta plats slumpmässigt
function updatePokemonPositions() {
    setInterval(placePokemonRandomly, 3000); // Uppdatera var tredje sekund
}

const formWrapper = document.getElementById('formWrapper');
const gameField = document.getElementById('gameField');
const pokemonImages = document.getElementById('pokemonimgs')


function initiateGame() {
    playGameMusic();
    formWrapper.classList.add('d-none'); // Göm formuläret
    gameField.classList.remove('d-none'); // Visa spelplanen
    pokemonImages.classList.remove('d-none');

    placePokemonRandomly();
    updatePokemonPositions();

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


