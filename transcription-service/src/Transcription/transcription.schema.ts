import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteSchema = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop()
  userId: string;

  @Prop()
  note: string;

  @Prop()
  date: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
