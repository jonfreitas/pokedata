import { Pokemon } from "../../../src/core/entities/pokemon"
import { expect } from "chai"

describe(Pokemon.name, () => {
  let pokemon: Pokemon

  beforeEach(() => {
    pokemon = new Pokemon()
    pokemon.id = '6564ce8f9ce02d2cca8869c6'
    pokemon.name = 'Eiiiii'
  })

  it('should check pokémon all properties', () => {
    expect(pokemon.id).to.equal('6564ce8f9ce02d2cca8869c6')
    expect(pokemon.name).to.equal('Eiiiii')
    expect(pokemon.id).to.have.length(24)
  })
})
