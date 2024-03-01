import { Module } from '@nestjs/common';
import { NoteController } from './contorllers/note/note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NoteService } from './services/note/note.service';
import { NoteRepositoryService } from './repository/note-repository/note-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
  providers: [NoteService, NoteRepositoryService],
})
export class NoteModule {}
