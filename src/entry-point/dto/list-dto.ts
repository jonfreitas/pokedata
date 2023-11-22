import { AbilitiesDTO } from "./abilities-dto"
import { HasMoreEvolutionDTO } from "./has-more-evolution-dto"

export type ListPokemonDTO = {
  abilities: AbilitiesDTO,
  hasMoreEvolution: HasMoreEvolutionDTO
}
