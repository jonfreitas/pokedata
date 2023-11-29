import { Pokemon } from '@/core/entities/pokemon'

export interface IUpdatePokemon {
  execute: (pokemon: Pokemon) => Promise<Pokemon>
  executeForTest: (pokemon: Pokemon) => Promise<Pokemon>
}
