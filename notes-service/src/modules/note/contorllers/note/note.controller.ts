import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NoteService } from '../../services/note/note.service';
import { NoteType } from '../../entities/note.entity';
import { createUpdateNoteDto } from '../../dto/updateNoteDto';

@Controller({ version: '1', path: 'note' })
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(':userId')
  getNotes(@Param('userId') userId: string) {
    return this.noteService.getNotes(userId);
  }

  @Get('last/:userId')
  getLastModifiedNotes(@Param('userId') userId: string) {
    return this.noteService.getLastModifiedNotes(userId);
  }

  @Post(':userId')
  getNoteById(@Param('userId') userId: string, @Body('note') note: NoteType) {
    const dto = createUpdateNoteDto(note, userId);
    return this.noteService.updateNote(dto);
  }
}
