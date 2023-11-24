import { Pokemon } from '../../core/entities/pokemon'
import { Abilities } from '../../core/entities/enums/abilities'
import { HasMoreEvolution } from '../../core/entities/enums/has-more-evolution'
import { PokemonDTO } from '../dto/pokemon-dto'
import { AbilitiesDTO } from '../dto/abilities-dto'
import { HasMoreEvolutionDTO } from '../dto/has-more-evolution-dto'

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

    return pokemon
  }

  static fivePokemonToEntity = (pokemonDTO: {
    id: string;
    name: string;
    level: number;
    basicForm: string;
    ability: string;
    abilities: string[];
    middleFormEvolutionLevel: number;
    middleForm: string;
    finalFormEvolutionLevel: number;
    finalForm: string;
    hasMoreEvolution: boolean
  }): Pokemon => {
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

    return pokemon
  }
}
