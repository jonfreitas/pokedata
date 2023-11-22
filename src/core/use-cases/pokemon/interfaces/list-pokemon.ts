import { Pokemon } from '../../../entities/pokemon'

export interface IListPokemon {
  execute(filter: any): Promise<Pokemon[]>
}
