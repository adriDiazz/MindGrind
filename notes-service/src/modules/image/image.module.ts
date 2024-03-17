import { Module } from '@nestjs/common';
import { AwsService } from './image-service/image-service.service';
import { AwsController } from './image-controller/image-controller.controller';

@Module({
  providers: [AwsService],
  controllers: [AwsController],
})
export class ImageModule {}
