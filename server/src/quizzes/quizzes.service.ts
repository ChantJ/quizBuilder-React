import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quizzes } from './quizzes.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quizzes)
    private quizzesRepository: Repository<Quizzes>,
  ) {}

  async findAll(userId: number) {
    return await this.quizzesRepository.findBy({ userID: userId });
  }

  async findQuiz(permalink: string) {
    return await this.quizzesRepository.findBy({
      permalink: process.env.client + permalink,
    });
  }

  async create(quiz: any, userID: number) {
    const permalink = Math.random().toString(36).substr(2, 6);
    const newQuiz = await this.quizzesRepository.create({
      ...quiz,
      userID,
      permalink: process.env.client + permalink,
    });
    await this.quizzesRepository.save(newQuiz);
    return await this.quizzesRepository.findBy({ userID: userID });
  }

  async remove(id: number, userID: number) {
    await this.quizzesRepository.delete(id);
    return await this.quizzesRepository.findBy({ userID: userID });
  }
}
