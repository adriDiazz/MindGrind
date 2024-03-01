import { Injectable } from '@nestjs/common';
import { NoteRepositoryService } from '../../repository/note-repository/note-repository.service';
import { INoteRepository } from 'src/modules/IServices/note.interface';

@Injectable()
export class NoteService implements INoteRepository {
  constructor(private readonly noteRepository: NoteRepositoryService) {}

  getNotes(userId: string) {
    return this.noteRepository.getNotes(userId);
  }

  getNoteById(userId: string, noteId: string) {
    return this.noteRepository.getNoteById(userId, noteId);
  }
}
