import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const samePass = await bcrypt.compare(pass, user.password);
      if (samePass) {
        const { password, ...result } = user;
        return { user: result, message: 'success' };
      } else return { user: null, message: 'password does not match' };
    }
    return { user: null, message: 'email not found' };
  }

  async login(user: any) {
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data) {
    data.password = await bcrypt.hash(data.password, 10);
    const response = await this.usersService.create(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }
}
