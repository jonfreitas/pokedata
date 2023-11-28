import sinon from 'sinon'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import PokemonRepository from '@/data-providers/repositories/mongoose/pokemon-repository'
import { Pokemon } from '@/core/entities/pokemon'
import { GetPokemon } from '@/core/use-cases/pokemon/get-pokemon'
import ModelNotFound from '@/core/entities/error/model-not-found'

chai.use(chaiAsPromised)

describe('Get Pokémon', () => {
  const sandbox = sinon.createSandbox()
  const pokemonRepository = new PokemonRepository()

  let pokemonRepositoryFake: sinon.SinonStub
  let getPokemon: GetPokemon

  beforeEach(() => {
    sandbox.restore()
    pokemonRepositoryFake = sandbox.stub(pokemonRepository, 'get')
    getPokemon = new GetPokemon(pokemonRepository)
  })

  it("should return error if pokémon not exists", async () => {
    const fakeId = '64dcf45b6c25ed4682892bbc'
    pokemonRepositoryFake.resolves(undefined)
    try {
      await getPokemon.execute(fakeId)
    } catch (e) {
      expect(e).instanceOf(ModelNotFound)
      expect(e.message).eq(`O pokémon não foi encontrado com o id ${fakeId}`)
    }
  })

  it("should return pokémon by id", async () => {
    const fakeId = '6564ce8f9ce02d2cca8869c6'
    const keyAsset = 'keyAsset'
    pokemonRepositoryFake.resolves({ id: fakeId, content: { asset: keyAsset } } as unknown as Pokemon)
    const data = await getPokemon.execute(fakeId)

    expect(data.id).equal(fakeId)
    sinon.assert.calledOnce(pokemonRepositoryFake)
  })
})
