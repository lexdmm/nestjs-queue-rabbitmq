import { Injectable } from '@nestjs/common'

@Injectable()
export class ConsumerService {
  // For example, if you had a service to save a file in an S3 bucket, this logic would be done here
  async saveSomthing(content: string): Promise<void> {
    console.log(content)
  }
}
