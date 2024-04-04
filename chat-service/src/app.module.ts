import { Module } from '@nestjs/common';
import { GptChatModule } from './gpt-chat/gpt-chat.module';

@Module({
  imports: [GptChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
