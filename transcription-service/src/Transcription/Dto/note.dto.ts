import { IsString, IsNotEmpty } from 'class-validator';
import { NoteType } from '../transcription.schema';

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  notes: [NoteType];

  @IsNotEmpty()
  isDirectory: boolean;
}

export default NoteDto;
