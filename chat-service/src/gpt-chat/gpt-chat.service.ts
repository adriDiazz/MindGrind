import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { countTextWords } from 'src/utils/utils';
import { Note } from './entities/gpt-chat.entity';
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

  async createExamWithChatGpt(note: string, userId: string) {
    try {
      // Initialize OpenAI client with your API key from the environment variables
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Construct the prompt with more specific instructions and structured JSON
      const prompt = `
        Create an exam with 10 new questions based on the topic/class notes: "${note}". Each question should have four options and one correct answer. Format the response as a JSON object with an array of questions:
        {
          "questions": [
            {
              "question": "What is a key concept in ${note}?",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "answer": "Option A"
            }
          ]
        }
        Please complete the array with nine more questions similarly structured.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5, // Lower temperature for more predictable output
        top_p: 1,
        // Adjust max_tokens based on need to generate sufficient content
      });

      return response.choices[0].message;
    } catch (error) {
      // Improved error handling with specific error message
      console.error('Error fetching exam questions:', error);
      throw new Error('Failed to create exam questions');
    }
  }

  async saveExam(userId: string, exam: any, noteId: string) {
    console.log('exam', noteId);
    try {
      const note = await this.chatRepository.findOne({
        where: { userId },
      });

      if (!note) {
        throw new Error('Note not found');
      }

      const newExam = { ...exam };

      note.exams.push(newExam);

      return await this.chatRepository.update(note._id, note);
    } catch (error) {
      console.error('Error saving exam:', error);
      throw new Error('Error saving exam');
    }
  }

  async getExamsByUserId(userId: string) {
    try {
      const note = await this.chatRepository.findOne({
        where: { userId },
      });

      if (!note) {
        throw new Error('Note not found');
      }

      return note.exams;
    } catch (error) {
      console.error('Error fetching exam:', error);
      throw new Error('Error fetching exam');
    }
  }

  async getNoteById(userId: string, noteId: string) {
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

      return note.notes[noteIndex];
    } catch (error) {
      console.error('Error fetching note:', error);
      throw new Error('Error fetching note');
    }
  }
}
