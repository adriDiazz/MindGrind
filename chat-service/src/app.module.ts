import { Module } from '@nestjs/common';
import { GptChatModule } from './gpt-chat/gpt-chat.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Note } from './gpt-chat/entities/gpt-chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GptChatModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGO_URL'),
        entities: [Note],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
