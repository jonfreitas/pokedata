import sinon from 'sinon'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import PokemonRepository from '@/data-providers/repositories/mongoose/pokemon-repository'
import { ListPokemon } from '@/core/use-cases/pokemon/list-pokemon'
import { mockPokemon } from 'test/mocks/pokemon';

chai.use(chaiAsPromised)

describe('List Pokémon', () => {
  const sandbox = sinon.createSandbox()
  const pokemonRepository = new PokemonRepository()

  let pokemonListStub: sinon.SinonStub
  let listPokemon: ListPokemon

  beforeEach(() => {
    sandbox.restore()
    pokemonListStub = sandbox.stub(pokemonRepository, 'list')

    listPokemon = new ListPokemon(pokemonRepository)
  })

  it('should return list pokémons by abilities', async () => {
    const result = await listPokemon.execute({
      abilities: ["Fire"],
    })

    expect(result).to.deep.equal([mockPokemon])
  })

  it('should return list pokémons by more evolutions or not', async () => {
    const result = await listPokemon.execute({
      hasMoreEvolution: false,
    })

    expect(result).to.deep.equal([mockPokemon])
  })

})
