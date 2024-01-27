import { Module } from '@nestjs/common'
import { ConsumerService } from './consumer.service'
import { ConfigModule } from '@nestjs/config'
import { ConsumerController } from './consumer.controller'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })],
  controllers: [ConsumerController],
  providers: [ConsumerService]
})
export class ConsumerModule {}
