/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { IPokemonRepository } from '../../repositories/pokemon-repository'
import { Pokemon } from '../../entities/pokemon'
import { IGetPokemon } from './interfaces/get-pokemon'
import InvalidArgument from '../../entities/error/invalid-argument'
import ModelNotFound from '../../entities/error/model-not-found'

export class GetPokemon implements IGetPokemon {
  private pokemonRepository: IPokemonRepository

  constructor(
    pokemonRepository: IPokemonRepository
  ) {
    this.pokemonRepository = pokemonRepository
  }

  async execute(id: string): Promise<Pokemon> {
    if (!id) throw new InvalidArgument('The field id is required')

    const [pokemon] = await Promise.all([
      this.pokemonRepository.get(id),
    ])

    if (!pokemon) {
      throw new ModelNotFound(`The Message model: ${id} not be found`)
    }
    return pokemon
  }
}
