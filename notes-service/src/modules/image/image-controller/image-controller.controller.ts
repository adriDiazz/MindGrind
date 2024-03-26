import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'buffer';
import { AwsService } from '../image-service/image-service.service';

@Controller({ version: '1', path: 's3' })
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('upload/:userId/:noteId')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() file: File,
    @Param('userId') userId: string,
    @Param('noteId') noteId: string,
  ) {
    const saved = await this.awsService.uploadFile(file);
    if (saved) {
      return this.awsService.saveImageRecord(saved, userId, noteId);
    }
  }
}
