/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/dot-notation */
import { PokemonServiceConfig } from './config/service'

const pokemonServiceConfig = new PokemonServiceConfig()
const pokemonService = pokemonServiceConfig['IPokemonService']

export const Services = [pokemonService]
