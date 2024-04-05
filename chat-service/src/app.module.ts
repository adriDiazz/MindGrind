import { Module } from '@nestjs/common';
import { GptChatModule } from './gpt-chat/gpt-chat.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GptChatModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
