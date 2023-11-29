import { Pokemon } from '@/core/entities/pokemon'

export interface IUpdateLevelPokemon {
  execute: (pokemon: Pokemon) => Promise<Pokemon>
  executeForTest: (pokemon: Pokemon) => Promise<Pokemon>
}
