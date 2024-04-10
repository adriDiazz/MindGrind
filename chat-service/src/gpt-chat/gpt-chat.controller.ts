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
}
