import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteSchema = HydratedDocument<Note>;

export interface NoteType {
  note: string;
  noteId: string;
  updatedAt: Date;
  createdAt: Date;
  title: string;
  category: string;
}

@Schema({ timestamps: true }) // Habilita las marcas de tiempo automáticas
export class Note {
  @Prop()
  userId: string;

  @Prop()
  notes: [NoteType];

  @Prop()
  isDirectory: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
