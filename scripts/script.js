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



