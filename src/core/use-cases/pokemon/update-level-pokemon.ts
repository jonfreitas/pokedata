/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { IPokemonRepository } from '../../repositories/pokemon-repository'
import { Pokemon } from '../../entities/pokemon'
import { IUpdateLevelPokemon } from './interfaces/update-level-pokemon'
import InvalidArgument from '../../entities/error/invalid-argument'
import ModelNotFound from '../../entities/error/model-not-found'

export class UpdateLevelPokemon implements IUpdateLevelPokemon {
  private pokemonRepository: IPokemonRepository

  constructor(
    pokemonRepository: IPokemonRepository
  ) {
    this.pokemonRepository = pokemonRepository
  }

  async execute(pokemon: Pokemon): Promise<Pokemon> {
    if (!pokemon.id || !pokemon.level) throw new InvalidArgument('The fields id and level is required')
    await this.pokemonRepository.updateLevel(pokemon)
    if (!pokemon) {
      throw new ModelNotFound(`The Message model: ${pokemon.id} not be found`)
    }
    return pokemon
  }
}
