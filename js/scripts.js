// Pokemonlist wrapped in IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

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
    let container = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerHTML = pokemon.name;
    button.classList.add("JS-button");
    listItem.appendChild(button);
    container.appendChild(listItem);

    // add an event listener to the button that will show details of the pokemon when the button is clicked
    button.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

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

  function showModal(name, height, imageUrl, weight, types) {
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = name;

    let contentElement = document.createElement("p");
    contentElement.innerText = "Height: " + height;

    let weightElement = document.createElement("p");
    weightElement.innerText = "Weight: " + weight;

    let typesElement = document.createElement("p");
    typesElement.innerText = "Type(s): " + types.join(", ");

    // Create an <img> element
    let myImage = document.createElement("img");
    myImage.src = imageUrl;

    /*  let imageElement = document.createElement("img");
    imageElement.innerText = imageUrl;  */

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(myImage);
    modal.appendChild(contentElement);
    modal.appendChild(weightElement);
    modal.appendChild(typesElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  // function that gets pokemon details & prints pokemon name to console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
      showModal(
        pokemon.name,
        pokemon.height,
        pokemon.imageUrl,
        pokemon.weight,
        pokemon.types
      );
    });
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  modalContainer.addEventListener("click", e => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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

// GetAll() called on repository and iterated through forEach loop
pokemonRepository.getAll().forEach(function(pokemon) {
  // Creates a list of buttons for each pokemon in the repository
  pokemonRepository.addListItem(pokemon);
});
