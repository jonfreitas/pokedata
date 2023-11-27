import path from 'path'
import { ServerUnaryCall, sendUnaryData, status } from '@grpc/grpc-js'
import { ListPokemonDTO } from '../dto/list-dto'
import { PokemonDTO } from '../dto/pokemon-dto'
import { PokemonSerializer } from '../serializers/pokemon-serializer'
import BaseService from './base-service'
import { ICreatePokemon } from '../../core/use-cases/pokemon/interfaces/create-pokemon'
import { IGetPokemon } from '../../core/use-cases/pokemon/interfaces/get-pokemon'
import { IUpdatePokemon } from '../../core/use-cases/pokemon/interfaces/update-pokemon'
import { IUpdateLevelPokemon } from '../../core/use-cases/pokemon/interfaces/update-level-pokemon'
import { IListPokemon } from '../../core/use-cases/pokemon/interfaces/list-pokemon'
import { IPokemonLevelUpdated } from '../../core/external-services/pokemon-level-updated'

export default class PokemonService extends BaseService {
  proto: string = path.join(__dirname, '..', '..', 'protos', 'pokemon.proto')

  private pokemonLevelUpdated: IPokemonLevelUpdated

  createPokemon: ICreatePokemon
  getPokemon: IGetPokemon
  updatePokemon: IUpdatePokemon
  updateLevelPokemon: IUpdateLevelPokemon
  listPokemon: IListPokemon

  constructor(
    createPokemon: ICreatePokemon,
    getPokemon: IGetPokemon,
    updatePokemon: IUpdatePokemon,
    updateLevelPokemon: IUpdateLevelPokemon,
    listPokemon: IListPokemon,
    pokemonLevelUpdated: IPokemonLevelUpdated
  ) {
    super()
    this.createPokemon = createPokemon
    this.getPokemon = getPokemon
    this.updatePokemon = updatePokemon
    this.updateLevelPokemon = updateLevelPokemon
    this.listPokemon = listPokemon
    this.pokemonLevelUpdated = pokemonLevelUpdated
  }

  public CreatePokemon = async (
    args: ServerUnaryCall<PokemonDTO, PokemonDTO>,
    callback: sendUnaryData<PokemonDTO>
  ): Promise<void> => {
    try {
      const pokemon = await this.createPokemon.execute(
        PokemonSerializer.toEntity(args.request)
      )
      return callback(null, PokemonSerializer.toDTO(pokemon))
    } catch (error) {
      return this.handlerError(callback, error as Error, 'CREATE_POKEMON_ERROR')
    }
  }

  public GetPokemon = async (
    args: ServerUnaryCall<PokemonDTO, PokemonDTO>,
    callback: sendUnaryData<PokemonDTO>
  ): Promise<void> => {
    try {
      const { id } = args.request
      const pokemon = await this.getPokemon.execute(id)
      if (pokemon) {
        return callback(null, PokemonSerializer.toDTO(pokemon))
      }
      return callback({ code: status.NOT_FOUND, message: 'Pokemon not found' })
    } catch (error) {
      return this.handlerError(callback, error as Error, 'GET_POKEMON_ERROR')
    }
  }

  public UpdatePokemon = async (
    args: ServerUnaryCall<PokemonDTO, PokemonDTO>,
    callback: sendUnaryData<PokemonDTO>
  ): Promise<void> => {
    try {
      const pokemon = await this.updatePokemon.execute(
        PokemonSerializer.toEntity(args.request)
      )
      if (pokemon) {
        return callback(null, PokemonSerializer.toDTO(pokemon))
      }
      return callback({ code: status.NOT_FOUND, message: 'Pokemon not found' })
    } catch (error) {
      return this.handlerError(callback, error as Error, 'UPDATE_POKEMON_ERROR')
    }
  }

  public UpdateLevelPokemon = async (
    args: ServerUnaryCall<PokemonDTO, PokemonDTO>,
    callback: sendUnaryData<PokemonDTO>
  ): Promise<void> => {
    try {
      if (args.request.sentMessage === undefined) {
        await this.pokemonLevelUpdated.publish(args.request.id, args.request.level)
      }
      const pokemon = await this.updateLevelPokemon.execute(
        PokemonSerializer.toEntity(args.request)
      )
      if (pokemon) {
        return callback(null, PokemonSerializer.toDTO(pokemon))
      }
      return callback({ code: status.NOT_FOUND, message: 'Pokemon not found' })
    } catch (error) {
      return this.handlerError(callback, error as Error, 'UPDATE_LEVEL_POKEMON_ERROR')
    }
  }

  public ListPokemon = async (
    args: ServerUnaryCall<ListPokemonDTO, PokemonDTO[]>,
    callback: sendUnaryData<{ pokemons: PokemonDTO[] }>
  ): Promise<void> => {
    try {
      if (args.request !== undefined) {
        const pokemons = await this.listPokemon.execute(args.request)
        return callback(null, { pokemons })
      }
      return callback({ code: status.NOT_FOUND, message: 'Pokemons not found' })
    } catch (error) {
      return this.handlerError(callback, error as Error, 'GET_POKEMON_ERROR')
    }
  }
}
