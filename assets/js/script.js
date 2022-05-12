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

// Função do filtro de pesquisas;
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

// Atualizar a página;
document.querySelectorAll('.reload').forEach((item) => {
    item.addEventListener('click', () => {
        location.reload();
    })
})

// let body = document.querySelector('body');
// let toggleTheme = document.querySelector('.toggleTheme');
// let headerH1 = document.querySelector('.header h1');
// let iconLogoImg1 = document.querySelector('.icon-logo img:nth-child(1)');
// let iconLogoImg2 = document.querySelector('.icon-logo img:nth-child(2)');
// let toggleThemeSvg1 = document.querySelector('.toggleTheme svg:nth-child(1)');
// let toggleThemeSvg2 = document.querySelector('.toggleTheme svg:nth-child(2)');


// document.querySelector('.toggleTheme').addEventListener('click', (e) => {
//     console.log(toggleThemeSvg1.style.display);
//         body.style.backgroundColor = '#0f0f0f';
//         toggleTheme.classList.add('active');
//         headerH1.style.color = '#fff';
//         iconLogoImg1.style.display = 'none';
//         iconLogoImg2.style.display = 'inline';
//         toggleThemeSvg1.style.display = 'none';  
//         toggleThemeSvg2.style.display = 'inline';
    
// });

const html = document.querySelector('html')
const checkbox = document.querySelector('input[name="theme"]')

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)

const initialColors = {
    bg: getStyle(html, "--bg"),
    h1: getStyle(html, "--h1"),
    colorHeadings: getStyle(html, "--color-headings")
}

const darkMode = {
    bg: "#111111",
    h1: "#FFFFFF",
    colorHeadings: "#666666"
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
    if(target.checked == true) {
        document.querySelector('.icon-logo img:nth-child(1)').style.display = 'none';
        document.querySelector('.icon-logo img:nth-child(2)').style.display = 'inline';
    } else {
        document.querySelector('.icon-logo img:nth-child(1)').style.display = 'inline';
        document.querySelector('.icon-logo img:nth-child(2)').style.display = 'none';
    }
})