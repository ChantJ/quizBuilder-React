import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(email: string) {
    return await this.usersRepository.findOneBy({ email: email });
  }

  async create(user: CreateUserDto) {
    const newUser = await this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }
}
