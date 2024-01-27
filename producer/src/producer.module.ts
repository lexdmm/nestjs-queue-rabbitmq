import { Module } from '@nestjs/common'
import { ProducerService } from './producer.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ProducerController } from './producer.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ClientsModule.registerAsync([
      {
        name: 'NETSER_SERVICE_RMQ',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              // eslint-disable-next-line prettier/prettier
              `amqp://${configService.get('RABBITMQ_USER')}:${configService.get('RABBITMQ_PASSWORD')}@${configService.get('RABBITMQ_HOST')}:${configService.get('PORT_RMQ')}`
            ],
            queue: configService.get<string>('QUEUE_NAME'),
            queueOptions: {
              auto_delete: false,
              durable: false
            }
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [ProducerController],
  providers: [ProducerService],
  exports: [ProducerService]
})
export class ProcucerModule {}
