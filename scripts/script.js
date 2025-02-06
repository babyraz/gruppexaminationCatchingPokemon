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
        checkGameOver(); //Kontrollera om spelet är slut
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
const pokemonImages = document.getElementById('pokemonimgs');
const showHighScore = document.getElementById('highScore');


function initiateGame() {
    playGameMusic();
    formWrapper.classList.add('d-none'); // Göm formuläret
    gameField.classList.remove('d-none'); // Visa spelplanen
    pokemonImages.classList.remove('d-none');

    startTimer();

    placePokemonRandomly();
    updatePokemonPositions();

    function updatePokemonPositions() {
        placePokemonRandomly();
        setInterval(placePokemonRandomly, 3000); // Uppdatera var tredje sekund
    }
}


let gameMusic = new Audio("assets/pokemon_vs_trainer.mp3");

function playGameMusic(){
    gameMusic.loop = true; // Gör att musiken loopas
    gameMusic.volume = 0.2; // Justera volymen om det behövs (0.0 - 1.0)
    gameMusic.play().catch(error => console.log("Kunde inte spela upp musiken:", error));
}

//Kollar om alla Pokémons är i pokebollar för att avsluta spelet
function checkGameOver() {

    const allCaught = Array.from(pokemon).every(poke => poke.src.endsWith("ball.webp"));
    if (allCaught) {
        stopTimer(); // Stoppa timern
        const formattedTime = parseFloat(timer).toFixed(1); // Avrundar tiden till en decimal

        // Visar en text med på hur lång tid spelaren fångade alla pokemons
        document.getElementById('winMsg').innerText = `You caught all pokémon in ${formattedTime} seconds!`;

        saveHighScore(); // Spara highscore
        setTimeout(() => {
            gameMusic.pause(); // Stoppa musiken
            pokemonImages.classList.add('d-none'); // Dölj Pokémon-bilderna
            gameField.classList.add('d-none'); // Dölj spelplanen
            showHighScore.classList.remove('d-none'); // Visa highscore-sidan
        }, 200); // Ge lite mer tid för att säkerställa att allting stängs av ordentligt
    }
}

let timer = 0;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timer += 0.1; // Öka med 0.1 sekunder varje gång (100 ms)
    }, 100); // Uppdatera varje 100 ms
}

function stopTimer() {
    clearInterval(timerInterval);
    //timer = timer.toFixed(1); // Visa 4 decimaler när spelet är slut


}

function validateForm(){
    if (validateName() && validateAge() && validateGender()){
        
        initiateGame();
    }
}

function saveHighScore() {
    let highScore = JSON.parse(localStorage.getItem('highScores')) || [];
    // Säkerställ att alla poäng är nummer
    highScore = highScore.map(score => Number(score));

    highScore.push(Number(timer)); // Lägg till den aktuella timern
    highScore.sort((a, b) => a - b); // Sortera i stigande ordning
    highScore = highScore.slice(0, 10); // Behåll bara de 5 bästa tiderna
    localStorage.setItem('highScores', JSON.stringify(highScore));
    displayHighScores(); // Visa uppdaterad highscore
}

function displayHighScores() {
    console.log(localStorage.getItem('highScores')) 
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highscoreList = document.getElementById('highscoreList');
    highscoreList.innerHTML = ''; // Töm listan

    highScores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `Placering ${index + 1}: ${score.toFixed(1)}s`; // Visa med 4 decimaler
        highscoreList.appendChild(li);
    });
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

// Laddar om sidan när spelaren trycker på Spela igen-knappen

document.addEventListener("DOMContentLoaded", function() { // Väntar tills hela HTML-dokumentet har laddats och DOM-strukturen är redo innan JavaScript-koden körs.
    document.getElementById("playAgainBtn").addEventListener("click", function() {
        location.reload(); // Laddar om sidan när knappen klickas.
    });
});
