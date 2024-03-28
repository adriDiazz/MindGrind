import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from 'buffer';
import { AwsService } from '../image-service/image-service.service';
import { Response } from 'express';

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
    console.log('file', file);
    const saved = await this.awsService.uploadFile(file);
    if (saved) {
      return this.awsService.saveImageRecord(saved, userId, noteId);
    }
  }

  @Get('screenshot')
  async getScreenshot(@Query('url') url: string, @Res() res: Response) {
    if (!url) {
      return res.status(400).send('URL is required');
    }
    try {
      const screenshotBuffer = await this.awsService.capture(url);
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Length', screenshotBuffer.length.toString());
      res.send(screenshotBuffer);
    } catch (error) {
      res.status(500).send(`Failed to capture screenshot: ${error.message}`);
    }
  }
}
