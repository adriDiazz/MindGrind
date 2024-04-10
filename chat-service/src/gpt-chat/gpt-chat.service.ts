import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { countTextWords } from 'src/utils/utils';
import { Chat, Note } from './entities/gpt-chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GptChatService {
  constructor(
    @InjectRepository(Note)
    private readonly chatRepository: Repository<Note>,
  ) {}

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

  async saveChatGptChat(
    message: {
      message: string;
      isSent: boolean;
    },
    noteId: string,
    userId: string,
  ) {
    try {
      const toPush = {
        message: message.message,
        isSent: message.isSent,
      };
      const note = await this.chatRepository.findOne({
        where: { userId },
      });

      if (!note) {
        throw new Error('Note not found');
      }

      const noteIndex = note.notes.findIndex((n) => n.noteId === noteId);

      if (noteIndex === -1) {
        throw new Error('Note not found');
      }

      if (!note.notes[noteIndex].chat) {
        note.notes[noteIndex].chat = [];
      }

      note.notes[noteIndex].chat.push(toPush);

      return await this.chatRepository.update(note._id, note);
    } catch (error) {
      console.error('Error saving chat:', error);
      throw new Error('Error saving chat');
    }
  }

  async getChatGptChat(noteId: string, userId: string) {
    try {
      const note = await this.chatRepository.findOne({
        where: { userId },
      });

      if (!note) {
        throw new Error('Note not found');
      }

      const noteIndex = note.notes.findIndex((n) => n.noteId === noteId);

      if (noteIndex === -1) {
        throw new Error('Note not found');
      }

      return note.notes[noteIndex].chat;
    } catch (error) {
      console.error('Error fetching chat:', error);
      throw new Error('Error fetching chat');
    }
  }
}
