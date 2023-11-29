import sinon from 'sinon'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import mongoose, { ClientSession } from 'mongoose'

import PokemonRepository from '../../../../src/data-providers/repositories/mongoose/pokemon-repository'
import { ListPokemon } from '../../../../src/core/use-cases/pokemon/list-pokemon'
import { IPokemonRepository } from '../../../../src/core/repositories/pokemon-repository'

chai.use(chaiAsPromised)

describe('List Pokémon', () => {
  const sandbox = sinon.createSandbox()

  let pokemonRepository: IPokemonRepository
  let listPokemon: ListPokemon

  beforeEach(() => {
    pokemonRepository = new PokemonRepository()

    listPokemon = new ListPokemon(
      pokemonRepository
    )

    sandbox.stub(mongoose, 'startSession').resolves({
      startTransaction: () => sandbox.stub(),
      commitTransaction: () => sandbox.stub().resolves({}),
      abortTransaction: () => sandbox.stub().resolves({}),
      endSession: () => sandbox.stub().resolves(),
    } as unknown as ClientSession)

    sandbox.stub(PokemonRepository.prototype, 'list').resolves()
  })

  afterEach(() => sandbox.restore())

  context('List Pokémon', () => {
    it('should return list pokémons by abilities', async () => {
      const result= await listPokemon.execute({ abilities: ["Fire"] })
      expect(result).to.deep.equal(undefined)
    })

    it('should return list pokémons by more evolutions or not', async () => {
      const result = await listPokemon.execute({ hasMoreEvolution: false } )
      expect(result).to.deep.equals(undefined)
    })
  })

})
