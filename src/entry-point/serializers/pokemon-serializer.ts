import { Pokemon } from '@/core/entities/pokemon'
import { PokemonDTO } from '../dto/pokemon-dto'

export class PokemonSerializer {
  static toDTO = (pokemon: Pokemon): PokemonDTO => {
    const pokemonDTO = new PokemonDTO()

    pokemonDTO.id = pokemon.id
    pokemonDTO.name = pokemon.name
    pokemonDTO.level = pokemon.level
    pokemonDTO.basicForm = pokemon.basicForm
    pokemonDTO.ability = pokemon.ability
    pokemonDTO.abilities = Array(pokemonDTO.ability)
    pokemonDTO.middleFormEvolutionLevel = pokemon.middleFormEvolutionLevel
    pokemonDTO.middleForm = pokemon.middleForm
    pokemonDTO.finalFormEvolutionLevel = pokemon.finalFormEvolutionLevel
    pokemonDTO.finalForm = pokemon.finalForm
    pokemonDTO.hasMoreEvolution = pokemon.hasMoreEvolution
    pokemonDTO.sentMessage = pokemon.sentMessage
    pokemonDTO.origin = pokemon.origin
    pokemonDTO.updated = pokemon.updated
    pokemonDTO.responseMessage = pokemon.responseMessage

    return pokemonDTO
  }

  static toEntity = (pokemonDTO: PokemonDTO): Pokemon => {
    const pokemon = new Pokemon()

    pokemon.id = pokemonDTO.id
    pokemon.name = pokemonDTO.name
    pokemon.level = pokemonDTO.level
    pokemon.basicForm = pokemonDTO.basicForm
    pokemon.ability = pokemonDTO.ability
    pokemon.abilities = Array(pokemon.ability)
    pokemon.middleFormEvolutionLevel = pokemonDTO.middleFormEvolutionLevel
    pokemon.middleForm = pokemonDTO.middleForm
    pokemon.finalFormEvolutionLevel = pokemonDTO.finalFormEvolutionLevel
    pokemon.finalForm = pokemonDTO.finalForm
    pokemon.hasMoreEvolution = pokemonDTO.hasMoreEvolution
    pokemon.sentMessage = pokemonDTO.sentMessage
    pokemon.origin = pokemonDTO.origin
    pokemon.updated = pokemonDTO.updated
    pokemon.responseMessage = pokemonDTO.responseMessage

    return pokemon
  }
}
