import { Pokemon } from '../../../entities/pokemon'

export interface IListPokemon {
  execute(filter: Partial<Pokemon>): Promise<Pokemon[]>
}
