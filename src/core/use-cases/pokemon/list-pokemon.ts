/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { IPokemonRepository } from '../../repositories/pokemon-repository'
import { Pokemon } from '../../entities/pokemon'
import { IListPokemon } from './interfaces/list-pokemon'

export class ListPokemon implements IListPokemon {
  private pokemonRepository: IPokemonRepository

  constructor(
    pokemonRepository: IPokemonRepository
  ) {
    this.pokemonRepository = pokemonRepository
  }

  async execute(
    filter: Partial<Pokemon>
  ): Promise<Pokemon[]> {
    return await this.pokemonRepository.list(filter)
  }
}
