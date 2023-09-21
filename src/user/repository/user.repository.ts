import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super(userRepo.target, userRepo.manager, userRepo.queryRunner);
  }
}
