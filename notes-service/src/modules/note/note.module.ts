import { Module } from '@nestjs/common';
import { NoteController } from './contorllers/note/note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteController],
})
export class NoteModule {}
