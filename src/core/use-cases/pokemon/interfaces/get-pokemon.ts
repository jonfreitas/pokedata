import { Pokemon } from '../../../entities/pokemon'

export interface IGetPokemon {
  execute: (id: string) => Promise<Pokemon>
}
