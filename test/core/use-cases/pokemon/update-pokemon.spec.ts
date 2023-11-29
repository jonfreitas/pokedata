import sinon from 'sinon'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import PokemonRepository from '../../../../src/data-providers/repositories/mongoose/pokemon-repository'
import { UpdatePokemon } from '../../../../src/core/use-cases/pokemon/update-pokemon'
import { Pokemon } from '../../../../src/core/entities/pokemon'
import { mockUpdatePokemon } from '../../../mocks/pokemon'

chai.use(chaiAsPromised)

describe('Update Pokémon', () => {
  const sandbox = sinon.createSandbox()
  const pokemonRepository = new PokemonRepository()

  let pokemonRepositoryFake: sinon.SinonStub
  let updatePokemon: UpdatePokemon

  beforeEach(() => {
    sandbox.restore()
    pokemonRepositoryFake = sandbox.stub(pokemonRepository, 'update')
    updatePokemon = new UpdatePokemon(pokemonRepository)
  })

  it("should update a pokémon", async () => {
    pokemonRepositoryFake.resolves({
      id: mockUpdatePokemon.id,
      name: mockUpdatePokemon.name,
      level: mockUpdatePokemon.level,
      basicForm: mockUpdatePokemon.basicForm,
      ability: mockUpdatePokemon.ability,
      middleFormEvolutionLevel: mockUpdatePokemon.middleFormEvolutionLevel,
      middleForm: mockUpdatePokemon.middleForm,
      finalFormEvolutionLevel: mockUpdatePokemon.finalFormEvolutionLevel,
      finalForm: mockUpdatePokemon.finalForm,
      hasMoreEvolution: mockUpdatePokemon.hasMoreEvolution
    } as unknown as Pokemon)
    const data = await updatePokemon.executeForTest(mockUpdatePokemon)

    expect(data.id).equal(mockUpdatePokemon.id)
    sinon.assert.calledOnce(pokemonRepositoryFake)
  })
})
