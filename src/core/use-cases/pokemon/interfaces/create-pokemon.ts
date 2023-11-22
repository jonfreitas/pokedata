import { Pokemon } from '../../../entities/pokemon'

export interface ICreatePokemon {
  execute: (pokemon: Pokemon) => Promise<Pokemon>
}
