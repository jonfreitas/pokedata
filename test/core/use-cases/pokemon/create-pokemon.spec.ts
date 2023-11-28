import sinon from 'sinon'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { IPokemonRepository } from '@/core/repositories/pokemon-repository'
import { CreatePokemon } from '@/core/use-cases/pokemon/create-pokemon'
import PokemonRepository from '@/data-providers/repositories/mongoose/pokemon-repository'
import { Pokemon } from '@/core/entities/pokemon'
import mongoose, { ClientSession } from 'mongoose'

chai.use(chaiAsPromised)

describe('Create Pokémon', () => {
  const sandbox = sinon.createSandbox()

  let pokemonRepository: IPokemonRepository
  let createPokemon: CreatePokemon
  let pokemon: Pokemon

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
      const result = await createPokemon.execute(pokemon)
      expect(result.id).to.deep.equals(pokemon.id)
    })
  })
})
