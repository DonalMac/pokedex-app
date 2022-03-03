// Pokemonlist wrapped in IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  // function to add a pokemon to the pokemonList
  function add(item) {
    // validating type of passed parameter to be an object & object keys are correct
    if (typeof item === "object" && "name" in item && "detailsUrl" in item) {
      pokemonList.push(item);
    } else {
      console.log(
        "error/why is this appearing?.....because you used add() and it doesnt havea Url key"
      );
    }
  }

  // function that creates a button as list item for a passed pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group"); // "pokemon-list" class from html (ul) is chosen via "let pokemonList"
    let listpokemon = document.createElement("li"); // list created via createElement
    let button = document.createElement("button"); // button created
    button.innerText = pokemon.name; // button text/description is the "name" of the pokemon
    button.classList.add("btn-outline-dark"); // css "my_button" is replaced by the Bootstrap 'btn-outline-dark' class
    listpokemon.classList.add("group-list-item"); // 'group-list-item' Bootstrap class added to the listpokemon
    listpokemon.appendChild(button); // button is added to the item list
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      // "Event" added. onClick calls showDetails
      showDetails(pokemon);
    });
  }
  // Loads the pokemons from the API. Promise extracts details witha forEach loop and saves to variable
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  // Promise extracts keys with a forEach loop and saves to variables
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = [];
        details.types.forEach(function(element) {
          pokemon.types.push(element.type.name);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // function loads pokemon details used in modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }
  // function saves details in variable and appends them to index modal elements
  function showModal(pokemon) {
    // showModal function
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    let pokemonName = $("<h2>" + pokemon.name + "</h2>");

    let pokemonHeight = $("<p>" + "Height: " + pokemon.height + "</p>");

    let pokemonWeight = $("<p>" + "Weight: " + pokemon.weight + "</p>");

    let typesElement = $("<p>" + "Types: " + pokemon.types.join(", ") + "</p>");

    let pokemonImage = $("<img class='pokemon-modal-image'>");
    pokemonImage.attr("src", pokemon.imageUrl); // pokemon image attribute loaded from 'item.imageUrl'

    modalTitle.empty(); // clears last clicked Pokemons title
    modalBody.empty(); // clears last clicked Pokemons body

    modalTitle.append(pokemonName); // pokemonName is displayed as the title in the modal
    modalBody.append(pokemonImage); // pokemonImage is displayed in the body of the modal
    modalBody.append(pokemonHeight); // pokemonHeight is displayed in the body of the modal
    modalBody.append(pokemonWeight); // pokemonWeight is displayed in the body of the modal
    modalBody.append(typesElement); // pokemonDetails are displayed in the body of the modal
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

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
