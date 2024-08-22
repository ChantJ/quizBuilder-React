import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizzes } from './quizzes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quizzes])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [TypeOrmModule, QuizzesService],
})
export class QuizzesModule {}
