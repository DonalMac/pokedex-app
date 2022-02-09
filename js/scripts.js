// array of objects
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
]

// for loop loops through length of array
for (let i = 0; i < pokemonList.length; i++) {
  // writes the pokemon name and height
  document.write(pokemonList[i].name + ' height:(' + pokemonList[i].height + ')')

  // if the pokemon is larger writes is a larger Pokemon
  if (pokemonList[i].height > '0.6') {
    document.write(" Wow that's Big!!! <br>")

    // if the pokemon is smaller writes is a smaller Pokemon
  } else {
    document.write(' is a smaller Pokemon <br>')
  }
}
