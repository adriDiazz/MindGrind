import { Module } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { GptChatController } from './gpt-chat.controller';

@Module({
  controllers: [GptChatController],
  providers: [GptChatService],
})
export class GptChatModule {}
