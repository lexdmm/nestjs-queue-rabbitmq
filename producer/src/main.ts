import { NestFactory } from '@nestjs/core'
import { ProcucerModule } from './producer.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(ProcucerModule)
  const configService = app.get<ConfigService>(ConfigService)
  const PORT = Number(configService.get<string>('PORT'))
  await app.listen(PORT, () => {
    console.log('PRODUCER RabbitMQ microservice successfully started on port', PORT)
  })
}
bootstrap()
