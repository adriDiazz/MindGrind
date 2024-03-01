import { NoteType } from '../entities/note.entity';

export class NoteDto {
  userId: string;
  notes: [NoteType];
  isDirectory: boolean;
}

export default NoteDto;
