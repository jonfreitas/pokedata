/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { IPokemonRepository } from '../../repositories/pokemon-repository'
import { Pokemon } from '../../entities/pokemon'
import { ICreatePokemon } from './interfaces/create-pokemon'
import InvalidArgument from '../../entities/error/invalid-argument'

export class CreatePokemon implements ICreatePokemon {
  private pokemonRepository: IPokemonRepository

  constructor(
    pokemonRepository: IPokemonRepository
  ) {
    this.pokemonRepository = pokemonRepository
  }

  async execute(pokemon: Pokemon): Promise<Pokemon> {
    if (!pokemon.basicForm || !pokemon.ability) throw new InvalidArgument(`Os campos 'basicForm' e 'ability' são obrigatórios!`)

    pokemon.id = (await this.pokemonRepository.create(pokemon)).id
    return pokemon
  }
}
