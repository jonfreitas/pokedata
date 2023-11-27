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

    const basePokemon = await this.pokemonRepository.get(pokemon.id)

    if (basePokemon.level !== undefined && pokemon.level < basePokemon.level) {
      pokemon.updated = false
      pokemon.responseMessage = `O pokémon não pode involuir!`

      return pokemon
    }

    if (pokemon.hasMoreEvolution !== undefined && pokemon.level >= basePokemon.finalFormEvolutionLevel && pokemon.hasMoreEvolution === true) {
      pokemon.updated = false
      pokemon.responseMessage = `O pokémon não pode mais evoluir!`

      return pokemon
    }

    await this.pokemonRepository.update(pokemon)
    if (!pokemon) {
      throw new ModelNotFound(`O pokémon ${pokemon.id} não foi encontrado.`)
    }

    if (pokemon.level < basePokemon.middleFormEvolutionLevel) {
      pokemon.name = basePokemon.basicForm
      pokemon.updated = true
      pokemon.responseMessage = `Os dados do seu pokémon foram atualizados com sucesso. Ele está ficando mais forte e em breve atingirá sua forma média!`

      return pokemon
    }

    if (pokemon.level >= basePokemon.middleFormEvolutionLevel && pokemon.level < basePokemon.finalFormEvolutionLevel) {
      pokemon.name = basePokemon.middleForm
      pokemon.updated = true
      pokemon.responseMessage = `Os dados do seu pokémon foram atualizados com sucesso. Ele evoluiu e atingiu a sua forma média!`

      return pokemon
    }

    if (pokemon.level >= basePokemon.finalFormEvolutionLevel) {
      pokemon.name = basePokemon.finalForm
      pokemon.updated = true
      pokemon.responseMessage = `Os dados do seu pokémon foram atualizados com sucesso. Ele não possui mais evolução, pois atingiu a sua forma final!!`

      return pokemon
    }
  }
}
