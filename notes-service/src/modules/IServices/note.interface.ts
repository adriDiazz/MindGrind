import { Note, NoteType } from '../note/entities/note.entity';

export interface INoteRepository {
  getNotes(userId: string): Promise<Note>;
  getNoteById(userId: string, noteId: string): Promise<NoteType>;
}
