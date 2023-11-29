import sinon from 'sinon'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import mongoose, { ClientSession } from 'mongoose'

import { IPokemonRepository } from '@/core/repositories/pokemon-repository'
import { CreatePokemon } from '../../../../src/core/use-cases/pokemon/create-pokemon'
import PokemonRepository from '../../../../src/data-providers/repositories/mongoose/pokemon-repository'
import { Pokemon } from '../../../../src/core/entities/pokemon'
import { mockPokemon, mockCreatePokemon } from '../../../mocks/pokemon'

chai.use(chaiAsPromised)

describe('Create Pokémon', () => {
  const sandbox = sinon.createSandbox()

  let pokemonRepository: IPokemonRepository
  let createPokemon: CreatePokemon

  beforeEach(() => {
    pokemonRepository = new PokemonRepository()

    createPokemon = new CreatePokemon(
      pokemonRepository
    )

    sandbox.stub(mongoose, 'startSession').resolves({
      startTransaction: () => sandbox.stub(),
      commitTransaction: () => sandbox.stub().resolves({}),
      abortTransaction: () => sandbox.stub().resolves({}),
      endSession: () => sandbox.stub().resolves(),
    } as unknown as ClientSession)

    let pokemon = new Pokemon()

    sandbox.stub(PokemonRepository.prototype, 'create').resolves(pokemon)
  })

  afterEach(() => sandbox.restore())

  context('Create Pokémon', () => {
    it('should create a new pokémon', async () => {
      const result = await createPokemon.execute(mockCreatePokemon)
      expect(result.basicForm).to.deep.equals(mockCreatePokemon.basicForm)
    })
  })
})
