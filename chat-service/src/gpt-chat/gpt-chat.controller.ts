import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GptChatService } from './gpt-chat.service';

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

  @Post('/exam/:userId')
  async createExam(@Param('userId') userId: string, @Body() note: string) {
    try {
      const exam = {
        exam: {
          role: 'assistant',
          content:
            'Apologies, but you haven\'t provided any study notes, so I can\'t generate a set of specific questions. However, I can show you how the structure of a ten question exam would look:\n\n``` json\n{\n  "questions": [\n    {\n      "question": "Question 1",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "answer": "Option 1"\n    },\n    {\n      "question": "Question 2",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "answer": "Option 2"\n    },\n    {\n      "question": "Question 3",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "answer": "Option 3"\n    },\n    {\n      "question": "Question 4",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "answer": "Option 4"\n    },\n    {\n      "question": "Question 5",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "answer": "Option 1"\n    },\n    {\n      "question": "Question 6",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "answer": "Option 2"\n    },\n    {\n      "question": "Question 7",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "answer": "Option 3"\n    },\n    {\n      "question": "Question 8",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "answer": "Option 4"\n    },\n    {\n      "question": "Question 9",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "answer": "Option 1"\n    },\n    {\n      "question": "Question 10",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "answer": "Option 2"\n    }\n  ]\n}\n```\n\nWhen you have your notes ready, you can change the "question" value to be your actual question and "options" to reflect the response choices. The "answer" value is for the correct response from the options.',
        },
      };
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
