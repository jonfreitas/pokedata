import { Pokemon } from '@/core/entities/pokemon'
import { UpdateLevelPokemon } from '../../src/core/use-cases/pokemon/update-level-pokemon'

export const mockPokemon = new Pokemon()

mockPokemon.id = '2UBOVRoLDfEFcx1CaSN0uJt7U8s'
mockPokemon.name = 'Eiiiii'
mockPokemon.level = 53
mockPokemon.basicForm = 'Oddish'
mockPokemon.ability = 'Fire'
mockPokemon.middleFormEvolutionLevel = 22
mockPokemon.middleForm = 'Gloomaaaaa'
mockPokemon.finalFormEvolutionLevel = 30
mockPokemon.finalForm = 'Vileplume'
mockPokemon.hasMoreEvolution = false
mockPokemon.sentMessage = undefined
mockPokemon.origin = undefined
mockPokemon.updated = undefined
mockPokemon.responseMessage = undefined

export const mockPokemonToUpdateLevel = new Pokemon()

mockPokemonToUpdateLevel.id = '2UBOVRoLDfEFcx1CaSN0uJt7U8s'
mockPokemonToUpdateLevel.level = 21
