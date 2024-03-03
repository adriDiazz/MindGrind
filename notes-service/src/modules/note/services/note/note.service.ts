import { Injectable } from '@nestjs/common';
import { NoteRepositoryService } from '../../repository/note-repository/note-repository.service';
import { INoteRepository } from 'src/modules/IServices/note.interface';
import { NoteType } from '../../entities/note.entity';

@Injectable()
export class NoteService implements INoteRepository {
  constructor(private readonly noteRepository: NoteRepositoryService) {}

  getNotes(userId: string) {
    return this.noteRepository.getNotes(userId);
  }

  getNoteById(userId: string, noteId: string) {
    return this.noteRepository.getNoteById(userId, noteId);
  }

  async getLastModifiedNotes(userId: string): Promise<NoteType[]> {
    const userNotes = (await this.noteRepository.getNotes(userId))?.notes;

    if (userNotes.length === 0) {
      return null;
    }

    const lastModifiedNote = userNotes.sort((a, b) => {
      return <any>new Date(b.updatedAt) - <any>new Date(a.updatedAt);
    });

    return lastModifiedNote;
  }
}
