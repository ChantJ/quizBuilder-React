import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() quiz: any, @Request() req) {
    return this.quizzesService.create(quiz, req.user.payload.user.id);
  }

  @Get(':permalink')
  findQuiz(@Param('permalink') permalink: string) {
    return this.quizzesService.findQuiz(permalink);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.quizzesService.findAll(req.user.payload.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.quizzesService.remove(+id, req.user.payload.user.id);
  }
}
