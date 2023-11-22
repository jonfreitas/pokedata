/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { IPokemonRepository } from '../../repositories/pokemon-repository'
import { Pokemon } from '../../entities/pokemon'
import { IUpdatePokemon } from './interfaces/update-pokemon'
import InvalidArgument from '../../entities/error/invalid-argument'
import ModelNotFound from '../../entities/error/model-not-found'

export class UpdatePokemon implements IUpdatePokemon {
  private pokemonRepository: IPokemonRepository

  constructor(
    pokemonRepository: IPokemonRepository
  ) {
    this.pokemonRepository = pokemonRepository
  }

  async execute(pokemon: Pokemon): Promise<Pokemon> {
    if (!pokemon.id || !pokemon.level || !pokemon.basicForm) throw new InvalidArgument('The fields id, basicForm and level are required')
    
    await this.pokemonRepository.update(pokemon)
    if (!pokemon) {
      throw new ModelNotFound(`The Message model: ${pokemon.id} not be found`)
    }
    return pokemon
  }
}
