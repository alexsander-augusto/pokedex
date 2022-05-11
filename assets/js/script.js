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
            <h3># ${id}</h3>
            <h2 class="card-title">${name}</h2>
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

function filterPokemon() {
    var input, filter, ul, li, h2, txtValue;
    input = document.getElementById('filterTxt');
    filter = input.value.toUpperCase();
    ul = document.querySelector('[data-js="pokedex"]');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        h2 = li[i].getElementsByTagName("h2")[0];
        txtValue = h2.textContent || h2.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
};