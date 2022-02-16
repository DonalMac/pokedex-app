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
  function add (item) {
    // validating type of passed parameter to be an object
    if (typeof item === 'object' && Object.keys(item)[0] === 'name') {
    pokemonList.push(item);
        document.write('Pokemon added <br>');
    } else {
      document.write('Not an object <br>');
    }
  }

  function getAll () {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

console.log(pokemonRepository.add({
  name: 'Zoey',
  height: 0.6,
  weight: 8.5,
  type: ['Baby']
}));

console.log(pokemonRepository.getAll());
// GetAll() called on repository and iterated through forEach loop
pokemonRepository.getAll().forEach(function (name) {
  // writes the pokemon name and height
  document.write(name.name + ' height:(' + name.height + ')');

  if (name.height > '0.6') {
    document.write(" Wow that's Big!!! <br>");

    // if the pokemon is smaller writes is a smaller Pokemon
  } else {
    document.write(' is a smaller Pokemon. <br>');
  }
});
