import { Pokemon } from '../entities/pokemon'

export interface IPokemonRepository {
  create: (pokemon: Pokemon) => Promise<Pokemon>
  get: (id: string) => Promise<Pokemon>
  update: (pokemon: Pokemon) => Promise<void>
  updateLevel: (pokemon: Pokemon) => Promise<void>
  list: (filter: Partial<Pokemon>) => Promise<Pokemon[]>
}
