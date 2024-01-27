import { NestFactory } from '@nestjs/core'
import { ConsumerModule } from './consumer.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule)
  const configService = app.get<ConfigService>(ConfigService)

  const PORT_RMQ = Number(configService.get<string>('PORT_RMQ'))
  const PORT_RMQ_MANAGEMENT = Number(configService.get<string>('PORT_RMQ_MANAGEMENT'))
  const QUEUE_NAME = configService.get<string>('QUEUE_NAME')
  const RABBITMQ_USER = configService.get<string>('RABBITMQ_USER')
  const RABBITMQ_PASSWORD = configService.get<string>('RABBITMQ_PASSWORD')
  const RABBITMQ_HOST = configService.get<string>('RABBITMQ_HOST')

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${PORT_RMQ}`],
      queue: QUEUE_NAME,
      // false = manual acknowledgement; true = automatic acknowledgment
      noAck: false,
      // Get one by one
      prefetchCount: 1,
      queueOptions: {
        auto_delete: false,
        durable: false
      }
    }
  })
  await app.startAllMicroservices().then(() => {
    console.log('RabbitMQ on port', PORT_RMQ)
    console.log('RabbitMQ Management on port', PORT_RMQ_MANAGEMENT)
    console.log('CONSUMER RabbitMQ microservice successfully started')
  })
}
bootstrap()
