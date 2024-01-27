import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class ProducerService {
  constructor(@Inject('NETSER_SERVICE_RMQ') private readonly client: ClientProxy) {}

  async send(pattern: any, data: any) {
    const message = await this.client.send(pattern, data)
    return message
  }
}
