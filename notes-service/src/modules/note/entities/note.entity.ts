import { Entity, Column, PrimaryGeneratedColumn, ObjectId } from 'typeorm';

@Entity({ name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn()
  _id: ObjectId;

  @Column()
  id: number;

  @Column()
  userId: string;

  @Column('jsonb', { nullable: true })
  notes: NoteType[];

  @Column()
  isDirectory: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date;
}

export interface NoteType {
  note: string;
  noteId: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  category: string;
  previewUrl: string;
}
