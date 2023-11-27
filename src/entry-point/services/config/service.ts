import { CreatePokemon } from '../../../core/use-cases/pokemon/create-pokemon'
import { GetPokemon } from '../../../core/use-cases/pokemon/get-pokemon'
import { UpdatePokemon } from '../../../core/use-cases/pokemon/update-pokemon'
import { UpdateLevelPokemon } from '../../../core/use-cases/pokemon/update-level-pokemon'
import { PokemonLevelUpdated } from '../../../data-providers/runners/producers/pokemon-level-updated'
import { ListPokemon } from '../../../core/use-cases/pokemon/list-pokemon'
import PokemonRepository from '../../../data-providers/repositories/mongoose/pokemon-repository'
import PokemonService from '../pokemon-service'
import { Base } from './base'

export class PokemonServiceConfig extends Base {
  constructor() {
    super()

    this.service('IPokemonRepository', () => new PokemonRepository())
    this.service('IPokemonLevelUpdated',() => new PokemonLevelUpdated())

    this.service(
        'IPokemonService',
        (p) =>
          new PokemonService(
            p.ICreatePokemon,
            p.IGetPokemon,
            p.IUpdatePokemon,
            p.IUpdateLevelPokemon,
            p.IListPokemon,
            p.IPokemonLevelUpdated
          )
      )

    this.service(
      'ICreatePokemon',
      (p) => new CreatePokemon(p.IPokemonRepository),
    )

    this.service(
      'IGetPokemon',
      (p) => new GetPokemon(p.IPokemonRepository)
    )

    this.service(
      'IUpdatePokemon',
      (p) => new UpdatePokemon(p.IPokemonRepository)
    )

    this.service(
      'IUpdateLevelPokemon',
      (p) => new UpdateLevelPokemon(p.IPokemonRepository)
    )

    this.service(
      'IListPokemon',
      (p) => new ListPokemon(p.IPokemonRepository)
    )

    this.service(
      'IListPokemon',
      (p) => new ListPokemon(p.IPokemonRepository)
    )
  }
}
