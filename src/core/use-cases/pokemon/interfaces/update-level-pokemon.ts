import { Pokemon } from '../../../entities/pokemon'

export interface IUpdateLevelPokemon {
  execute: (pokemon: Pokemon) => Promise<Pokemon>
}
