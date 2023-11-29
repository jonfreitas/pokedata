import sinon from 'sinon'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import PokemonRepository from '../../../../src/data-providers/repositories/mongoose/pokemon-repository'
import { UpdateLevelPokemon } from '../../../../src/core/use-cases/pokemon/update-level-pokemon'
import { mockPokemonToUpdateLevel } from '../../../mocks/pokemon'
import { Pokemon } from '@/core/entities/pokemon'

chai.use(chaiAsPromised)

describe('Update Level Pokémon', () => {
  const sandbox = sinon.createSandbox()
  const pokemonRepository = new PokemonRepository()

  let pokemonRepositoryFake: sinon.SinonStub
  let updateLevelPokemon: UpdateLevelPokemon

  beforeEach(() => {
    sandbox.restore()
    pokemonRepositoryFake = sandbox.stub(pokemonRepository, 'updateLevel')
    updateLevelPokemon = new UpdateLevelPokemon(pokemonRepository)
  })

  it("should update a pokémon level", async () => {
    pokemonRepositoryFake.resolves({
      id: mockPokemonToUpdateLevel.id,
      level: mockPokemonToUpdateLevel.level,
    } as unknown as Pokemon)
    const data = await updateLevelPokemon.executeForTest(mockPokemonToUpdateLevel)

    expect(data.id).equal(mockPokemonToUpdateLevel.id)
    expect(data.level).equal(mockPokemonToUpdateLevel.level)
    sinon.assert.calledOnce(pokemonRepositoryFake)
  })
})
