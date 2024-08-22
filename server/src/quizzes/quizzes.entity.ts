import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quizzes')
export class Quizzes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  questions: string;

  @Column()
  permalink: string;

  @Column()
  userID: number;
}
