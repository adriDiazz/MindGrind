import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { YoutubeTranscript } from 'youtube-transcript';

@Injectable()
export class AppService {
  async fetchTranscript(videoId: string): Promise<string> {
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      const fullText = transcript.map((line) => line.text).join('\n');
      return fullText;
    } catch (error) {
      console.error('Error fetching transcript:', error);
      throw new Error('Error fetching transcript');
    }
  }

  async getChatGptNotes(transcription: string): Promise<any> {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const prompt = ``;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log('response', response);
      return response;
    } catch (error) {
      console.error('Error fetching chat-gpt notes:', error);
      throw new Error('Error fetching chat-gpt notes');
    }
  }
}
