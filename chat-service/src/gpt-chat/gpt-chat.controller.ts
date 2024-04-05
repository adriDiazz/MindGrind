import { Controller, Post, Body } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';

@Controller('chat')
export class GptChatController {
  constructor(private readonly gptChatService: GptChatService) {}

  @Post()
  replyMessage(@Body() message: { message: string }) {
    return {
      message: message.message,
      isSent: false,
    };
  }
}
