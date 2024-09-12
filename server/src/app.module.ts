import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [TypeOrmModule.forRoot( {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'shantjoulfaian',
    password: '0000',
    database: 'quiz',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), AuthModule, UsersModule, QuizzesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
