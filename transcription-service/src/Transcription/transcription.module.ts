import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TranscriptionController } from './transcription.controller';
import { TranscriptionService } from './transcription.service';
import { Note, NoteSchema } from './transcription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [TranscriptionController],
  providers: [TranscriptionService],
  exports: [TranscriptionService],
})
class TranscriptionModule {}

export default TranscriptionModule;
