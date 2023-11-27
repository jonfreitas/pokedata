import PokemonRepository from "../../repositories/mongoose/pokemon-repository"
import { Pokemon } from '@/core/entities/pokemon'
import { ICreatePokemon } from '@/core/use-cases/pokemon/interfaces/create-pokemon'
import { pokemonsToInsert } from '../data/pokemons'
import { PokemonSerializer } from '@/entry-point/serializers/pokemon-serializer'

export class CreatePokemons implements ICreatePokemon {
  private pokemonRepository: PokemonRepository

  constructor(
    pokemonRepository: PokemonRepository
  ) {
    this.pokemonRepository = pokemonRepository
  }

  async execute(): Promise<Pokemon> {
    const pokemons = pokemonsToInsert.map(
      p => ({
        id: undefined,
        name: undefined,
        level: undefined,
        basicForm: p.basicForm,
        ability: p.ability,
        abilities: undefined,
        middleFormEvolutionLevel: p.middleFormEvolutionLevel,
        middleForm: p.middleForm,
        finalFormEvolutionLevel: p.finalFormEvolutionLevel,
        finalForm: p.finalForm,
        hasMoreEvolution: undefined,
        sentMessage: undefined,
        origin: undefined,
        updated: undefined,
        responseMessage: undefined
      })
    )
    for (const poke of pokemons) {
      const p = PokemonSerializer.toEntity(poke)
      await this.pokemonRepository.createPokemons(p)
        .then(() => console.log(`Pokemon ${p.basicForm} adicionado com sucesso!`))
        .catch((err) => console.log(`O pokemon ${p.basicForm} não pôde ser adicionado. ${err}`))
    }
    return
  }
}

