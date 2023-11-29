import { Pokemon } from '../../src/core/entities/pokemon'

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

export const mockCreatePokemon = new Pokemon()

mockCreatePokemon.basicForm = 'Oddish'
mockCreatePokemon.ability = 'Fire'
mockCreatePokemon.middleFormEvolutionLevel = 22
mockCreatePokemon.middleForm = 'Gloomaaaaa'
mockCreatePokemon.finalFormEvolutionLevel = 30
mockCreatePokemon.finalForm = 'Vileplume'

export const mockUpdatePokemon = new Pokemon()

mockUpdatePokemon.id = '6564ce8f9ce02d2cca8869c6'
mockUpdatePokemon.name = 'Eiiiii'
mockUpdatePokemon.level = 55
mockUpdatePokemon.basicForm = 'Oddish'
mockUpdatePokemon.ability = 'Fire'
mockUpdatePokemon.middleFormEvolutionLevel = 22
mockUpdatePokemon.middleForm = 'Gloomaaaaa'
mockUpdatePokemon.finalFormEvolutionLevel = 30
mockUpdatePokemon.finalForm = 'Vileplume'
mockUpdatePokemon.hasMoreEvolution = false

export const mockPokemonToUpdateLevel = new Pokemon()

mockPokemonToUpdateLevel.id = '6564ce8f9ce02d2cca8869c6'
mockPokemonToUpdateLevel.level = 21
