import { Controller, Get, Param } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppService } from './app.service';

@Controller('youtube-transcript')
export class AppController {
  constructor(private readonly AppService: AppService) {}

  @Get(':videoId')
  async fetchTranscript(@Param('videoId') videoId: string): Promise<string> {
    const transcription = this.AppService.fetchTranscript(videoId);
    return transcription;
  }
}
