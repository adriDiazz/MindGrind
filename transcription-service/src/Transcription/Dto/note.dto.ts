import { IsString, IsNotEmpty } from 'class-validator';

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  note: string;
}

export default NoteDto;
