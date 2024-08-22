import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //   @Post()
  //   create(@Body() user: CreateUserDto) {
  //     return this.usersService.create(user);
  //   }
}
