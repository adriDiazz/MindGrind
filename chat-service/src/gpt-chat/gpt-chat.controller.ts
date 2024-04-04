import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { CreateGptChatDto } from './dto/create-gpt-chat.dto';
import { UpdateGptChatDto } from './dto/update-gpt-chat.dto';

@Controller('gpt-chat')
export class GptChatController {
  constructor(private readonly gptChatService: GptChatService) {}

  @Post()
  create(@Body() createGptChatDto: CreateGptChatDto) {
    return this.gptChatService.create(createGptChatDto);
  }

  @Get()
  findAll() {
    return this.gptChatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gptChatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGptChatDto: UpdateGptChatDto) {
    return this.gptChatService.update(+id, updateGptChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gptChatService.remove(+id);
  }
}
