import { Injectable } from '@nestjs/common';
import { NoteRepositoryService } from '../../repository/note-repository/note-repository.service';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepositoryService) {}

  getNotes(userId: string) {
    return this.noteRepository.getNotes(userId);
  }

  getNoteById(userId: string, noteId: string) {
    return this.noteRepository.getNoteById(userId, noteId);
  }
}
