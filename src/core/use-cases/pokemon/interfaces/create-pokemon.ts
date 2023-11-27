import { Pokemon } from '@/core/entities/pokemon'

export interface ICreatePokemon {
  execute: (pokemon: Pokemon) => Promise<Pokemon>
}
