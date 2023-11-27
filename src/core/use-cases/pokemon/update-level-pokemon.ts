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
    pokemonRepository: IPokemonRepository,
  ) {
    this.pokemonRepository = pokemonRepository
  }

  async execute(pokemon: Pokemon): Promise<Pokemon> {
    if (!pokemon.id || !pokemon.level) throw new InvalidArgument(`Os campos 'id' e 'level' são obrigatórios!`)

    const requestPokemon = await this.pokemonRepository.get(pokemon.id)

    if (requestPokemon.level !== undefined && pokemon.level < requestPokemon.level) {
      pokemon.updated = false
      pokemon.responseMessage = `O pokémon não pode involuir!`

      return pokemon
    }

    await this.pokemonRepository.updateLevel(pokemon)

    if (!pokemon) {
      throw new ModelNotFound(`O pokémon ${pokemon.id} não foi encontrado.`)
    }

    const updatedPokemon = await this.pokemonRepository.get(pokemon.id)

    if (updatedPokemon.level === requestPokemon.level) {
      pokemon.updated = false
      pokemon.responseMessage = `O nível do pokémon continua o mesmo, portanto não foi atualizado.`

      return pokemon
    }

    if (pokemon.level < updatedPokemon.middleFormEvolutionLevel) {
      pokemon.id = updatedPokemon.id
      pokemon.name = updatedPokemon.basicForm
      pokemon.level = updatedPokemon.level
      pokemon.basicForm = updatedPokemon.basicForm
      pokemon.ability = updatedPokemon.ability
      pokemon.middleFormEvolutionLevel = updatedPokemon.middleFormEvolutionLevel
      pokemon.middleForm = updatedPokemon.middleForm
      pokemon.finalFormEvolutionLevel = updatedPokemon.finalFormEvolutionLevel
      pokemon.finalForm = updatedPokemon.finalForm
      pokemon.hasMoreEvolution = true
      pokemon.updated = true
      pokemon.responseMessage = `Seu pokémon está ficando mais forte e em breve atingirá sua forma média!`

      await this.pokemonRepository.update(pokemon)
      return pokemon
    }

    if (pokemon.level >= updatedPokemon.middleFormEvolutionLevel && pokemon.level < updatedPokemon.finalFormEvolutionLevel) {
      pokemon.id = updatedPokemon.id
      pokemon.name = updatedPokemon.middleForm
      pokemon.level = updatedPokemon.level
      pokemon.basicForm = updatedPokemon.basicForm
      pokemon.ability = updatedPokemon.ability
      pokemon.middleFormEvolutionLevel = updatedPokemon.middleFormEvolutionLevel
      pokemon.middleForm = updatedPokemon.middleForm
      pokemon.finalFormEvolutionLevel = updatedPokemon.finalFormEvolutionLevel
      pokemon.finalForm = updatedPokemon.finalForm
      pokemon.hasMoreEvolution = true
      pokemon.updated = true
      pokemon.responseMessage = `Parabéns! O pokémon evoluiu e atingiu a sua forma média!`

      await this.pokemonRepository.update(pokemon)
      return pokemon
    }

    if (pokemon.level >= updatedPokemon.finalFormEvolutionLevel) {
      pokemon.id = updatedPokemon.id
      pokemon.name = updatedPokemon.finalForm
      pokemon.level = updatedPokemon.level
      pokemon.basicForm = updatedPokemon.basicForm
      pokemon.ability = updatedPokemon.ability
      pokemon.middleFormEvolutionLevel = updatedPokemon.middleFormEvolutionLevel
      pokemon.middleForm = updatedPokemon.middleForm
      pokemon.finalFormEvolutionLevel = updatedPokemon.finalFormEvolutionLevel
      pokemon.finalForm = updatedPokemon.finalForm
      pokemon.hasMoreEvolution = false
      pokemon.updated = true
      pokemon.responseMessage = `Wow! Seu pokémon não possui mais evolução, pois atingiu a sua forma final!!`

      await this.pokemonRepository.update(pokemon)
      return pokemon
    }
  }
}
