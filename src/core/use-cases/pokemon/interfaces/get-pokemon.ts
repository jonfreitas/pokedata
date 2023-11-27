import { Pokemon } from '@/core/entities/pokemon'

export interface IGetPokemon {
  execute: (id: string) => Promise<Pokemon>
}
