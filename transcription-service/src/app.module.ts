import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import TranscriptionModule from './Transcription/transcription.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://adriandiazmanzanares9:${process.env.MONGO_PASS}@mindgrind.ljuvwzf.mongodb.net/MindGrind`,
    ),
    TranscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
