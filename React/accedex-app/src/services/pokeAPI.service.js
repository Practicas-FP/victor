const urlBase = 'https://pokeapi.co/api/v2';

var nextOffset = 0;
var previousOffset = 0;

export var loadingData = true;
export var noDataFound = false;

export var message = '';

export var pokemonsList = new Array();
export var pokemon;

export async function getPokemonList(offset, limit) {
    clearPokemonsList();

    await fetch(`${urlBase}/pokemon?offset=${offset}&limit=${limit}`)
        .then(res => res.json())
        .then(data => {
            if (data.next) nextOffset = parseInt(data.next.substring(data.next.search('=') + 1, data.next.search('&')));

            if (data.previous) previousOffset = parseInt(data.previous.substring(data.previous.search('=') + 1, data.previous.search('&')));

            data.results.forEach(pokemon => {
                getPokemonForList(parseInt(pokemon.url.split('/')[6]))
            });
        })
        .catch(err => {
            message = 'No pokemon found.';
            noDataFound = true;
        })
        .finally(() => {
            loadingData = false;
        });
}

async function getPokemonForList(id) {
    await fetch(`${urlBase}/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            pokemonsList.push({
                'id': data.id,
                'name': data.name,
                'type': data.types[0].type.name,
                'sprite': data.sprites.front_default
            });
        })
        .catch(err => {
            console.error(err);
        });
}

function clearPokemonsList() {
    pokemonsList = [];
}

export async function getPokemon(param) {
    clearPokemon();

    await fetch(`${urlBase}/pokemon/${param}`)
        .then(res => res.json())
        .then(data => {
            dataToJson(data);            
        })
        .catch(err => {
            message = 'No pokemon found';
            noDataFound = true;
        })
        .finally(() => {
            loadingData = false;
        });
}

function clearPokemon() {
    pokemon = null;
}

function dataToJson(data) {
    const moves = new Array();
    data.moves.forEach(move => moves.push(move.move.name));

    const types = new Array();
    data.types.forEach(type => types.push(type.type.name))

    const stats = new Array();
    data.stats.forEach(stat => stats.push(
        { name: stat.stat.name, baseStat: stat.base_stat},
    ));

    const sprites = new Array();
    if (data.sprites.front_default)         sprites.push({ name: 'front_default', sprite: data.sprites.front_default });
    if (data.sprites.back_default)          sprites.push({ name: 'back_default', sprite: data.sprites.back_default });
    if (data.sprites.front_female)          sprites.push({ name: 'front_female', sprite: data.sprites.front_female });
    if (data.sprites.back_female)           sprites.push({ name: 'back_female', sprite: data.sprites.back_female });
    if (data.sprites.front_shiny)           sprites.push({ name: 'front_shiny', sprite: data.sprites.front_shiny});
    if (data.sprites.back_shiny)            sprites.push({ name: 'back_shiny', sprite: data.sprites.back_shiny});
    if (data.sprites.front_shiny_female)    sprites.push({ name: 'front_shiny_female', sprite: data.sprites.front_shiny_female});
    if (data.sprites.back_shiny_female)     sprites.push({ name: 'back_shiny_female', sprite: data.sprites.back_shiny_female});

    pokemon = {
        'id': data.id,
        'name': data.name,
        'height': data.height,
        'weight': data.weight,
        'baseExperience': data.base_experience,
        'moves': moves,
        'types': types,
        'stats': stats,
        'sprites': sprites
    };

    //console.log('Pokemon obtenido: '); console.log(pokemon);
}