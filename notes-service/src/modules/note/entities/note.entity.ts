import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
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
}
