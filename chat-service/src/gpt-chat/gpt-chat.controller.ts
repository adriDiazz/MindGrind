import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';
import { NoteType } from './entities/gpt-chat.entity';
import { Console } from 'console';

@Controller({ path: 'chats', version: '1' })
export class GptChatController {
  constructor(private readonly gptChatService: GptChatService) {}

  @Post()
  async replyMessage(
    @Body()
    {
      message,
      userId,
      noteId,
    }: {
      message: {
        message: string;
        isSent: boolean;
      };
      userId: string;
      noteId: string;
    },
  ) {
    try {
      if (message.message.length > 1000) {
        throw new Error('Message exceeds maximum length of 1000 characters');
      }

      const saved = await this.gptChatService.saveChatGptChat(
        message,
        noteId,
        userId,
      );
      const generatedMessage = {
        message: 'Mensaje generado por GPT-3',
        isSent: false,
      };
      const saveResponse = await this.gptChatService.saveChatGptChat(
        generatedMessage,
        noteId,
        userId,
      );

      if (saveResponse && saved) {
        return {
          chat: {
            message: generatedMessage.message,
            isSent: false,
          },
        };
      }
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  @Get('/exams/:userId')
  async getExams(@Param('userId') userId: string) {
    const exams = await this.gptChatService.getExamsByUserId(userId);
    if (!exams || exams.length === 0) {
      return {
        exams: [],
      };
    }
    return {
      exams,
    };
  }

  @Get('/:userId/:noteId')
  async getChat(
    @Param('userId') userId: string,
    @Param('noteId') noteId: string,
  ) {
    const chat = await this.gptChatService.getChatGptChat(noteId, userId);
    if (!chat || chat.length === 0) {
      return {
        chat: [],
      };
    }
    return {
      chat,
    };
  }

  @Post('/exams/:userId')
  async createExam(
    @Param('userId') userId: string,
    @Body()
    note: {
      noteId: string;
      note: string;
    },
  ) {
    try {
      const exam = {
        exam: {
          role: 'assistant',
          content:
            '{\n  "questions": [\n    {\n      "question": "What is the main topic of \'# Resumen de la polera de la monarquía española\'?",\n      "options": ["The history of the Spanish monarchy", "The history of the French monarchy", "The history of the British monarchy", "The history of the Russian monarchy"],\n      "answer": "The history of the Spanish monarchy"\n    },\n    {\n      "question": "What does \'Memorias de Pezos\' refer to in the context of the notes?",\n      "options": ["A Spanish history book", "A Spanish TV show", "A Spanish podcast", "A Spanish newspaper"],\n      "answer": "A Spanish podcast"\n    },\n    {\n      "question": "What is the main purpose of the \'# Resumen de la polera de la monarquía española\'?",\n      "options": ["To criticize the Spanish monarchy", "To praise the Spanish monarchy", "To provide a brief review of the Spanish monarchy", "To compare the Spanish monarchy with other monarchies"],\n      "answer": "To provide a brief review of the Spanish monarchy"\n    },\n    {\n      "question": "In which language is \'# Resumen de la polera de la monarquía española\' primarily written?",\n      "options": ["English", "French", "Spanish", "Italian"],\n      "answer": "Spanish"\n    },\n    {\n      "question": "What is the format of \'# Resumen de la polera de la monarquía española\'?",\n      "options": ["A video", "A podcast", "A written document", "A live lecture"],\n      "answer": "A written document"\n    },\n    {\n      "question": "What does \'polera\' refer to in the context of the notes?",\n      "options": ["A type of Spanish dance", "A type of Spanish food", "A type of Spanish clothing", "A type of Spanish music"],\n      "answer": "A type of Spanish clothing"\n    },\n    {\n      "question": "What is the main period discussed in \'# Resumen de la polera de la monarquía española\'?",\n      "options": ["The Spanish Civil War", "The Spanish Inquisition", "The Spanish Golden Age", "The Spanish Reconquista"],\n      "answer": "The Spanish Golden Age"\n    },\n    {\n      "question": "Who is the intended audience for \'# Resumen de la polera de la monarquía española\'?",\n      "options": ["Students studying Spanish history", "Tourists visiting Spain", "Spanish citizens", "Professional historians"],\n      "answer": "Students studying Spanish history"\n    },\n    {\n      "question": "What is the main source of information for \'# Resumen de la polera de la monarquía española\'?",\n      "options": ["Primary sources", "Secondary sources", "Tertiary sources", "Quaternary sources"],\n      "answer": "Secondary sources"\n    },\n    {\n      "question": "What is the main goal of \'# Resumen de la polera de la monarquía española\'?",\n      "options": ["To educate", "To entertain", "To persuade", "To inform"],\n      "answer": "To educate"\n    }\n  ]\n}',
        },
      };
      console.log('exam', note.noteId);

      const saved = await this.gptChatService.saveExam(
        userId,
        exam,
        note.noteId,
      );

      return {
        exam,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
