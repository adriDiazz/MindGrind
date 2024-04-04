import { Test, TestingModule } from '@nestjs/testing';
import { GptChatController } from './gpt-chat.controller';
import { GptChatService } from './gpt-chat.service';

describe('GptChatController', () => {
  let controller: GptChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GptChatController],
      providers: [GptChatService],
    }).compile();

    controller = module.get<GptChatController>(GptChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
