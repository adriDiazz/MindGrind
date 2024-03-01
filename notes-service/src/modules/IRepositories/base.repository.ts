import { NoteType } from '../note/entities/note.entity';

export interface IBaseRepository<T> {
  getNotes(userId: string): Promise<T>;
  getNoteById(userId: string, noteId: string): Promise<NoteType>;
}
