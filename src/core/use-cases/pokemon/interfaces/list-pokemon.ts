import { Pokemon } from '@/core/entities/pokemon'

export interface IListPokemon {
  execute(filter: any): Promise<Pokemon[]>
}
