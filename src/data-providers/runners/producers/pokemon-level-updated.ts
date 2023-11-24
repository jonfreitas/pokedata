import { logger } from '@sdk12/dataserver'
import BrokerClient from '../client'
import { IPokemonLevelUpdated } from '../../../core/external-services/pokemon-level-updated'

export class PokemonLevelUpdated implements IPokemonLevelUpdated {
  private readonly exchange: string = 'pokemon.level.update'

  private readonly routingKey: string

  private readonly type: string = 'topic'

  private readonly groupId = 'poke-consumer-group'

  private brokerServer: BrokerClient

  constructor() {
    this.brokerServer = new BrokerClient()
  }

  async publish(id: string, level: number): Promise<void> {
    try {
      this.brokerServer.start(this.groupId)
      const queueMessage = JSON.stringify({ id, level })
      await this.brokerServer.publicInExchange(
        this.exchange,
        this.routingKey,
        queueMessage,
        this.type
      )
      logger.debug(`POKEMON_LEVEL_UPDATED_PUBLISH_DEBUG: publish to ${this.exchange}`)
    } catch (error) {
      logger.error('POKEMON_LEVEL_UPDATED_PUBLISH_ERROR', error)
    }
  }
}
