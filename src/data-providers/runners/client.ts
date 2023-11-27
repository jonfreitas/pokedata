import amqplib from 'amqplib'

export default class BrokerClient {
  private groupId: string
  private readonly uri: string

  constructor() {
    // this.uri = String(process.env.BROKER_AMQP_RABBITMQ)
    this.uri = 'amqp://guest:guest@0.0.0.0:5672'
  }

  start(groupId: string): void {
    this.groupId = groupId
  }

  async publicInExchange(
    exchange: string,
    routingKey: string,
    message: string,
    type?: string
  ): Promise<void> {
    const connection = await amqplib.connect(`${this.uri}/${this.groupId}`)
    const channel = await connection.createConfirmChannel()
    await channel.assertExchange(exchange, type || 'direct')
    channel.publish(exchange, routingKey || '#', Buffer.from(message))
    await channel?.close()
    await connection?.close()
  }
}
