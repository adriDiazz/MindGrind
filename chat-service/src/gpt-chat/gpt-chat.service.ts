import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { countTextWords } from 'src/utils/utils';

@Injectable()
export class GptChatService {
  async getChatGptNotes(transcription: string): Promise<any> {
    try {
      const transcriptionLenght = countTextWords(transcription);

      if (transcriptionLenght > 1000) {
        transcription = transcription.slice(0, 1000);
        console.log('transcription', transcription.length);
      }
      const openai = new OpenAI({
        apiKey: '',
      });

      const prompt = `As a [ABC Course Student], I'm preparing notes on the subject/topic [${transcription}]. I need you to act as an expert professor and provide me with comprehensive and well-structured notes.Here are the guidelines for the notes:\n\n1. Key Terms and Concepts: Include definitions of key terms and insights about main ideas. Use appropriate examples for a better understanding of the topic.\n\n2. Styling: Use H2 for the main headings and questions and H3 for all the sub-headings. You must include related emojis to make the notes engaging. Use bold and italic formatting for emphasis and clarity.\n\n3. Questions and Answers: Generate a list of potential questions and detailed answers that someone studying this subject might need to know.\n\n4. Structure: Summarize the information logically using bulleted or numbered points.\n\nCondition: Please ensure the notes cover the following topics: [ALL THE TOPICS]`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 1,
        top_p: 1,
      });
      return response.choices[0].message;
    } catch (error) {
      console.error('Error fetching chat-gpt notes:', error);
      throw new Error('Error fetching chat-gpt notes');
    }
  }
}
