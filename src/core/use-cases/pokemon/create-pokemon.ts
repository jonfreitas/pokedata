/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { IPokemonRepository } from '../../repositories/pokemon-repository'
import { Pokemon } from '../../entities/pokemon'
import { ICreatePokemon } from './interfaces/create-pokemon'

export class CreatePokemon implements ICreatePokemon {
  private pokemonRepository: IPokemonRepository

  constructor(
    pokemonRepository: IPokemonRepository
  ) {
    this.pokemonRepository = pokemonRepository
  }

  async execute(pokemon: Pokemon): Promise<Pokemon> {
    pokemon.id = (await this.pokemonRepository.create(pokemon)).id
    return pokemon
  }
}
