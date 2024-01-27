import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { ConsumerService } from './consumer.service'

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @MessagePattern('test')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext): Promise<void> {
    const channel = context.getChannelRef()
    const orginalMessage = context.getMessage()

    await this.consumerService.saveSomthing(data)

    channel.ack(orginalMessage)
  }
}
