import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TranscriptionService } from './transcription.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('youtube-transcript')
export class TranscriptionController {
  constructor(private readonly TranscriptionService: TranscriptionService) {}

  @Get(':videoId')
  async fetchTranscript(@Param('videoId') videoId: string) {
    const transcription =
      await this.TranscriptionService.fetchTranscript(videoId);
    const chatGptNotes =
      await this.TranscriptionService.getNotesFake(transcription);

    return { chatGptNotes };
  }

  @Get('resume/:videoId')
  async fetchResume(@Param('videoId') videoId: string) {
    const chatGptNotes =
      await this.TranscriptionService.fetchTranscript(videoId);
    return { chatGptNotes };
  }

  @Post('save-note')
  async saveNote(@Body() body: { userId: string; note: string }) {
    const savedNote = await this.TranscriptionService.saveNotes(
      body.note,
      body.userId,
    );
    console.log('savedNote', savedNote);
    return savedNote;
  }

  @Post('pdf-process')
  @UseInterceptors(FileInterceptor('pdf'))
  async processPdf(@UploadedFile() pdfFile): Promise<string> {
    const transcription = await this.TranscriptionService.processPdf(pdfFile);
    const chatGptNotes = this.TranscriptionService.getNotesFake(transcription);
    return chatGptNotes;
  }
}
