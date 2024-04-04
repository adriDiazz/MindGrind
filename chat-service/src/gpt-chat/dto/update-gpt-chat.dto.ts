import { PartialType } from '@nestjs/mapped-types';
import { CreateGptChatDto } from './create-gpt-chat.dto';

export class UpdateGptChatDto extends PartialType(CreateGptChatDto) {}
