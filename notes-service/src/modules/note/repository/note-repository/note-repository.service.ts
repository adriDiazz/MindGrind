import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note, NoteType } from '../../entities/note.entity';
import { Repository } from 'typeorm';
import { IBaseRepository } from 'src/modules/shared/base.repository';

@Injectable()
export class NoteRepositoryService implements IBaseRepository<Note> {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  getNotes(userId: string): Promise<Note> {
    return this.noteRepository.findOne({ where: { userId } });
  }

  async getNoteById(userId: string, noteId: string): Promise<NoteType> {
    const userData = await this.noteRepository.findOne({ where: { userId } });
    return userData.notes.find((note) => note.noteId === noteId);
  }
}
