import sinon from 'sinon'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import mongoose, { ClientSession } from 'mongoose'

import PokemonRepository from '@/data-providers/repositories/mongoose/pokemon-repository'
import { UpdatePokemon } from '@/core/use-cases/pokemon/update-pokemon'
import { Pokemon } from '../../../../src/core/entities/pokemon'
import { mockPokemonToUpdateLevel } from '../../../mocks/pokemon'

chai.use(chaiAsPromised)

describe('Update Level Pokémon', () => {
  const sandbox = sinon.createSandbox()

  let pokemonRepositoryFake: sinon.SinonStub
  let updatePokemon: UpdatePokemon

  beforeEach(() => {
    sandbox.restore()
    const pokemonRepository = new PokemonRepository()

    sandbox.stub(pokemonRepository, 'updateLevel').resolves()

    sandbox.stub(mongoose, 'startSession').resolves({
      startTransaction: () => sandbox.stub(),
      commitTransaction: () => sandbox.stub().resolves({}),
      abortTransaction: () => sandbox.stub().resolves({}),
      endSession: () => sandbox.stub().resolves(),
    } as unknown as ClientSession)

    updatePokemon = new UpdatePokemon(
      pokemonRepository
    )
  })

  it("should update pokémon", async () => {
    pokemonRepositoryFake.resolves({
      id: mockPokemonToUpdateLevel.id,
      level: mockPokemonToUpdateLevel.level
    } as unknown as Pokemon)

    const data = await updatePokemon.execute(mockPokemonToUpdateLevel)

    expect(data.id).equal(mockPokemonToUpdateLevel.id)
    sinon.assert.calledOnce(pokemonRepositoryFake)
  })
})
