import { Module } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { GptChatController } from './gpt-chat.controller';
import { Note } from './entities/gpt-chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [GptChatController],
  providers: [GptChatService],
})
export class GptChatModule {}
