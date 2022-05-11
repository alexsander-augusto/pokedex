// Função que recebe o ID como parâmetro e retorna essa URL;
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

// Cria um Array com 151 itens, e baseado nesse Array gera um novo Array com as Promises dos pokemons; 
const generatePokemonPromises = () => Array(151).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json())
);

// Recebe a invocação da generatePokemonPromises();
const pokemonPromises = generatePokemonPromises();

// Função que tem como responsabilidade gerar as <li>'s, retornando implicitamente uma Promise;
const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name);
    const multipleElementTypes = types.map((type, index) => `<p key="${index}" class="card-subtitle-text ${elementTypes[index]}">${type.type.name}</p>`);

    accumulator += `
        <li class="card ${elementTypes[0]}">
            <img class="card-image " alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" />
            <h2 class="card-title">${id}. ${name}</h2>
            <div class="card-subtitle">${multipleElementTypes.join('')}</div>
        </li>
        `;
    return accumulator;
}, '');

// Função que tem como responsabilidade inserir as <li>'s na página;
const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;
};

// Recebe um Array de Promises como argumento e quando todas as Promises desse Array 'pokemonPromises' estiverem resolvidas, essa expressão vai retornar uma Promise;
Promise.all(pokemonPromises)
.then(generateHTML)
.then(insertPokemonsIntoPage)

function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.querySelector('[data-js="pokedex"]');
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h2")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }