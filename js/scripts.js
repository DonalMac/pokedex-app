// Pokemonlist wrapped in IIFE
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      weight: 6.9,
      type: ['grass', 'poison']
    },

    {
      name: 'Blastoise',
      height: 1.6,
      weight: 85.5,
      type: ['water']
    },

    {
      name: 'Charmander',
      height: 0.6,
      weight: 8.5,
      type: ['fire']
    },

    {
      name: 'Squirtle',
      height: 0.5,
      weight: 9.0,
      type: ['water']
    },

    {
      name: 'Pikachu',
      height: 0.4,
      weight: 6.0,
      type: ['electric']
    },

    {
      name: 'Ditto',
      height: 0.3,
      weight: 4.0,
      type: ['normal']
    }
  ];

  // function to add a pokemon to the pokemonList
  function add (item) {
    // validating type of passed parameter to be an object & object keys are correct
    if (typeof item === 'object' &&
      'name' in item &&
      'height' in item &&
      'weight' in item &&
      'type' in item
    ) {
      pokemonList.push(item);
    }
  }

  function getAll () {
    return pokemonList;
  }

  // function that creates a button as list item for a passed pokemon
  function addListItem (pokemon) {
    let container = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerHTML = pokemon.name;
    button.classList.add('JS-button');
    listItem.appendChild(button);
    container.appendChild(listItem);
    // add an event listener to the button that will show details of the pokemon when the button is clicked
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }
  // function that gets pokemon details & prints pokemon name to console
  function showDetails (pokemon) {
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

// Practicing add function
pokemonRepository.add({
  name: 'Zoey',
  height: 0.6,
  weight: 8.5,
  type: ['Baby']
});

// GetAll() called on repository and iterated through forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
  // Creates a list of buttons for each pokemon in the repository
  pokemonRepository.addListItem(pokemon);
});
