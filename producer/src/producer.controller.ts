import { Body, Controller, Post } from '@nestjs/common'
import { ITest } from './dto/producer.dto'
import { ProducerService } from './producer.service'

@Controller('queue')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('test')
  async send(@Body() body: ITest) {
    const data: ITest = {
      test: body.test
    }
    return await this.producerService.send('test', data)
  }
}
