/* eslint-disable @typescript-eslint/no-unused-vars */
// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDTO: UserDTO) {
    this.userService.register(userDTO);
  }

  async login(userDTO: UserDTO) {
    const payload = await this.userService.login(userDTO);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
