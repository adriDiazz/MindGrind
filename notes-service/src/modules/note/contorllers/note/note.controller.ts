import { Controller, Get, Param } from '@nestjs/common';
import { NoteService } from '../../services/note/note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(':userId')
  getNotes(@Param('userId') userId: string) {
    return this.noteService.getNotes(userId);
  }
}
