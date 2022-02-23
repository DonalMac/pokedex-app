// Pokemonlist wrapped in IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll () {
    return pokemonList;
  }

  // function to add a pokemon to the pokemonList
  function add (item) {
    // validating type of passed parameter to be an object & object keys are correct
    if (typeof item === 'object' &&
     'name' in item &&
     'detailsUrl' in item
    ) {
      pokemonList.push(item);
    } else {
      console.log('error/why is this appearing?');
    }
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

  function loadList () {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails (pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // function that gets pokemon details & prints pokemon name to console
  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    getAll: getAll,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// GetAll() called on repository and iterated through forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
  // Creates a list of buttons for each pokemon in the repository
  pokemonRepository.addListItem(pokemon);
});
