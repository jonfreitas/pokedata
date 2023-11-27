/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/dot-notation */
import { EngineMongo } from '@sdk12/mongo-connection'
import { CreatePokemons } from './migrations/0000_create_pokemons'
import PokemonRepository from "../repositories/mongoose/pokemon-repository"

const dbConnection = process.env.MONGO_URL
EngineMongo.startConnection([dbConnection])

const pokemonRepository = new PokemonRepository()
const createPokemons = new CreatePokemons(pokemonRepository)
createPokemons.execute()
  .then(() => console.log('Terminou!'))
  .catch((err) => console.log(err))
