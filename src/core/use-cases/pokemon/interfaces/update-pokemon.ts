import { Pokemon } from '../../../entities/pokemon'

export interface IUpdatePokemon {
  execute: (pokemon: Pokemon) => Promise<Pokemon>
}
