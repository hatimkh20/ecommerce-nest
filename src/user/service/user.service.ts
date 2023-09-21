import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async register(userDTO: UserDTO): Promise<any> {
    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    userDTO.password = hashedPassword;
    const userEntity = new User();
    Object.assign(userEntity, userDTO);
    return this.userRepository.save(userEntity);
  }

  async login(userDto: UserDTO) {
    const user = await this.userRepository.findOne({
      where: { username: userDto.username },
    });

    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      const payload = { username: user.username, sub: user.id };
      return payload;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }
}
