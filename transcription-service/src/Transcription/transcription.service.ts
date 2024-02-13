import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { YoutubeTranscript } from 'youtube-transcript';
import { countTextWords } from '../utils/utils';
import { Readable } from 'stream';
import { Model } from 'mongoose';
import { Note } from './transcription.schema';
import { InjectModel } from '@nestjs/mongoose';
import NoteDto from './Dto/NOTE.dto';

@Injectable()
export class TranscriptionService {
  constructor(@InjectModel(Note.name) private _noteModel: Model<Note>) {}

  async fetchTranscript(videoId: string): Promise<string> {
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      const fullText = transcript.map((line) => line.text).join(' ');
      return fullText;
    } catch (error) {
      console.error('Error fetching transcript:', error);
      throw new Error('Error fetching transcript');
    }
  }

  async processPdf(pdfBuffer: Buffer): Promise<string> {
    try {
      const PdfReader = await import('pdfreader');
      const pdfReader = new PdfReader.PdfReader({});

      const pdfStream = new Readable();
      pdfStream.push(pdfBuffer.buffer);
      pdfStream.push(null);

      let text = '';

      return new Promise<string>((resolve, reject) => {
        pdfStream.on('data', (chunk: Buffer) => {
          pdfReader.parseBuffer(chunk, (err, item) => {
            if (err) {
              reject(err);
            } else if (!item) {
              if (text) {
                resolve(text);
              } else {
                reject(new Error('Empty PDF'));
              }
            } else if (item.text) {
              text += item.text;
            }
          });
        });
      });
    } catch (error) {
      console.error('Error reading Pdf', error);
      throw error;
    }
  }

  async getNotesFake(transcription: string): Promise<string> {
    return `Here are the notes for the transcription: ${transcription}`;
  }

  async getChatGptNotes(transcription: string): Promise<any> {
    try {
      const transcriptionLenght = countTextWords(transcription);
      console.log('transcriptionLenght', transcriptionLenght);

      if (transcriptionLenght > 1000) {
        transcription = transcription.slice(0, 1000);
        console.log('transcription', transcription.length);
      }
      const openai = new OpenAI({
        apiKey: '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',
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

  async saveNotes(chatGptNotes: string, user: string) {
    try {
      if (!chatGptNotes) {
        throw new Error('Invalid note data');
      }

      if (!user) {
        throw new Error('Invalid user data');
      }

      const noteData = new NoteDto();
      noteData.userId = user;
      noteData.note = chatGptNotes;

      const newNote = new this._noteModel(noteData);
      return newNote.save();
    } catch (error) {
      console.error('Error saving note:', error);
      throw new Error('Error saving note');
    }
  }
}
