import { Pokemon } from '@/core/entities/pokemon'
import { IPokemonRepository } from '@/core/repositories/pokemon-repository'
import { PokemonModel } from './mapping/pokemon-mapping'


export default class PokemonRepository implements IPokemonRepository {
  async create(pokemon: Pokemon): Promise<Pokemon> {
    return this.toEntity(
      (await PokemonModel.create({ ...pokemon }))?.toObject()
    )
  }

  async createPokemons(pokemon: Pokemon): Promise<Pokemon> {
    return this.toEntity(
      (await PokemonModel.create({ ...pokemon }))?.toObject()
    )
  }

  async get(id: string): Promise<Pokemon> {
    return this.toEntity((await PokemonModel.findById(id).exec())?.toObject())
  }

  async update(pokemon: Pokemon): Promise<void> {
    await PokemonModel.updateOne(
      { _id: pokemon.id },
      {
        $set: {
          name: pokemon.name,
          level: pokemon.level,
          basicForm: pokemon.basicForm,
          ability: pokemon.ability,
          middleFormEvolutionLevel: pokemon.middleFormEvolutionLevel,
          middleForm: pokemon.middleForm,
          finalFormEvolutionLevel: pokemon.finalFormEvolutionLevel,
          finalForm: pokemon.finalForm,
          hasMoreEvolution: pokemon.hasMoreEvolution
        }
      }
    )

    await PokemonModel.updateOne(
      { _id: pokemon.id },
      { $addToSet: { abilities: pokemon.ability } },
    )
  }

  async updateLevel(pokemon: Pokemon): Promise<void> {
    await PokemonModel.updateOne(
      { _id: pokemon.id },
      {
        $set: {
          level: pokemon.level
        }
      }
    )
  }

  async list(filter: Partial<Pokemon>): Promise<Pokemon[]> {
    return (await PokemonModel.find(filter))
  }

  private toEntity = (dto: Pokemon) => {
    if (!dto) return

    const pokemon = new Pokemon()
    pokemon.id = dto.id
    pokemon.name = dto.name
    pokemon.level = dto.level
    pokemon.basicForm = dto.basicForm
    pokemon.ability = dto.ability
    pokemon.middleFormEvolutionLevel = dto.middleFormEvolutionLevel
    pokemon.middleForm = dto.middleForm
    pokemon.finalFormEvolutionLevel = dto.finalFormEvolutionLevel
    pokemon.finalForm = dto.finalForm
    pokemon.hasMoreEvolution = dto.hasMoreEvolution

    return pokemon
  }
}
