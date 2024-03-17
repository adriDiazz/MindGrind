import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'buffer';

@Controller({ version: '1', path: 's3' })
export class AwsController {
  constructor() {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: File) {
    console.log(file);
  }

  @Get()
  async downloadFile() {
    console.log('Download file');
  }
}
